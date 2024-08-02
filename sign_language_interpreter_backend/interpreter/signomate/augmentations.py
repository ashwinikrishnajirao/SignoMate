import os
import cv2
import numpy as np
import random

# Define directory paths
DATA_DIR = './data'
AUGMENTED_DATA_DIR = './augmented_data'

if not os.path.exists(AUGMENTED_DATA_DIR):
    os.makedirs(AUGMENTED_DATA_DIR)

def augment_image(img):
    rows, cols, _ = img.shape

    # Random rotation
    angle = random.uniform(-15, 15)
    M = cv2.getRotationMatrix2D((cols / 2, rows / 2), angle, 1)
    img = cv2.warpAffine(img, M, (cols, rows))

    # Random scaling
    scale = random.uniform(0.8, 1.2)
    img = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_LINEAR)

    # Random translation
    tx = random.randint(-10, 10)
    ty = random.randint(-10, 10)
    M = np.float32([[1, 0, tx], [0, 1, ty]])
    img = cv2.warpAffine(img, M, (cols, rows))

    # Random brightness and contrast
    alpha = random.uniform(0.7, 1.3)  # Contrast control
    beta = random.uniform(-30, 30)    # Brightness control
    img = cv2.convertScaleAbs(img, alpha=alpha, beta=beta)

    # Random horizontal flip
    if random.random() > 0.5:
        img = cv2.flip(img, 1)

    return img

def augment_and_save_images():
    for dir_ in os.listdir(DATA_DIR):
        dir_path = os.path.join(DATA_DIR, dir_)
        output_dir = os.path.join(AUGMENTED_DATA_DIR, dir_)
        
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        
        for img_name in os.listdir(dir_path):
            img_path = os.path.join(dir_path, img_name)
            img = cv2.imread(img_path)
            
            # Save original image
            output_path = os.path.join(output_dir, img_name)
            cv2.imwrite(output_path, img)
            
            # Generate and save augmented images
            for i in range(5):  # Create 5 augmented versions
                augmented_img = augment_image(img)
                augmented_img_name = f"{os.path.splitext(img_name)[0]}_aug_{i}.jpg"
                augmented_img_path = os.path.join(output_dir, augmented_img_name)
                cv2.imwrite(augmented_img_path, augmented_img)

if __name__ == "__main__":
    augment_and_save_images()
