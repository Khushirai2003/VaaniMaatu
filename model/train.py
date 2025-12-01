import argparse
import os
from pathlib import Path
from tqdm import tqdm
import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from torchvision import models, transforms

from dataset import ImageFolderDataset
try:
    from torch.utils.tensorboard import SummaryWriter
except Exception:
    SummaryWriter = None


def train_epoch(model, loader, criterion, optimizer, device):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    for images, labels, _ in tqdm(loader, desc='train'):
        images = images.to(device)
        labels = labels.to(device)
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item() * images.size(0)
        _, preds = torch.max(outputs, 1)
        correct += (preds == labels).sum().item()
        total += images.size(0)

    return running_loss / total, correct / total


def eval_epoch(model, loader, criterion, device):
    model.eval()
    running_loss = 0.0
    correct = 0
    total = 0
    with torch.no_grad():
        for images, labels, _ in tqdm(loader, desc='eval'):
            images = images.to(device)
            labels = labels.to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)
            running_loss += loss.item() * images.size(0)
            _, preds = torch.max(outputs, 1)
            correct += (preds == labels).sum().item()
            total += images.size(0)

    return running_loss / total, correct / total


def build_model(num_classes, device):
    model = models.resnet18(pretrained=True)
    # Replace final layer
    in_features = model.fc.in_features
    model.fc = nn.Linear(in_features, num_classes)
    return model.to(device)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--data', type=str, required=True, help='Path to dataset root (train/val subfolders)')
    parser.add_argument('--epochs', type=int, default=10)
    parser.add_argument('--batch-size', type=int, default=32)
    parser.add_argument('--lr', type=float, default=1e-3)
    # default to 0 for Windows compatibility (avoid multiprocessing spawn issues)
    parser.add_argument('--workers', type=int, default=0, help='Number of DataLoader workers')
    parser.add_argument('--out', type=str, default='model_checkpoints')
    parser.add_argument('--resume', type=str, default=None, help='Path to checkpoint to resume from')
    parser.add_argument('--log-dir', type=str, default=None, help='TensorBoard log directory')
    parser.add_argument('--save-latest', action='store_true', help='Also save latest.pth each epoch')
    args = parser.parse_args()

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    data_root = Path(args.data)

    train_transform = transforms.Compose([
        transforms.RandomResizedCrop(224),
        transforms.RandomHorizontalFlip(),
        transforms.ColorJitter(0.1, 0.1, 0.1, 0.1),
        transforms.ToTensor(),
    ])

    val_transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
    ])

    train_dir = data_root / 'train'
    val_dir = data_root / 'val'
    if not train_dir.exists() or not val_dir.exists():
        raise RuntimeError('Expected dataset with train/ and val/ subfolders')

    classes = sorted([d.name for d in train_dir.iterdir() if d.is_dir()])
    print('Found classes:', classes)

    train_ds = ImageFolderDataset(str(train_dir), classes=classes, transform=train_transform)
    val_ds = ImageFolderDataset(str(val_dir), classes=classes, transform=val_transform)

    # Use CLI-provided workers (0 by default on Windows). Enable pin_memory when using CUDA.
    pin_memory = True if device.type == 'cuda' else False
    train_loader = DataLoader(train_ds, batch_size=args.batch_size, shuffle=True, num_workers=args.workers, pin_memory=pin_memory)
    val_loader = DataLoader(val_ds, batch_size=args.batch_size, shuffle=False, num_workers=args.workers, pin_memory=pin_memory)

    model = build_model(len(classes), device)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=args.lr)

    start_epoch = 1
    # Resume if requested
    if args.resume is not None:
        resume_path = Path(args.resume)
        if resume_path.exists():
            print('Resuming from', resume_path)
            ckpt = torch.load(str(resume_path), map_location=device)
            if 'model_state' in ckpt:
                model.load_state_dict(ckpt['model_state'])
            else:
                # older checkpoint may contain full state_dict
                model.load_state_dict(ckpt)
            if 'optimizer_state' in ckpt and ckpt.get('optimizer_state') is not None:
                try:
                    optimizer.load_state_dict(ckpt['optimizer_state'])
                except Exception:
                    print('Warning: failed to fully restore optimizer state')
            if 'epoch' in ckpt:
                start_epoch = int(ckpt['epoch']) + 1
        else:
            print('Warning: resume path not found:', resume_path)

    writer = None
    if args.log_dir is not None and SummaryWriter is not None:
        writer = SummaryWriter(log_dir=args.log_dir)

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    best_acc = 0.0
    for epoch in range(start_epoch, args.epochs + 1):
        print(f'Epoch {epoch}/{args.epochs}')
        train_loss, train_acc = train_epoch(model, train_loader, criterion, optimizer, device)
        val_loss, val_acc = eval_epoch(model, val_loader, criterion, device)
        print(f'Train loss: {train_loss:.4f} acc: {train_acc:.4f} | Val loss: {val_loss:.4f} acc: {val_acc:.4f}')
        # Save checkpoint
        ckpt_path = out_dir / f'epoch_{epoch:02d}.pth'
        torch.save({'epoch': epoch, 'model_state': model.state_dict(), 'optimizer_state': optimizer.state_dict(), 'classes': classes}, ckpt_path)
        if args.save_latest:
            torch.save({'epoch': epoch, 'model_state': model.state_dict(), 'optimizer_state': optimizer.state_dict(), 'classes': classes}, out_dir / 'latest.pth')

        if val_acc > best_acc:
            best_acc = val_acc
            torch.save(model.state_dict(), out_dir / 'best.pth')

        # TensorBoard logs
        if writer is not None:
            writer.add_scalar('train/loss', float(train_loss), epoch)
            writer.add_scalar('train/acc', float(train_acc), epoch)
            writer.add_scalar('val/loss', float(val_loss), epoch)
            writer.add_scalar('val/acc', float(val_acc), epoch)

    if writer is not None:
        writer.close()


if __name__ == '__main__':
    main()
