# 💧 Water Potability Prediction System

A Machine Learning-based web application that predicts whether a water sample is **Potable** or **Not Potable** based on its physical and chemical properties.

The project consists of a Machine Learning model, a FastAPI backend, and a React frontend.

---

## 👥 Team

**Team Name:** PuraTest

### Team Members

| No. | Name | Id |
|---|---|---|
| 1 | Dineth Osanka Nakandala |  241711046 |
| 2 | W. Agasthi Arun Fernando |  241711012 |
| 3 | Dilshan Hesara | 241711049 |
| 4 | Sumuditha Janith | 241711016 |

## 📌 Project Overview

Water quality is an important factor in determining whether water is suitable for drinking.

This project uses Machine Learning to predict water potability using the following nine water-quality parameters:

- pH
- Hardness
- Solids
- Chloramines
- Sulfate
- Conductivity
- Organic Carbon
- Trihalomethanes
- Turbidity

The system returns:

- **Potable** – predicted as suitable for drinking
- **Not Potable** – predicted as not suitable for drinking
- **Probability** – model probability for the potable class

> **Note:** The prediction is a Machine Learning prediction and should not be treated as a laboratory water-safety certification.

---

## 🎯 Objectives

- Analyze water-quality data using Machine Learning.
- Handle missing values and outliers.
- Apply feature engineering techniques.
- Compare multiple Machine Learning algorithms.
- Evaluate models using multiple performance metrics.
- Select the best-performing model based on F1-Score.
- Save the trained model and preprocessing objects.
- Develop a REST API using FastAPI.
- Build a React-based user interface for water potability prediction.

---

## 📊 Dataset

The project uses the **Water Potability Dataset**.

The dataset contains **3,276 water samples** and 9 input features.

### Input Features

| Feature | Description |
|---|---|
| `ph` | pH value of the water |
| `Hardness` | Water hardness |
| `Solids` | Total dissolved solids |
| `Chloramines` | Chloramines concentration |
| `Sulfate` | Sulfate concentration |
| `Conductivity` | Electrical conductivity |
| `Organic_carbon` | Organic carbon level |
| `Trihalomethanes` | Trihalomethanes concentration |
| `Turbidity` | Water turbidity |

### Target Variable

| Value | Meaning |
|---|---|
| `0` | Not Potable |
| `1` | Potable |

---

# 🔬 Machine Learning Workflow

The Machine Learning pipeline consists of the following steps:

```text
Dataset
   ↓
Duplicate Checking
   ↓
Train / Test Split
   ↓
Missing Value Handling
   ↓
Outlier Handling
   ↓
Feature Engineering
   ↓
Feature Scaling
   ↓
Model Training
   ↓
Model Evaluation
   ↓
Best Model Selection
   ↓
Model Saving
