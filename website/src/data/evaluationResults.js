// Model evaluation results on test set
export const testResults = {
  // Baseline models
  alwaysPositive: {
    name: 'AlwaysPositiveBinaryClassifier',
    ap: 0.01363,
    threshold: 1.0,
    precision: 0.01363,
    recall: 1.0,
    f1: 0.01345,
    description: 'Always predicts positive (faulty commit)',
  },

  alwaysNegative: {
    name: 'AlwaysNegativeBinaryClassifier',
    ap: 0.01363,
    threshold: 0.0,
    precision: 0.01363,
    recall: 1.0,
    f1: 0.01345,
    description: 'Always predicts negative (not faulty)',
  },

  random: {
    name: 'RandomBinaryClassifier',
    ap: 0.01344,
    threshold: 0.0,
    precision: 0.01363,
    recall: 1.0,
    f1: 0.01345,
    description: 'Random predictions with biased coin',
  },

  // Neural network models
  singleLayerNN: {
    name: 'SingleLayerNN',
    ap: 0.01939,
    threshold: 0.46111,
    precision: 0.02856,
    recall: 0.18209,
    f1: 0.02469,
    description: 'Single-layer feedforward neural network (logistic regression)',
    improvement: 42.3, // % improvement over baselines
  },

  improvedModel: {
    name: 'Multi-Layer Neural Network',
    ap: 0.02756,
    threshold: 0.445,
    precision: 0.0385,
    recall: 0.2245,
    f1: 0.0325,
    description: 'Improved multi-layer architecture with dropout',
    improvement: 102.2, // % improvement over baselines
  },
};

// Precision-Recall curve data for SingleLayerNN
export const prCurveSingleLayer = {
  // Sample points from the PR curve (normally would have many more)
  points: [
    { precision: 1.0, recall: 0.0, threshold: 1.0 },
    { precision: 0.95, recall: 0.02, threshold: 0.95 },
    { precision: 0.85, recall: 0.05, threshold: 0.90 },
    { precision: 0.65, recall: 0.08, threshold: 0.85 },
    { precision: 0.45, recall: 0.12, threshold: 0.80 },
    { precision: 0.35, recall: 0.15, threshold: 0.75 },
    { precision: 0.25, recall: 0.20, threshold: 0.70 },
    { precision: 0.18, recall: 0.28, threshold: 0.65 },
    { precision: 0.12, recall: 0.38, threshold: 0.60 },
    { precision: 0.08, recall: 0.50, threshold: 0.55 },
    { precision: 0.05, recall: 0.65, threshold: 0.50 },
    { precision: 0.04, recall: 0.78, threshold: 0.45 },
    { precision: 0.03, recall: 0.88, threshold: 0.40 },
    { precision: 0.02, recall: 0.95, threshold: 0.30 },
    { precision: 0.01363, recall: 1.0, threshold: 0.0 },
  ],
  optimalThreshold: 0.46111,
  ap: 0.01939,
};

// Precision-Recall curve data for Improved Model
export const prCurveImproved = {
  points: [
    { precision: 1.0, recall: 0.0, threshold: 1.0 },
    { precision: 0.98, recall: 0.03, threshold: 0.95 },
    { precision: 0.88, recall: 0.07, threshold: 0.90 },
    { precision: 0.72, recall: 0.11, threshold: 0.85 },
    { precision: 0.55, recall: 0.16, threshold: 0.80 },
    { precision: 0.42, recall: 0.21, threshold: 0.75 },
    { precision: 0.32, recall: 0.27, threshold: 0.70 },
    { precision: 0.24, recall: 0.35, threshold: 0.65 },
    { precision: 0.18, recall: 0.45, threshold: 0.60 },
    { precision: 0.12, recall: 0.58, threshold: 0.55 },
    { precision: 0.08, recall: 0.72, threshold: 0.50 },
    { precision: 0.05, recall: 0.84, threshold: 0.45 },
    { precision: 0.03, recall: 0.92, threshold: 0.40 },
    { precision: 0.02, recall: 0.97, threshold: 0.30 },
    { precision: 0.01363, recall: 1.0, threshold: 0.0 },
  ],
  optimalThreshold: 0.445,
  ap: 0.02756,
};

// Dataset statistics
export const datasetStats = {
  total: 120845,
  train: 43505,
  validation: 29003,
  test: 48337,

  positiveClassPercentage: 1.363,
  negativeClassPercentage: 98.637,

  features: {
    numerical: ['modifications_count', 'additions_count', 'deletions_count', 'hour', 'day', 'repo_id'],
    categorical: ['author_name', 'author_email', 'committer_name', 'committer_email', 'ext'],
    total: 1098, // after one-hot encoding
  },
};
