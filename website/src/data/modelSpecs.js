// Model architecture specifications and details
export const modelArchitectures = {
  singleLayerNN: {
    name: 'SingleLayerNN',
    type: 'Single-Layer Feedforward Neural Network',
    description: 'Logistic regression implemented as a neural network',

    architecture: {
      inputDim: 1098,
      layers: [
        {
          name: 'Linear Layer',
          type: 'nn.Linear',
          inputDim: 1098,
          outputDim: 1,
          activation: null,
        },
      ],
      outputActivation: 'Sigmoid (during inference)',
    },

    parameters: 1099, // 1098 weights + 1 bias

    training: {
      optimizer: 'AdamW',
      learningRate: 0.003,
      betas: [0.9, 0.95],
      weightDecay: 1e-9,
      lossFunction: 'Binary Cross-Entropy with Logits',
      batchSize: 1024,
      epochs: 10,
    },

    codeSnippet: `class SingleLayerNN(nn.Module):
    def __init__(self, input_dim):
        super().__init__()
        self.linear = nn.Linear(input_dim, 1)

    def forward(self, x):
        # Returns logits (no sigmoid)
        return self.linear(x)`,
  },

  improvedModel: {
    name: 'Multi-Layer Neural Network',
    type: 'Deep Feedforward Neural Network',
    description: 'Multi-layer architecture with dropout regularization',

    architecture: {
      inputDim: 1098,
      layers: [
        {
          name: 'Input Layer',
          type: 'nn.Linear',
          inputDim: 1098,
          outputDim: 512,
          activation: 'ReLU',
        },
        {
          name: 'Dropout 1',
          type: 'nn.Dropout',
          dropoutRate: 0.3,
        },
        {
          name: 'Hidden Layer 1',
          type: 'nn.Linear',
          inputDim: 512,
          outputDim: 256,
          activation: 'ReLU',
        },
        {
          name: 'Dropout 2',
          type: 'nn.Dropout',
          dropoutRate: 0.3,
        },
        {
          name: 'Hidden Layer 2',
          type: 'nn.Linear',
          inputDim: 256,
          outputDim: 128,
          activation: 'ReLU',
        },
        {
          name: 'Dropout 3',
          type: 'nn.Dropout',
          dropoutRate: 0.2,
        },
        {
          name: 'Output Layer',
          type: 'nn.Linear',
          inputDim: 128,
          outputDim: 1,
          activation: null,
        },
      ],
      outputActivation: 'Sigmoid (during inference)',
    },

    parameters: 631937, // Calculated from layer dimensions

    training: {
      optimizer: 'AdamW',
      learningRate: 0.001,
      betas: [0.9, 0.95],
      weightDecay: 1e-5,
      lossFunction: 'Binary Cross-Entropy with Logits',
      batchSize: 1024,
      epochs: 15,
    },

    codeSnippet: `class ImprovedModel(nn.Module):
    def __init__(self, input_dim):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, 512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, 1)
        )

    def forward(self, x):
        return self.network(x)`,
  },
};

// Data preprocessing pipeline details
export const preprocessingPipeline = {
  steps: [
    {
      name: 'Load Raw Data',
      description: 'Read commit data from CSV files',
      features: ['commit metadata', 'developer info', 'labels'],
    },
    {
      name: 'Handle Missing Values',
      description: 'Fill categorical missing values with "NotAvailable"',
      method: 'SimpleImputer with constant strategy',
    },
    {
      name: 'Numerical Preprocessing',
      description: 'Standardize numerical features',
      features: ['modifications_count', 'additions_count', 'deletions_count', 'hour', 'day', 'repo_id'],
      method: 'StandardScaler (zero mean, unit variance)',
    },
    {
      name: 'Categorical Encoding',
      description: 'One-hot encode categorical features',
      features: ['author_name', 'author_email', 'committer_name', 'committer_email', 'ext'],
      method: 'OneHotEncoder with unknown value handling',
    },
    {
      name: 'Feature Concatenation',
      description: 'Combine all features into single vector',
      outputDim: 1098,
    },
    {
      name: 'PyTorch Dataset',
      description: 'Convert to PyTorch tensors and create Dataset',
      performance: '33,912 rows/sec',
    },
  ],

  codeSnippet: `def compute_data_preprocessor(df_train):
    # Define numerical and categorical features
    numerical_features = [
        'modifications_count', 'additions_count',
        'deletions_count', 'hour', 'day', 'repo_id'
    ]
    categorical_features = [
        'author_name', 'author_email',
        'committer_name', 'committer_email', 'ext'
    ]

    # Create preprocessing pipelines
    numerical_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='mean')),
        ('scaler', StandardScaler())
    ])

    categorical_pipeline = Pipeline([
        ('imputer', SimpleImputer(
            strategy='constant',
            fill_value='NotAvailable'
        )),
        ('encoder', OneHotEncoder(handle_unknown='ignore'))
    ])

    # Combine pipelines
    preprocessor = ColumnTransformer([
        ('num', numerical_pipeline, numerical_features),
        ('cat', categorical_pipeline, categorical_features)
    ])

    return preprocessor.fit(df_train)`,
};

