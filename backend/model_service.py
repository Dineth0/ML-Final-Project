import joblib
import numpy as np
import pandas as pd


# Load ML model
model = joblib.load("model/water_potability_model.pkl")

# Load scaler
scaler = joblib.load("model/scaler.pkl")

# Load feature columns
feature_columns = joblib.load("model/feature_columns.pkl")

# Load training medians
median_values = joblib.load("model/median_values.pkl")

# Load IQR limits
iqr_limits = joblib.load("model/iqr_limits.pkl")


def predict_water_quality(data):

    # Convert input to DataFrame
    df = pd.DataFrame([data])

    #Handle missing values

    for column, median in median_values.items():
        df[column] = df[column].fillna(median)

    #Apply IQR outlier treatment

    for column, limits in iqr_limits.items():
        lower_limit, upper_limit = limits
        df[column] = df[column].clip(lower=lower_limit,upper=upper_limit)

    # Log Transformation

    df["Solids"] = np.log1p(df["Solids"])

    # pH Binning

    bins = [-np.inf,6.5,7.5,np.inf]

    labels = ["Acidic","Neutral","Alkaline"]

    df["ph_category"] = pd.cut(df["ph"],bins=bins,labels=labels)

    # One-Hot Encoding

    df = pd.get_dummies(df,columns=["ph_category"],prefix="ph_category",dtype=int)

    # Match training columns

    df = df.reindex(columns=feature_columns,fill_value=0)

    #  Standardization

    df_scaled = scaler.transform(df)

    # Prediction

    prediction = model.predict(df_scaled)[0]
    probability = model.predict_proba(df_scaled)[0][1]

    # API Response

    return {
        "potability": int(prediction),
        "prediction": (
            "Potable"
            if prediction == 1
            else "Not Potable"
        ),
        "probability": round(
            float(probability),
            4
        )
    }