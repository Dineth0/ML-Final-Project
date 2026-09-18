from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .schemas import WaterQualityInput
from .model_service import predict_water_quality


app = FastAPI(
    title="Water Potability Prediction API",
    description=(
        "REST API for predicting water potability "
        "using Machine Learning"
    ),
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():

    return {
        "message": (
            "Water Potability Prediction API "
            "is running"
        ),
        "status": "success"
    }


@app.post("/predict")
def predict(data: WaterQualityInput):

    try:

        result = predict_water_quality(
            data.model_dump()
        )

        return result

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )