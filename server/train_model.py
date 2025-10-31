# import pickle
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.naive_bayes import GaussianNB
# from sklearn.preprocessing import StandardScaler

# # Load dataset
# df = pd.read_csv("diabetes.csv")  # Ensure your dataset is available

# # Define features and labels
# X = df.drop(columns=["Outcome"])  # Assuming 'Outcome' is the target column
# y = df["Outcome"]

# # Split data
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Scale features
# scaler = StandardScaler()
# X_train_scaled = scaler.fit_transform(X_train)
# X_test_scaled = scaler.transform(X_test)

# # Train model
# model = GaussianNB()
# model.fit(X_train_scaled, y_train)  # Make sure model is trained before saving

# # Save the scaler
# with open("scaler.pkl", "wb") as f:
#     pickle.dump(scaler, f)

# # Save the trained model
# with open("nb.pkl", "wb") as f:
#     pickle.dump(model, f)

# print("Model and scaler saved successfully!")

import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import BaggingClassifier, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler

# Load dataset
df = pd.read_csv("diabetesmedicalbalanced.csv")  # Ensure your dataset is available

# Print column names for debugging
print("Columns in diabetesmedicalbalanced.csv:", df.columns.tolist())

# Remove the 'Pregnancies' column if it exists
if "Pregnancies" in df.columns:
    df = df.drop(columns=["Pregnancies"])
    print("Dropped 'Pregnancies' column.")
else:
    print("No 'Pregnancies' column found in the dataset.")

# Define features and labels
X = df.drop(columns=["Outcome"])  # 'Outcome' is the target column
y = df["Outcome"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Bagging model
bagging_model = BaggingClassifier(random_state=42)
bagging_model.fit(X_train_scaled, y_train)

# Train Boosting model (Gradient Boosting)
boosting_model = GradientBoostingClassifier(random_state=42)
boosting_model.fit(X_train_scaled, y_train)

# Save the scaler
with open("scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

# Save the Bagging model
with open("bagging.pkl", "wb") as f:
    pickle.dump(bagging_model, f)

# Save the Boosting model
with open("boosting.pkl", "wb") as f:
    pickle.dump(boosting_model, f)

print("Bagging model, Boosting model, and scaler saved successfully!")