


# import pickle as pkl
# import os
# import pandas as pd
# import numpy as np
# from flask import Flask, request, jsonify, render_template
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# # Load scaler and model
# script_dir = os.path.dirname(os.path.abspath(__file__))
# scaler_path = os.path.join(script_dir, 'scaler.pkl')
# scaler = pkl.load(open(scaler_path, 'rb'))

# file_path = os.path.join(script_dir, 'bagging.pkl')
# with open(file_path, 'rb') as f:
#     model = pkl.load(f)

# def predict(Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age):
#     input_data = pd.DataFrame([[Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age]])
#     input_data = scaler.transform(input_data)
#     prediction = model.predict(input_data)
    
#     if prediction[0] == 1:
#         result = {
#             'prediction': "You have high chances of Diabetes! Please consult a Doctor",
#             'gif_url': "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZlY2pwcDNtcnNhc2JwdDk4YnVqenRpcXl0OXFxdWRya3U0dmZ4aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6wrebnKWmvx4ZBio/giphy.gif"
#         }
#     else:
#         result = {
#             'prediction': "You have low chances of Diabetes. Please maintain a healthy life style",
#             'gif_url': "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2txb242N3pkMmp0ODRiangydm9raDY5OHBhYmw1Y2NobjM0cGZtNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W1GG6RYUcWxoHl3jV9/giphy.gif"
#         }
#     return result


# @app.route('/predict', methods=['POST'])
# def predictions():
#     if request.method == 'POST':
#         data = request.get_json()
#         Age = float(data.get('Age'))
#         Pregnancies = float(data.get('Pregnancies'))
#         Glucose = float(data.get('Glucose'))
#         BloodPressure = float(data.get('BloodPressure'))
#         Insulin = float(data.get('Insulin'))
#         Bmi = float(data.get('BMI'))
#         SkinThickness = float(data.get('SkinThickness'))
#         Dpf = float(data.get('DPF'))
        
#         result = predict(Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age)
#         return jsonify(result)
#     return "Invalid request method"


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8000, debug=True)



#last


# import pickle as pkl
# import os
# import pandas as pd
# import numpy as np
# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# # Load scaler and model
# script_dir = os.path.dirname(os.path.abspath(__file__))
# scaler_path = os.path.join(script_dir, 'scaler.pkl')
# model_path = os.path.join(script_dir, 'bagging.pkl')

# # Check if files exist before loading
# if not os.path.exists(scaler_path) or not os.path.exists(model_path):
#     print("Error: 'scaler.pkl' or 'bagging.pkl' not found in the script directory")
#     exit(1)

# try:
#     scaler = pkl.load(open(scaler_path, 'rb'))
#     model = pkl.load(open(model_path, 'rb'))
# except Exception as e:
#     print(f"Error loading model or scaler: {str(e)}")
#     exit(1)

# def predict(Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age):
#     # Create input DataFrame with exact column names matching training
#     input_data = pd.DataFrame([[Pregnancies, Glucose, BloodPressure, SkinThickness, 
#                               Insulin, Bmi, Dpf, Age]],
#                             columns=['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
#                                    'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'])
    
#     # Scale the input data
#     try:
#         input_scaled = scaler.transform(input_data)
#     except Exception as e:
#         raise ValueError(f"Scaling error: {str(e)}")
    
#     # Make prediction
#     try:
#         prediction = model.predict(input_scaled)[0]
#     except Exception as e:
#         raise ValueError(f"Prediction error: {str(e)}")
    
#     # Return result
#     if prediction == 1:
#         result = {
#             'prediction': "You have high chances of Diabetes! Please consult a Doctor,'POSITIVE'",
#             'gif_url': "https://media.giphy.com/media/3o6wrebnKWmvx4ZBio/giphy.gif"
#         }
#     else:
#         result = {
#             'prediction': "You have low chances of Diabetes. Please maintain a healthy lifestyle,'NEGATIVE'",
#             'gif_url': "https://media.giphy.com/media/W1GG6RYUcWxoHl3jV9/giphy.gif"
#         }
#     return result

# @app.route('/predict', methods=['POST'])
# def predictions():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({'error': 'No data provided'}), 400

#         required_fields = ['Age', 'Pregnancies', 'Glucose', 'BloodPressure', 
#                          'Insulin', 'BMI', 'SkinThickness', 'DPF']
        
#         for field in required_fields:
#             if field not in data or data[field] is None:
#                 return jsonify({'error': f'Missing or null field: {field}'}), 400

