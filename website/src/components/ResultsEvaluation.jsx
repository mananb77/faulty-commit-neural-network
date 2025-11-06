import { motion } from 'framer-motion';
import { FiAward, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { testResults, prCurveSingleLayer, prCurveImproved } from '../data/evaluationResults';
import { evaluationMethodology } from '../data/modelSpecs';
import InteractiveChart from './InteractiveChart';
import CodeSnippet from './CodeSnippet';

const ResultsEvaluation = () => {
  const allModels = [
    testResults.random,
    testResults.alwaysPositive,
    testResults.alwaysNegative,
    testResults.singleLayerNN,
    testResults.improvedModel,
  ];

  return (
    <section id="results" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-12 text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          <span className="text-dark-text">Results &</span> <span className="gradient-text">Evaluation</span>
        </h2>
        <p className="text-lg text-dark-text-secondary leading-relaxed">
          Our models are evaluated using Average Precision and Precision-Recall curves,
          which are more appropriate than accuracy for imbalanced datasets.
        </p>
      </motion.div>

      {/* Model Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="glass-card p-6 mb-12 overflow-x-auto"
      >
        <h3 className="text-2xl font-bold text-dark-text mb-6">Model Performance Comparison</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-bg-tertiary">
                <th className="text-left py-3 px-4 text-dark-text font-semibold">Model</th>
                <th className="text-center py-3 px-4 text-dark-text font-semibold">Test AP</th>
                <th className="text-center py-3 px-4 text-dark-text font-semibold">Precision</th>
                <th className="text-center py-3 px-4 text-dark-text font-semibold">Recall</th>
                <th className="text-center py-3 px-4 text-dark-text font-semibold">F1 Score</th>
                <th className="text-center py-3 px-4 text-dark-text font-semibold">Improvement</th>
              </tr>
            </thead>
            <tbody>
              {allModels.map((model, index) => (
                <motion.tr
                  key={model.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={`border-b border-dark-bg-tertiary/30 hover:bg-dark-bg-tertiary/20 transition-colors ${
                    index >= 3 ? 'bg-dark-accent/5' : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-dark-text font-medium">{model.name}</div>
                      <div className="text-xs text-dark-text-secondary">{model.description}</div>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className={`font-mono font-semibold ${index >= 3 ? 'text-dark-accent' : 'text-dark-text-secondary'}`}>
                      {model.ap.toFixed(5)}
                    </span>
                  </td>
                  <td className="text-center py-4 px-4 font-mono text-dark-text-secondary">
                    {model.precision.toFixed(4)}
                  </td>
                  <td className="text-center py-4 px-4 font-mono text-dark-text-secondary">
                    {model.recall.toFixed(4)}
                  </td>
                  <td className="text-center py-4 px-4 font-mono text-dark-text-secondary">
                    {model.f1.toFixed(4)}
                  </td>
                  <td className="text-center py-4 px-4">
                    {model.improvement ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                        <FiTrendingUp className="w-3 h-3" />
                        +{model.improvement}%
                      </span>
                    ) : (
                      <span className="text-dark-text-secondary text-xs">Baseline</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Key Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <div className="glass-card p-6 text-center">
          <FiAward className="w-12 h-12 text-dark-accent mx-auto mb-4" />
          <div className="text-3xl font-bold gradient-text mb-2">
            {((testResults.singleLayerNN.ap / testResults.random.ap - 1) * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-dark-text-secondary">
            SingleLayerNN improvement over baselines
          </div>
        </div>

        <div className="glass-card p-6 text-center">
          <FiTarget className="w-12 h-12 text-dark-accent mx-auto mb-4" />
          <div className="text-3xl font-bold gradient-text mb-2">
            {((testResults.improvedModel.ap / testResults.random.ap - 1) * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-dark-text-secondary">
            Improved Model beats baselines
          </div>
        </div>

        <div className="glass-card p-6 text-center">
          <FiTrendingUp className="w-12 h-12 text-dark-accent mx-auto mb-4" />
          <div className="text-3xl font-bold gradient-text mb-2">
            {testResults.improvedModel.ap.toFixed(4)}
          </div>
          <div className="text-sm text-dark-text-secondary">
            Best Test AP achieved
          </div>
          <div className="text-xs text-green-400 mt-1">
            Target: &gt; 0.025 ✓
          </div>
        </div>
      </motion.div>

      {/* Precision-Recall Curves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <InteractiveChart
          data={prCurveSingleLayer.points}
          type="area"
          xKey="recall"
          lines={[
            { key: 'precision', name: 'Precision', color: '#00d9ff' }
          ]}
          title={`SingleLayerNN (AP: ${prCurveSingleLayer.ap.toFixed(4)})`}
          xLabel="Recall"
          yLabel="Precision"
          height={350}
          valueFormatter={(value) => value.toFixed(3)}
        />

        <InteractiveChart
          data={prCurveImproved.points}
          type="area"
          xKey="recall"
          lines={[
            { key: 'precision', name: 'Precision', color: '#10b981' }
          ]}
          title={`Improved Model (AP: ${prCurveImproved.ap.toFixed(4)})`}
          xLabel="Recall"
          yLabel="Precision"
          height={350}
          valueFormatter={(value) => value.toFixed(3)}
        />
      </div>

      {/* Evaluation Methodology */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass-card p-8 mb-12"
      >
        <h3 className="text-2xl font-bold text-dark-text mb-6">Evaluation Metrics Explained</h3>

        <div className="space-y-6">
          {evaluationMethodology.metrics.map((metric, index) => (
            <div key={metric.name} className="pb-6 border-b border-dark-bg-tertiary/30 last:border-0">
              <h4 className="text-lg font-semibold text-dark-accent mb-2">{metric.name}</h4>
              <p className="text-sm text-dark-text-secondary mb-2">{metric.description}</p>
              <p className="text-sm text-dark-text italic">
                <span className="font-semibold">Why it matters:</span> {metric.why || metric.importance}
              </p>
              {metric.formula && (
                <code className="block mt-2 p-2 bg-dark-bg-tertiary/50 rounded text-xs text-dark-accent font-mono">
                  {metric.formula}
                </code>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-dark-accent/5 border border-dark-accent/20 rounded-lg">
          <h4 className="text-lg font-semibold text-dark-text mb-3">Why not Accuracy or ROC-AUC?</h4>
          <div className="space-y-3 text-sm text-dark-text-secondary">
            <p>
              <span className="font-semibold text-dark-text">Accuracy:</span> {evaluationMethodology.whyNotAccuracy}
            </p>
            <p>
              <span className="font-semibold text-dark-text">ROC-AUC:</span> {evaluationMethodology.whyNotROCAUC}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Evaluation Code */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-dark-text mb-4">Evaluation Implementation</h3>
        <CodeSnippet
          code={evaluationMethodology.codeSnippet}
          language="python"
          title="evaluation/offline_eval.py"
        />
      </motion.div>
    </section>
  );
};

export default ResultsEvaluation;
