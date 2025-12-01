from PIL import Image
import os
import random

root = 'sample_dataset'
train_dir = os.path.join(root, 'train')
val_dir = os.path.join(root, 'val')
classes = ['classA', 'classB']

for base in [train_dir, val_dir]:
    for c in classes:
        d = os.path.join(base, c)
        os.makedirs(d, exist_ok=True)

# generate 10 small images per class for train, 4 per class for val
for c in classes:
    for i in range(10):
        img = Image.new('RGB', (256, 256), (random.randint(0,255), random.randint(0,255), random.randint(0,255)))
        img.save(os.path.join(train_dir, c, f'{c}_{i:03d}.jpg'))
    for i in range(4):
        img = Image.new('RGB', (256, 256), (random.randint(0,255), random.randint(0,255), random.randint(0,255)))
        img.save(os.path.join(val_dir, c, f'{c}_{i:03d}.jpg'))

print('Sample dataset created at', root)
