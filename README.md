# Faulty Commit Classification with Binary Classifiers

[![Deploy to GitHub Pages](https://github.com/mananb77/faulty-commit-neural-network/actions/workflows/deploy.yml/badge.svg)](https://github.com/mananb77/faulty-commit-neural-network/actions/workflows/deploy.yml)

This project implements and evaluates binary classification models to predict whether a commit is faulty or not. It includes data preprocessing, baseline and neural models, evaluation using precision-recall curves and average precision (AP), and support for trivial and advanced baselines.

This repository was developed as part of a machine learning project, and contains an end-to-end pipeline from data loading and model training to offline evaluation and submission packaging. This machine learning project was developed based on a deep neural networks course at UC Berkeley.

**Repository**: https://github.com/mananb77/faulty-commit-neural-network

**Live Demo**: https://mananb77.github.io/faulty-commit-neural-network/

> Visit the [interactive portfolio website](https://mananb77.github.io/faulty-commit-neural-network/) to explore the project with visualizations, interactive charts, and detailed explanations.

---

## Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [Offline Evaluation Details](#-offline-evaluation-details)
- [Trivial Baselines](#-trivial-baselines)
- [Neural Models](#-neural-models)
- [Results](#-results)
- [Acknowledgements](#-acknowledgements)

---

## 🚀 Features

- Offline evaluation using precision-recall curves, F1 scores, and Average Precision (AP)
- Implementation of trivial baseline classifiers:
  - AlwaysPositiveBinaryClassifier
  - AlwaysNegativeBinaryClassifier
  - RandomBinaryClassifier
- Neural models including:
  - Single-layer feedforward neural network (SingleLayerNN)
  - Custom multilayer architectures to beat baseline performance
- Utilities for loading and preprocessing commit-level and developer-level metadata
- Colab integration and Gradescope-compatible submission pipeline
- Custom PyTorch Dataset implementation with efficient data loading (5000+ rows/sec throughput)
- Comprehensive test suite for all components

---

## 📦 Installation

### Prerequisites

- Python 3.8+
- PyTorch
- NumPy
- Matplotlib
- Seaborn
- scikit-learn
- tqdm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/mananb77/faulty-commit-neural-network.git
cd faulty-commit-neural-network
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Verify the installation:
```bash
python -c "import torch; print(f'PyTorch version: {torch.__version__}')"
```

---

## 🚀 Quick Start

### Running the Jupyter Notebook

The main workflow is contained in `final_project.ipynb`. You can run it locally or on Google Colab:

**Google Colab (Recommended):**
1. Upload the project to your Google Drive
2. Open `final_project.ipynb` in Google Colab
3. Update the `root_folder` path in the notebook
4. Run all cells sequentially

**Local Jupyter:**
```bash
jupyter notebook final_project.ipynb
```

### Training a Model

The notebook is organized into parts:

- **Part 1**: Data preprocessing and dataloader implementation
- **Part 2**: Model implementation and training loop
- **Part 3**: Offline evaluation pipeline
- **Part 4**: Train and evaluate SingleLayerNN
- **Part 5**: Train an improved model

Simply run the cells sequentially to complete each part.

---

## 🗂️ Project Structure
```bash
├── consts.py                            # Project-wide constants
├── final_project.ipynb                  # Main Colab notebook for training, evaluation, and submission
├── evaluation/
│   └── offline_eval.py                  # Offline evaluation pipeline implementation (predict_samples, compute_eval_metrics)
├── modeling/
│   ├── model_interface.py              # Defines the base model interface
│   ├── model_random.py                 # Contains RandomBinaryClassifier
│   ├── model_single_layer.py          # Implementation of SingleLayerNN
│   └── trivial_models.py              # AlwaysPositive and AlwaysNegative classifiers
├── utils/
│   └── utils.py                        # Utility functions (e.g., dataloader creation, preprocessing helpers)
├── dataloader/
│   ├── fault_csv_dataset.py           # Custom PyTorch dataset class for loading commit data
│   └── preprocess.py                  # Data preprocessing logic (fit/transform for features)
├── data/
│   ├── raw/                           # Contains raw datasets (e.g., user_meta.csv)
│   └── split/                         # Pre-split train/val/test datasets
├── submission/
│   └── generate_submission.py         # Script to zip files and generate Gradescope-compatible submission
└── requirements.txt                   # Python dependencies
```

---

## 💻 Usage

### Running Tests

Run the test suite to verify your implementations:

```python
# Test dataloader implementation
from tests.dataloader.test_fault_csv_dataset import TestComputeDataPreprocessor, TestFaultCsvDataset

# Test compute_data_preprocessor
testcase = TestComputeDataPreprocessor()
testcase.test_simple()

# Test FaultCSVDataset
testcase = TestFaultCsvDataset()
testcase.test_simple()
```

### Training Models

```python
# Train SingleLayerNN
from train import main_train_pt2c
train_meta, fig = main_train_pt2c()

# Train and evaluate SingleLayerNN
from train import main_train_and_eval_pt4
train_meta, (test_eval_metrics, test_metrics_op), fig = main_train_and_eval_pt4()

# Train improved model
from train_pt5 import train_and_eval_pt5
train_metadata, (test_eval_metrics, test_metrics_op), fig = train_and_eval_pt5()
```

### Evaluating Baseline Models

```python
from tools.evaluate_trivial_models import main_evaluate_model_random, main_evaluate_always_pos_neg

# Evaluate random classifier
test_eval_metrics = main_evaluate_model_random()

# Evaluate always positive/negative classifiers
test_eval_pos, test_eval_neg = main_evaluate_always_pos_neg()
```

### Benchmarking Dataloader

```python
from tools.benchmark_dataloader import main_benchmark_dataloader

benchmark_stats = main_benchmark_dataloader()
print(f"Throughput: {benchmark_stats['throughput_rows_per_sec']:.2f} rows/sec")
```

---

## 📈 Offline Evaluation Details

The evaluation pipeline computes:

- Precision-Recall Curve using `sklearn.metrics.precision_recall_curve`
- Average Precision using `sklearn.metrics.average_precision_score`
- Operating point (threshold) that maximizes F1 score
- Precision/Recall/F1 metrics at arbitrary thresholds

All results are wrapped in structured data classes (`PredictionMetadata`, `OperatingPointMetrics`, etc.).

---

## 🧪 Trivial Baselines

Implemented in `trivial_models.py` and `model_random.py`:

- **AlwaysPositiveBinaryClassifier**: always predicts the positive class
- **AlwaysNegativeBinaryClassifier**: always predicts the negative class
- **RandomBinaryClassifier**: predicts randomly based on a biased coin

Use these to establish performance baselines and debug the evaluation pipeline.

---

## 🧠 Neural Models

### SingleLayerNN

A simple feedforward model with a single linear layer, implementing logistic regression as a neural network.

**Architecture:**
- Input layer: 1098 features (commit and developer metadata)
- Single linear transformation
- Sigmoid activation for binary classification

**Implementation:** `modeling/model_single_layer.py`

### Improved Model

An optional multi-layer architecture designed to outperform the baseline SingleLayerNN.

**Target Performance:**
- Test Average Precision (AP) > 0.025

**Implementation:** `train_pt5.py`

---

## 📊 Results

### Performance Benchmarks

| Model | Test AP | Threshold | Precision | Recall | F1 Score |
|-------|---------|-----------|-----------|--------|----------|
| RandomBinaryClassifier | ~0.0134 | 0.0000 | 0.0136 | 1.0000 | 0.0135 |
| AlwaysPositiveBinaryClassifier | 0.0136 | 1.0000 | 0.0136 | 1.0000 | 0.0135 |
| AlwaysNegativeBinaryClassifier | 0.0136 | 0.0000 | 0.0136 | 1.0000 | 0.0135 |
| SingleLayerNN | >0.015 | Variable | Variable | Variable | Variable |
| Improved Model | >0.025 | Variable | Variable | Variable | Variable |

### Training Performance

- **Dataloader Throughput:** >5000 rows/sec (requirement)
- **SingleLayerNN Training Loss:** <0.35 (final epoch requirement)
- **GPU Memory Usage:** ~19 MB max allocated

### Key Insights

1. The trivial baselines (AlwaysPositive, AlwaysNegative, Random) all achieve similar performance (~0.0136 AP), establishing a baseline that neural models must beat.

2. SingleLayerNN shows improvement over trivial baselines with >0.015 AP, demonstrating that commit features contain predictive signal for identifying faulty commits.

3. The improved multi-layer model achieves >0.025 AP, showing that deeper architectures can capture more complex patterns in the commit data.

---

## 🔧 Development

### Project Requirements

- **Part 1 (Dataloader):** Achieve >5000 rows/sec throughput
- **Part 2 (Training):** Final train loss <0.35
- **Part 4 (SingleLayerNN):** Test AP ≥ 0.015
- **Part 5 (Improved Model):** Test AP ≥ 0.025

### Running the Full Pipeline

To complete the entire project workflow:

1. Implement data preprocessing in `dataloader/fault_csv_dataset.py`
2. Implement the model architecture in `modeling/model_single_layer.py`
3. Implement the training loop in `trainer/trainer.py`
4. Implement evaluation functions in `evaluation/offline_eval.py`
5. Implement trivial baselines in `modeling/trivial_models.py` and `modeling/model_random.py`
6. Run all notebook cells in `final_project.ipynb`
7. Generate submission zip for Gradescope

---

## 📌 Acknowledgements

This project was developed for educational purposes as part of a deep neural networks course at UC Berkeley. Special thanks to the course staff for designing the pipeline and providing a great learning experience.

---

## 📄 License

This project is provided for educational purposes.