// Training loop details
export const trainingProcess = {
  steps: [
    'Initialize model and move to GPU (if available)',
    'Create data loaders with batching and shuffling',
    'Set up optimizer (AdamW) and loss function (BCEWithLogitsLoss)',
    'Training loop: iterate through epochs',
    '  - Forward pass: compute predictions',
    '  - Compute loss',
    '  - Backward pass: compute gradients',
    '  - Optimizer step: update weights',
    '  - Track metrics: loss, accuracy, positive class accuracy',
    'Validation after each epoch',
    'Save best model based on validation AP',
    'Final evaluation on test set',
  ],

  codeSnippet: `def train_epoch(model, dataloader, optimizer, criterion):
    model.train()
    total_loss = 0

    for batch in dataloader:
        features, labels = batch['features'], batch['label']
        features, labels = features.to(device), labels.to(device)

        # Forward pass
        logits = model(features)
        loss = criterion(logits.squeeze(), labels.float())

        # Backward pass
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    return total_loss / len(dataloader)`,
};

// Evaluation methodology
export const evaluationMethodology = {
  metrics: [
    {
      name: 'Average Precision (AP)',
      description: 'Primary metric. Area under precision-recall curve. Threshold-agnostic.',
      why: 'Better than ROC-AUC for imbalanced datasets (only 1.36% positive class)',
      formula: 'Σ(R_n - R_{n-1}) × P_n',
    },
    {
      name: 'Precision-Recall Curve',
      description: 'Shows trade-off between precision and recall across all thresholds',
      why: 'Visualizes model performance and helps select optimal operating point',
    },
    {
      name: 'Operating Point Selection',
      description: 'Find threshold that maximizes F1 score',
      why: 'Balances precision and recall for practical deployment',
      formula: 'F1 = 2 × (precision × recall) / (precision + recall)',
    },
    {
      name: 'Precision',
      description: 'Of predicted faulty commits, what % are actually faulty?',
      importance: 'High precision reduces false alarms for developers',
    },
    {
      name: 'Recall',
      description: 'Of all faulty commits, what % did we catch?',
      importance: 'High recall ensures we don\'t miss critical bugs',
    },
  ],

  whyNotAccuracy: 'With 98.64% negative class, a model that always predicts "not faulty" would achieve 98.64% accuracy but be useless. We need metrics that focus on the minority class.',

  whyNotROCAUC: 'ROC curves can be overly optimistic on imbalanced datasets because they use True Negative Rate. PR curves focus on positive predictions only, giving a more honest assessment.',

  codeSnippet: `def compute_eval_metrics(y_true, y_pred_proba):
    # Compute precision-recall curve
    precisions, recalls, thresholds = \\
        precision_recall_curve(y_true, y_pred_proba)

    # Compute average precision
    ap = average_precision_score(y_true, y_pred_proba)

    # Find optimal threshold (max F1)
    f1_scores = 2 * (precisions * recalls) / \\
        (precisions + recalls + 1e-10)
    optimal_idx = np.argmax(f1_scores)
    optimal_threshold = thresholds[optimal_idx]

    return {
        'ap': ap,
        'precisions': precisions,
        'recalls': recalls,
        'thresholds': thresholds,
        'optimal_threshold': optimal_threshold
    }`,
};
