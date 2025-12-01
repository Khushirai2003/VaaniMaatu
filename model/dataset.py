import os
from typing import Tuple, List
from PIL import Image
import numpy as np

import torch
from torch.utils.data import Dataset
from torchvision import transforms


class ImageFolderDataset(Dataset):
    """Simple folder dataset. Expects root/class_x/xxx.png structure.

    Returns (image_tensor, label_index, filepath)
    """
    def __init__(self, root: str, classes: List[str]=None, transform=None):
        self.root = root
        self.transform = transform or transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
        ])

        # Discover classes
        if classes is None:
            classes = sorted([d for d in os.listdir(root) if os.path.isdir(os.path.join(root, d))])
        self.classes = classes
        self.class_to_idx = {c: i for i, c in enumerate(self.classes)}

        self.samples = []
        for c in self.classes:
            d = os.path.join(root, c)
            for fname in os.listdir(d):
                if fname.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp')):
                    self.samples.append((os.path.join(d, fname), self.class_to_idx[c]))

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        path, label = self.samples[idx]
        img = Image.open(path).convert('RGB')
        if self.transform:
            img = self.transform(img)
        return img, label, path
