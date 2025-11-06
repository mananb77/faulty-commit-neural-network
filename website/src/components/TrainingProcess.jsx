import { motion } from 'framer-motion';
import { FiCpu, FiClock, FiActivity } from 'react-icons/fi';
import { trainingMetrics } from '../data/trainingMetrics';
import { trainingProcess } from '../data/modelSpecs';
import InteractiveChart from './InteractiveChart';
import CodeSnippet from './CodeSnippet';

const TrainingProcess = () => {
  const singleLayerData = trainingMetrics.singleLayerNN;

  return (
    <section id="training" className="section-container bg-dark-bg-secondary/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-12 text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          <span className="text-dark-text">Training</span> <span className="gradient-text">Process</span>
        </h2>
        <p className="text-lg text-dark-text-secondary leading-relaxed">
          Our training pipeline uses AdamW optimization with Binary Cross-Entropy loss,
          tracking multiple metrics to ensure convergence and prevent overfitting.
        </p>
      </motion.div>

      {/* Training Metrics Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <div className="glass-card p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dark-accent/10 mb-4">
            <FiClock className="w-6 h-6 text-dark-accent" />
          </div>
          <div className="text-3xl font-bold gradient-text mb-2">
            {singleLayerData.trainingTime}s
          </div>
          <div className="text-sm text-dark-text-secondary">Training Time</div>
          <div className="text-xs text-dark-text-secondary mt-1">
            {singleLayerData.epochs} epochs
          </div>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dark-accent/10 mb-4">
            <FiActivity className="w-6 h-6 text-dark-accent" />
          </div>
          <div className="text-3xl font-bold text-dark-text mb-2">
            {singleLayerData.trainingLoss[singleLayerData.trainingLoss.length - 1].loss.toFixed(3)}
          </div>
          <div className="text-sm text-dark-text-secondary">Final Training Loss</div>
          <div className="text-xs text-green-400 mt-1">
            Target: &lt; 0.35 ✓
          </div>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dark-accent/10 mb-4">
            <FiCpu className="w-6 h-6 text-dark-accent" />
          </div>
          <div className="text-3xl font-bold text-dark-text mb-2">
            {singleLayerData.batchSize}
          </div>
          <div className="text-sm text-dark-text-secondary">Batch Size</div>
          <div className="text-xs text-dark-text-secondary mt-1">
            {singleLayerData.trainingLoss.length * singleLayerData.batchSize} samples/epoch
          </div>
        </div>
      </motion.div>

      {/* Training Loss Chart */}
      <div className="mb-12">
        <InteractiveChart
          data={singleLayerData.trainingLoss}
          type="line"
          xKey="epoch"
          lines={[
            { key: 'loss', name: 'Training Loss', color: '#00d9ff' }
          ]}
          title="Training Loss Over Epochs (SingleLayerNN)"
          xLabel="Epoch"
          yLabel="Loss"
          height={350}
          valueFormatter={(value) => value.toFixed(4)}
        />
      </div>

      {/* Training Accuracy Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <InteractiveChart
          data={singleLayerData.trainingAccuracy}
          type="area"
          xKey="epoch"
          lines={[
            { key: 'accuracy', name: 'Overall Accuracy', color: '#0f62fe' }
          ]}
          title="Training Accuracy"
          xLabel="Epoch"
          yLabel="Accuracy (%)"
          height={300}
          valueFormatter={(value) => value.toFixed(2) + '%'}
        />

        <InteractiveChart
          data={singleLayerData.trainingAccuracy}
          type="area"
          xKey="epoch"
          lines={[
            { key: 'positiveClassAcc', name: 'Positive Class Accuracy', color: '#10b981' }
          ]}
          title="Positive Class Accuracy"
          xLabel="Epoch"
          yLabel="Accuracy (%)"
          height={300}
          valueFormatter={(value) => value.toFixed(2) + '%'}
        />
      </div>

      {/* Validation AP Over Epochs */}
      <div className="mb-12">
        <InteractiveChart
          data={singleLayerData.validationMetrics}
          type="line"
          xKey="epoch"
          lines={[
            { key: 'ap', name: 'Average Precision', color: '#8b5cf6' },
            { key: 'f1', name: 'F1 Score', color: '#ec4899' }
          ]}
          title="Validation Metrics Over Epochs"
          xLabel="Epoch"
          yLabel="Score"
          height={350}
          valueFormatter={(value) => value.toFixed(4)}
        />
      </div>

      {/* Training Loop Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass-card p-8 mb-12"
      >
        <h3 className="text-2xl font-bold text-dark-text mb-6">Training Loop Steps</h3>
        <div className="space-y-2">
          {trainingProcess.steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-3 text-dark-text-secondary hover:text-dark-text transition-colors"
            >
              <span className="text-dark-accent mt-1">→</span>
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Training Code */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-dark-text mb-4">Training Loop Implementation</h3>
        <CodeSnippet
          code={trainingProcess.codeSnippet}
          language="python"
          title="trainer/trainer.py"
        />
      </motion.div>
    </section>
  );
};

export default TrainingProcess;
