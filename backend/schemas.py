from pydantic import BaseModel, Field


class WaterQualityInput(BaseModel):

    ph: float = Field(..., description="Water pH value")

    Hardness: float = Field(
        ...,
        description="Water hardness"
    )

    Solids: float = Field(
        ...,
        description="Total dissolved solids"
    )

    Chloramines: float = Field(
        ...,
        description="Chloramines level"
    )

    Sulfate: float = Field(
        ...,
        description="Sulfate concentration"
    )

    Conductivity: float = Field(
        ...,
        description="Water conductivity"
    )

    Organic_carbon: float = Field(
        ...,
        description="Organic carbon level"
    )

    Trihalomethanes: float = Field(
        ...,
        description="Trihalomethanes level"
    )

    Turbidity: float = Field(
        ...,
        description="Water turbidity"
    )