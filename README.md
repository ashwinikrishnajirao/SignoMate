
# Sign Language Interpreter

## Overview

The Sign Language Interpreter is a web-based application that recognizes sign language characters from a live camera feed. The project uses a Random Forest classifier trained on the [ASL dataset](https://www.kaggle.com/datasets/ayuraj/asl-dataset), along with augmented images, to accurately predict sign language characters. The front end is developed using React, while the backend leverages Django. MediaPipe is used to overlay hand landmarks on the camera feed to help users see what the system is processing.

## Features

- **Real-time Sign Language Recognition:** Uses live camera feed to capture and predict sign language characters.
- **Hand Landmark Overlay:** MediaPipe overlays hand landmarks on the camera feed for better visualization.
- **Augmented Training Data:** Training data augmented with various transformations to improve model accuracy.
- **Interactive Web Interface:** Built with React for a responsive and user-friendly experience.
- **Backend API:** Powered by Django to handle image processing and prediction.

## Requirements

- Python 3.7+
- Django 3.0+
- OpenCV
- MediaPipe
- React 16.13+
- Node.js 12.16+

## Installation

### Backend (Django)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sign-language-interpreter.git
   cd sign-language-interpreter/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Usage

1. Ensure both the Django and React development servers are running.
2. Open the React application in your web browser (usually at `http://localhost:3000`).
3. Allow access to the camera when prompted.
4. Start the Sign Language Interpreter by clicking the "Start" button.
5. The predicted sign language character will be displayed on the screen.

## Dataset

The training data consists of images from the [ASL dataset](https://www.kaggle.com/datasets/ayuraj/asl-dataset), along with augmented images created by applying various transformations such as changing brightness, contrast, and adding noise.

## Model Training

1. Collect images from both the ASL dataset and live camera feed.
2. Augment the data by applying transformations to create a diverse set of images.
3. Train the Random Forest classifier on the augmented dataset.
4. Save the trained model for inference.

## Inference

The backend uses the trained Random Forest classifier to predict sign language characters from images captured by the live camera feed. MediaPipe is used to overlay hand landmarks on the camera feed to visualize the input to the system.

## Project Structure

```
sign-language-interpreter/
│
├── backend/
│   ├── manage.py
│   ├── model.p
│   ├── requirements.txt
│   ├── app/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   └── interpreter/
│       ├── __init__.py
│       ├── settings.py
│       ├── urls.py
│       └── wsgi.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── App.css
│   │   └── ...
│   ├── package.json
│   └── ...
│
└── README.md
```

## Contributors

- [Your Name](https://github.com/your-username)
- [Contributor Name](https://github.com/contributor-username)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README file with any additional information specific to your project, such as setup instructions, troubleshooting tips, or detailed descriptions of your model and data augmentation techniques.
