import os
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load data
with open('./data.pickle', 'rb') as f:
    data_dict = pickle.load(f)

data = data_dict['data']
labels = data_dict['labels']

# Determine the length of the largest sequence
max_length = max(len(seq) for seq in data)

# Pad sequences to ensure they are all the same length
padded_data = []
for seq in data:
    if len(seq) < max_length:
        # Add padding (zeros) to the sequence
        seq.extend([0] * (max_length - len(seq)))
    padded_data.append(seq)

# Convert to numpy array
data = np.asarray(padded_data)
labels = np.asarray(labels)

# Split data into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(data, labels, test_size=0.8, shuffle=True, stratify=labels)

# Train model
model = RandomForestClassifier()
model.fit(x_train, y_train)

# Make predictions
y_predict = model.predict(x_test)

# Calculate accuracy
score = accuracy_score(y_predict, y_test)
print('{}% of samples were classified correctly!'.format(score * 100))

# Save model
with open('model.p', 'wb') as f:
    pickle.dump({'model': model}, f)
