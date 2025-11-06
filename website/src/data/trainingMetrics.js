// Training metrics data for SingleLayerNN model
export const trainingMetrics = {
  singleLayerNN: {
    epochs: 10,
    batchSize: 1024,
    trainingTime: 5.5, // seconds

    // Training loss over epochs
    trainingLoss: [
      { epoch: 1, loss: 0.45, step: 42 },
      { epoch: 2, loss: 0.38, step: 84 },
      { epoch: 3, loss: 0.35, step: 126 },
      { epoch: 4, loss: 0.33, step: 168 },
      { epoch: 5, loss: 0.31, step: 210 },
      { epoch: 6, loss: 0.30, step: 252 },
      { epoch: 7, loss: 0.29, step: 294 },
      { epoch: 8, loss: 0.28, step: 336 },
      { epoch: 9, loss: 0.27, step: 378 },
      { epoch: 10, loss: 0.26, step: 420 },
    ],

    // Training accuracy over epochs
    trainingAccuracy: [
      { epoch: 1, accuracy: 92.5, positiveClassAcc: 15.2 },
      { epoch: 2, accuracy: 94.1, positiveClassAcc: 18.5 },
      { epoch: 3, accuracy: 95.2, positiveClassAcc: 21.3 },
      { epoch: 4, accuracy: 95.8, positiveClassAcc: 23.7 },
      { epoch: 5, accuracy: 96.1, positiveClassAcc: 25.4 },
      { epoch: 6, accuracy: 96.3, positiveClassAcc: 26.8 },
      { epoch: 7, accuracy: 96.5, positiveClassAcc: 27.9 },
      { epoch: 8, accuracy: 96.6, positiveClassAcc: 28.7 },
      { epoch: 9, accuracy: 96.7, positiveClassAcc: 29.3 },
      { epoch: 10, accuracy: 96.8, positiveClassAcc: 29.8 },
    ],

    // Validation metrics after each epoch
    validationMetrics: [
      { epoch: 1, ap: 0.02516, threshold: 0.50175, precision: 0.02831, recall: 0.15529, f1: 0.02395 },
      { epoch: 2, ap: 0.03529, threshold: 0.50120, precision: 0.09592, recall: 0.08020, f1: 0.04368 },
      { epoch: 3, ap: 0.03937, threshold: 0.49581, precision: 0.10942, recall: 0.12287, f1: 0.05788 },
      { epoch: 4, ap: 0.04038, threshold: 0.49255, precision: 0.10891, recall: 0.13140, f1: 0.05955 },
      { epoch: 5, ap: 0.04056, threshold: 0.49358, precision: 0.10866, recall: 0.12628, f1: 0.05841 },
      { epoch: 6, ap: 0.04068, threshold: 0.49561, precision: 0.10802, recall: 0.11945, f1: 0.05673 },
      { epoch: 7, ap: 0.04058, threshold: 0.47463, precision: 0.09064, recall: 0.15700, f1: 0.05746 },
      { epoch: 8, ap: 0.04123, threshold: 0.47032, precision: 0.09427, recall: 0.16553, f1: 0.06006 },
      { epoch: 9, ap: 0.04098, threshold: 0.46488, precision: 0.09438, recall: 0.16894, f1: 0.06055 },
      { epoch: 10, ap: 0.04110, threshold: 0.46111, precision: 0.09465, recall: 0.16894, f1: 0.06066 },
    ],
  },

  improvedModel: {
    epochs: 15,
    batchSize: 1024,
    trainingTime: 12.3,

    trainingLoss: [
      { epoch: 1, loss: 0.42, step: 42 },
      { epoch: 2, loss: 0.34, step: 84 },
      { epoch: 3, loss: 0.29, step: 126 },
      { epoch: 4, loss: 0.26, step: 168 },
      { epoch: 5, loss: 0.24, step: 210 },
      { epoch: 6, loss: 0.22, step: 252 },
      { epoch: 7, loss: 0.21, step: 294 },
      { epoch: 8, loss: 0.20, step: 336 },
      { epoch: 9, loss: 0.19, step: 378 },
      { epoch: 10, loss: 0.18, step: 420 },
      { epoch: 11, loss: 0.18, step: 462 },
      { epoch: 12, loss: 0.17, step: 504 },
      { epoch: 13, loss: 0.17, step: 546 },
      { epoch: 14, loss: 0.17, step: 588 },
      { epoch: 15, loss: 0.16, step: 630 },
    ],

    validationMetrics: [
      { epoch: 1, ap: 0.0285, threshold: 0.48, precision: 0.088, recall: 0.175, f1: 0.058 },
      { epoch: 5, ap: 0.0312, threshold: 0.465, precision: 0.095, recall: 0.192, f1: 0.063 },
      { epoch: 10, ap: 0.0335, threshold: 0.455, precision: 0.102, recall: 0.205, f1: 0.068 },
      { epoch: 15, ap: 0.0348, threshold: 0.45, precision: 0.106, recall: 0.215, f1: 0.070 },
    ],
  }
};

// System performance metrics
export const systemMetrics = {
  dataloaderThroughput: 33912, // rows/sec
  dataloaderLatencyAvg: 0.000117, // seconds
  gpuMemoryUsed: 19.31, // MB
  totalDatasetSize: 120845, // commits
  featureDimensions: 1098,
};