#         # Convert inputs to float
#         try:
#             Age = float(data['Age'])
#             Pregnancies = float(data['Pregnancies'])
#             Glucose = float(data['Glucose'])
#             BloodPressure = float(data['BloodPressure'])
#             Insulin = float(data['Insulin'])
#             Bmi = float(data['BMI'])
#             SkinThickness = float(data['SkinThickness'])
#             Dpf = float(data['DPF'])
#         except ValueError:
#             return jsonify({'error': 'All inputs must be numeric'}), 400
        
#         # Ensure non-negative values where appropriate
#         if any(x < 0 for x in [Age, Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf]):
#             return jsonify({'error': 'Input values cannot be negative'}), 400

#         result = predict(Pregnancies, Glucose, BloodPressure, SkinThickness, 
#                         Insulin, Bmi, Dpf, Age)
#         return jsonify(result)
        
#     except Exception as e:
#         return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8000, debug=True)


#final


# import pickle as pkl
# import os
# import pandas as pd
# import numpy as np
# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# # Load scaler and model
# script_dir = os.path.dirname(os.path.abspath(__file__))
# scaler_path = os.path.join(script_dir, 'scaler.pkl')
# model_path = os.path.join(script_dir, 'bagging.pkl')

# # Check if files exist before loading
# if not os.path.exists(scaler_path) or not os.path.exists(model_path):
#     print("Error: 'scaler.pkl' or 'bagging.pkl' not found in the script directory")
#     exit(1)

# try:
#     scaler = pkl.load(open(scaler_path, 'rb'))
#     model = pkl.load(open(model_path, 'rb'))
# except Exception as e:
#     print(f"Error loading model or scaler: {str(e)}")
#     exit(1)

# # Print model class labels to debug
# print(f"Model Class Labels: {model.classes_}")  # Should print [0, 1]

# # Set threshold
# #THRESHOLD = 0.4
# THRESHOLD = 0.5
# #THRESHOLD = 0.5
# #0.9 = 90% chance of being in the "Yes" class.

# #0.5 = 50% chance (equal probability for both classes).

# #0.2 = 20% chance of being in the "Yes" class (80% chance of "No").

# def predict(Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age):
#     # Create input DataFrame
#     input_data = pd.DataFrame([[Pregnancies, Glucose, BloodPressure, SkinThickness, 
#                               Insulin, Bmi, Dpf, Age]],
#                             columns=['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
#                                    'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'])
    
#     # Scale the input data
#     try:
#         input_scaled = scaler.transform(input_data)
#     except Exception as e:
#         raise ValueError(f"Scaling error: {str(e)}")
    
#     # Get probability prediction
#     try:
#         probabilities = model.predict_proba(input_scaled)[0]  # Probability for both classes
#         probability_positive = probabilities[1]  # Probability of class 1 (Diabetes)
#         prediction = 1 if probability_positive >= THRESHOLD else 0  # Apply threshold correctly

#         print(f"DEBUG: Probabilities: {probabilities}, Threshold: {THRESHOLD}, Prediction: {prediction}")

#     except Exception as e:
#         raise ValueError(f"Prediction error: {str(e)}")
    
#     # Return result
#     if prediction == 1:
#         result = {
#             'prediction': "You have high chances of Diabetes! Please consult a Doctor,'POSITIVE'",
#             'probability': round(probability_positive, 4),
#             'threshold': THRESHOLD,
#             'gif_url': "https://media.giphy.com/media/3o6wrebnKWmvx4ZBio/giphy.gif"
#         }
#     else:
#         result = {
#             'prediction': "You have low chances of Diabetes. Please maintain a healthy lifestyle,'NEGATIVE'",
#             'probability': round(probability_positive, 4),
#             'threshold': THRESHOLD,
#             'gif_url': "https://media.giphy.com/media/W1GG6RYUcWxoHl3jV9/giphy.gif"
#         }
#     return result

# @app.route('/predict', methods=['POST'])
# def predictions():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({'error': 'No data provided'}), 400

#         required_fields = ['Age', 'Pregnancies', 'Glucose', 'BloodPressure', 
#                          'Insulin', 'BMI', 'SkinThickness', 'DPF']
        
#         for field in required_fields:
#             if field not in data or data[field] is None:
#                 return jsonify({'error': f'Missing or null field: {field}'}), 400

#         # Convert inputs to float
#         try:
#             Age = float(data['Age'])
#             Pregnancies = float(data['Pregnancies'])
#             Glucose = float(data['Glucose'])
#             BloodPressure = float(data['BloodPressure'])
#             Insulin = float(data['Insulin'])
#             Bmi = float(data['BMI'])
#             SkinThickness = float(data['SkinThickness'])
#             Dpf = float(data['DPF'])
#         except ValueError:
#             return jsonify({'error': 'All inputs must be numeric'}), 400
        
