import os
import cv2

DATA_DIR = './data'
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

number_of_classes = 31
dataset_size = 25

cap = cv2.VideoCapture(0)  # Try different indices if 0 doesn't work

if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

for j in range(number_of_classes):
    class_dir = os.path.join(DATA_DIR, str(j))
    if not os.path.exists(class_dir):
        os.makedirs(class_dir)

    print(f'Collecting data for class {j}')

    input(f"Press Enter to start collecting data for class {j}...")

    while True:
        ret, frame = cap.read()
        if not ret or frame is None or frame.size == 0:
            print("Error: Failed to capture frame.")
            continue  # Continue trying to capture frames

        cv2.putText(frame, 'Ready? Press "Q" to start!', (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        cv2.imshow('frame', frame)
        if cv2.waitKey(25) & 0xFF == ord('q'):
            break

    print(f'Starting data collection for class {j}')
    counter = 0
    while counter < dataset_size:
        ret, frame = cap.read()
        if not ret or frame is None or frame.size == 0:
            print("Error: Failed to capture frame.")
            continue  # Skip this frame

        cv2.imshow('frame', frame)
        cv2.waitKey(25)
        cv2.imwrite(os.path.join(class_dir, '{}.jpg'.format(counter)), frame)
        print(f'Captured image {counter + 1}/{dataset_size} for class {j}')
        counter += 1
          # Use the frame capturing rate variable

cap.release()
cv2.destroyAllWindows()
