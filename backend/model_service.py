import joblib
import numpy as np
import pandas as pd

# LOAD MODEL ARTIFACTS

model = joblib.load(
    "backend/model/water_potability_model.pkl"
)
scaler = joblib.load(
    "backend/model/scaler.pkl"
)
feature_columns = joblib.load(
    "backend/model/feature_columns.pkl"
)
median_values = joblib.load(
    "backend/model/median_values.pkl"
)
iqr_limits = joblib.load(
    "backend/model/iqr_limits.pkl"
)
encoder = joblib.load(
    "backend/model/encoder.pkl"
)


# PREDICTION FUNCTION

def predict_water_quality(data):

    df = pd.DataFrame([data])

    # HANDLE MISSING VALUES

    for column, median in median_values.items():
        df[column] = df[column].fillna(median)

    # APPLY IQR OUTLIER TREATMENT

    for column, limits in iqr_limits.items():
        lower_limit, upper_limit = limits
        df[column] = df[column].clip(
            lower=lower_limit,
            upper=upper_limit
        )

    # LOG TRANSFORMATION

    df["Solids"] = np.log1p(df["Solids"])

    # pH BINNING

    bins = [-np.inf,6.5,7.5,np.inf]

    labels = ["Acidic","Neutral","Alkaline"]

    df["ph_category"] = pd.cut(df["ph"],bins=bins,labels=labels)

    # ONE-HOT ENCODING

    encoded_values = encoder.transform(df[["ph_category"]])

    encoded_columns = [
        "ph_category_Acidic",
        "ph_category_Neutral",
        "ph_category_Alkaline"
    ]

    encoded_df = pd.DataFrame(
        encoded_values,
        columns=encoded_columns,
        index=df.index
    )

    # Add encoded columns
    df = pd.concat(
        [
            df,
            encoded_df
        ],
        axis=1
    )

    # Remove original categorical column
    df.drop(
        columns=["ph_category"],
        inplace=True
    )

    # MATCH TRAINING FEATURE ORDER

    df = df.reindex(columns=feature_columns,fill_value=0)

    # STANDARDIZATION

    df_scaled = scaler.transform(df)

    # PREDICTION

    prediction = model.predict(df_scaled)[0]
    probability = model.predict_proba(df_scaled)[0][1]

    #  API RESPONSE

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