#         # Ensure non-negative values where appropriate
#         if any(x < 0 for x in [Age, Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf]):
#             return jsonify({'error': 'Input values cannot be negative'}), 400

#         result = predict(Pregnancies, Glucose, BloodPressure, SkinThickness, 
#                         Insulin, Bmi, Dpf, Age)
#         return jsonify(result)
        
#     except Exception as e:
#         return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8000, debug=True)

# import pickle as pkl
# import os
# import pandas as pd
# import numpy as np
# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# # Load scaler and model
# script_dir = os.path.dirname(os.path.abspath(__file__))
# scaler_path = os.path.join(script_dir, 'scaler.pkl')
# model_path = os.path.join(script_dir, 'bagging.pkl')  # Swap to 'boosting.pkl' if desired

# # Check if files exist before loading
# if not os.path.exists(scaler_path) or not os.path.exists(model_path):
#     print("Error: 'scaler.pkl' or 'bagging.pkl' not found in the script directory")
#     exit(1)

# try:
#     scaler = pkl.load(open(scaler_path, 'rb'))
#     model = pkl.load(open(model_path, 'rb'))
# except Exception as e:
#     print(f"Error loading model or scaler: {str(e)}")
#     exit(1)

# # Print model class labels to debug
# print(f"Model Class Labels: {model.classes_}")  # Should print [0, 1]

# # Set threshold
# #THRESHOLD = 0.380
# THRESHOLD = 0.45
# #THRESHOLD = 0.45 (border line)


# def predict(Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age):
#     # Create input DataFrame with the 7 features
#     input_data = pd.DataFrame([[Glucose, BloodPressure, SkinThickness, 
#                               Insulin, Bmi, Dpf, Age]],
#                             columns=['Glucose', 'BloodPressure', 'SkinThickness',
#                                    'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'])
    
#     # Scale the input data
#     try:
#         input_scaled = scaler.transform(input_data)
#     except Exception as e:
#         raise ValueError(f"Scaling error: {str(e)}")
    
#     # Get probability prediction
#     try:
#         probabilities = model.predict_proba(input_scaled)[0]  # Probability for both classes
#         probability_positive = probabilities[1]  # Probability of class 1 (Diabetes)
#         prediction = 1 if probability_positive >= THRESHOLD else 0

#         print(f"DEBUG: Probabilities: {probabilities}, Threshold: {THRESHOLD}, Prediction: {prediction}")
#     except Exception as e:
#         raise ValueError(f"Prediction error: {str(e)}")
    
#     # Return result
#     if prediction == 1:
#         result = {
#             'prediction': "You have high chances of Diabetes! Please consult a Doctor,'POSITIVE'",
#             'probability': round(probability_positive, 4),
#             'threshold': THRESHOLD,
#             'gif_url': "https://media.giphy.com/media/3o6wrebnKWmvx4ZBio/giphy.gif"
#         }
#     else:
#         result = {
#             'prediction': "You have low chances of Diabetes. Please maintain a healthy lifestyle,'NEGATIVE'",
#             'probability': round(probability_positive, 4),
#             'threshold': THRESHOLD,
#             'gif_url': "https://media.giphy.com/media/W1GG6RYUcWxoHl3jV9/giphy.gif"
#         }
#     return result

# @app.route('/predict', methods=['POST'])
# def predictions():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({'error': 'No data provided'}), 400

#         required_fields = ['Age', 'Glucose', 'BloodPressure', 
#                          'Insulin', 'BMI', 'SkinThickness', 'DPF']
        
#         for field in required_fields:
#             if field not in data or data[field] is None:
#                 return jsonify({'error': f'Missing or null field: {field}'}), 400

#         # Convert inputs to float
#         try:
#             Age = float(data['Age'])
#             Glucose = float(data['Glucose'])
#             BloodPressure = float(data['BloodPressure'])
#             Insulin = float(data['Insulin'])
#             Bmi = float(data['BMI'])
#             SkinThickness = float(data['SkinThickness'])
#             Dpf = float(data['DPF'])
#         except ValueError:
#             return jsonify({'error': 'All inputs must be numeric'}), 400
        
#         # Ensure non-negative values where appropriate
#         if any(x < 0 for x in [Age, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf]):
#             return jsonify({'error': 'Input values cannot be negative'}), 400

#         result = predict(Glucose, BloodPressure, SkinThickness, 
#                         Insulin, Bmi, Dpf, Age)
#         return jsonify(result)
        
#     except Exception as e:
#         return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8000, debug=True)


import pickle as pkl
import os
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load scaler and model
script_dir = os.path.dirname(os.path.abspath(__file__))
scaler_path = os.path.join(script_dir, 'scaler.pkl')
model_path = os.path.join(script_dir, 'bagging.pkl')  # Swap to 'boosting.pkl' if desired

