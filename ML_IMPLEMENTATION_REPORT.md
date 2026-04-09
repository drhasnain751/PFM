# Machine Learning Implementation Report: PFM AI

This report details the architectural design, data processing, and modeling techniques used in the **Early Detection of Personal Financial Leakage** system.

## 1. Objective
The primary goal of the ML service is to identify "financial leakage"—transactions that are anomalous, represent forgotten subscriptions, or deviate significantly from a user's historical spending behavior.

## 2. Dataset Specification
The model works with tabular transaction data containing:
- **Amount** (Float)
- **Category** (String)
- **Is Subscription** (Boolean)

### Data Preprocessing
- **Categorical Encoding:** `LabelEncoder` transforms the `category` feature.
- **Scale:** `StandardScaler` centers the `amount` with unit variance.

## 3. Model Architecture
The system employs a hybrid approach:
- **Isolation Forest:** For unsupervised outlier detection (flagging things that are "not like the others").
- **Random Forest:** To provide a granular probability (Risk Score).

## 4. Risk Thresholds & Classification
The system uses a strict classification boundary to ensure accuracy:

| Risk Score | Classification | Status |
| :--- | :--- | :--- |
| **0.0 - 50.0%** | **Normal** | Transaction is considered safe. |
| **50.1 - 100.0%** | **Risky** | **Alert!** Potential financial leakage detected. |

---

## 5. Dual-Model Architecture
To ensure extreme reliability, the PFM system employs a **Layered Logic** approach:

### Layer 1: Heuristic Model (Baseline)
Before reaching the ML service, the system applies core safety rules:
- **Absolute Limit:** Any transaction **> $500.00** is automatically flagged as Risky (85% score).
- **Targeted Leakage:** **Food** transactions **> $300.00** (like your $567.00 bill) are flagged (90% score).
- **Subscription Leakage:** Any **Recurring Subscription > $100.00** is flagged (75% score).

### Layer 2: Advanced AI (Probabilistic)
If the Python ML service is active, it calculates its higher-precision probability based on isolation and random forest trees. This overrides the baseline for more personalized detection.

---
> [!IMPORTANT]
> The risk classification is currently set at a **50% sensitivity threshold**. This can be adjusted in `server/src/routes/transactions.js` if you want to make the system more or less sensitive.