# Check if files exist before loading
if not os.path.exists(scaler_path) or not os.path.exists(model_path):
    logger.error("Error: 'scaler.pkl' or 'bagging.pkl' not found in the script directory")
    exit(1)

try:
    scaler = pkl.load(open(scaler_path, 'rb'))
    model = pkl.load(open(model_path, 'rb'))
    logger.info("Model and scaler loaded successfully")
except Exception as e:
    logger.error(f"Error loading model or scaler: {str(e)}")
    exit(1)

# Print model class labels to debug
logger.info(f"Model Class Labels: {model.classes_}")  # Should print [0, 1]

# Set threshold
THRESHOLD = 0.45

def predict(Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age, Gender):
    # Convert Gender to numeric values
    gender_mapping = {'Male': 0, 'Female': 1, 'Other': 2}
    Gender_numeric = gender_mapping.get(Gender, -1)  # Default to -1 if Gender is not recognized

    if Gender_numeric == -1:
        logger.error("Invalid gender value")
        raise ValueError("Invalid gender value")

    # Create input DataFrame with the 8 features
    input_data = pd.DataFrame([[Glucose, BloodPressure, SkinThickness,
                                Insulin, Bmi, Dpf, Age, Gender_numeric]],
                              columns=['Glucose', 'BloodPressure', 'SkinThickness',
                                       'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age', 'Gender'])

    logger.info(f"Input Data: {input_data}")

    # Scale the input data
    try:
        input_scaled = scaler.transform(input_data)
        logger.info("Input data scaled successfully")
    except Exception as e:
        logger.error(f"Scaling error: {str(e)}")
        raise ValueError(f"Scaling error: {str(e)}")

    # Get probability prediction
    try:
        probabilities = model.predict_proba(input_scaled)[0]  # Probability for both classes
        probability_positive = probabilities[1]  # Probability of class 1 (Diabetes)
        prediction = 1 if probability_positive >= THRESHOLD else 0

        logger.info(f"Probabilities: {probabilities}, Threshold: {THRESHOLD}, Prediction: {prediction}")
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise ValueError(f"Prediction error: {str(e)}")

    # Return result
    if prediction == 1:
        result = {
            'prediction': "You have high chances of Diabetes! Please consult a Doctor.",
            'probability': round(probability_positive, 4),
            'threshold': THRESHOLD,
            'gif_url': "https://media.giphy.com/media/3o6wrebnKWmvx4ZBio/giphy.gif"
        }
    else:
        result = {
            'prediction': "You have low chances of Diabetes. Please maintain a healthy lifestyle.",
            'probability': round(probability_positive, 4),
            'threshold': THRESHOLD,
            'gif_url': "https://media.giphy.com/media/W1GG6RYUcWxoHl3jV9/giphy.gif"
        }
    return result

@app.route('/predict', methods=['POST'])
def predictions():
    try:
        data = request.get_json()
        if not data:
            logger.error("No data provided")
            return jsonify({'error': 'No data provided'}), 400

        required_fields = ['Age', 'Glucose', 'BloodPressure',
                           'Insulin', 'BMI', 'SkinThickness', 'DPF', 'Gender']

        for field in required_fields:
            if field not in data or data[field] is None:
                logger.error(f'Missing or null field: {field}')
                return jsonify({'error': f'Missing or null field: {field}'}), 400

        # Convert inputs to float
        try:
            Age = float(data['Age'])
            Glucose = float(data['Glucose'])
            BloodPressure = float(data['BloodPressure'])
            Insulin = float(data['Insulin'])
            Bmi = float(data['BMI'])
            SkinThickness = float(data['SkinThickness'])
            Dpf = float(data['DPF'])
            Gender = data['Gender']  # Gender is a string, no need to convert to float
        except ValueError:
            logger.error("All inputs must be numeric")
            return jsonify({'error': 'All inputs must be numeric'}), 400

        # Ensure non-negative values where appropriate
        if any(x < 0 for x in [Age, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf]):
            logger.error("Input values cannot be negative")
            return jsonify({'error': 'Input values cannot be negative'}), 400

        # Ensure gender is valid
        if Gender not in ['Male', 'Female', 'Other']:
            logger.error("Invalid gender value")
            return jsonify({'error': 'Invalid gender value'}), 400

        result = predict(Glucose, BloodPressure, SkinThickness,
                         Insulin, Bmi, Dpf, Age, Gender)
        return jsonify(result)

    except Exception as e:
        logger.error(f'Prediction failed: {str(e)}')
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
