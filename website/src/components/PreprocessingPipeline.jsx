import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { preprocessingPipeline } from '../data/modelSpecs';
import { systemMetrics } from '../data/trainingMetrics';
import CodeSnippet from './CodeSnippet';

const PreprocessingPipeline = () => {
  return (
    <section id="preprocessing" className="section-container bg-dark-bg-secondary/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-12 text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          <span className="text-dark-text">Data</span> <span className="gradient-text">Preprocessing</span>
        </h2>
        <p className="text-lg text-dark-text-secondary leading-relaxed">
          A sophisticated preprocessing pipeline transforms raw Git commit data into tensor representations
          suitable for neural network training.
        </p>
      </motion.div>

      {/* Pipeline Flow */}
      <div className="mb-12">
        {preprocessingPipeline.steps.map((step, index) => (
          <motion.div
            key={step.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-6 mb-4 hover:border-dark-accent/30 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dark-accent to-dark-accent-secondary flex items-center justify-center text-dark-bg font-bold">
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dark-text mb-2 group-hover:text-dark-accent transition-colors">
                    {step.name}
                  </h3>
                  <p className="text-sm text-dark-text-secondary mb-3">
                    {step.description}
                  </p>

                  {step.features && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {step.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-dark-bg-tertiary/50 rounded text-xs font-mono text-dark-text-secondary"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {step.method && (
                    <div className="text-xs text-dark-accent font-mono">
                      → {step.method}
                    </div>
                  )}

                  {step.outputDim && (
                    <div className="text-xs text-dark-accent font-mono">
                      → Output: {step.outputDim} dimensions
                    </div>
                  )}

                  {step.performance && (
                    <div className="text-xs text-green-400 font-mono">
                      ⚡ Performance: {step.performance}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {index < preprocessingPipeline.steps.length - 1 && (
              <div className="flex justify-center my-2">
                <FiArrowRight className="w-6 h-6 text-dark-accent" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass-card p-8 mb-12"
      >
        <h3 className="text-2xl font-bold text-dark-text mb-6 text-center">
          Dataloader Performance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">
              {systemMetrics.dataloaderThroughput.toLocaleString()}
            </div>
            <div className="text-sm text-dark-text-secondary">rows/sec</div>
            <div className="text-xs text-green-400 mt-1">
              6.7x faster than requirement (5,000 rows/sec)
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-dark-text mb-2">
              {(systemMetrics.dataloaderLatencyAvg * 1000).toFixed(2)}ms
            </div>
            <div className="text-sm text-dark-text-secondary">avg latency</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-dark-text mb-2">
              {systemMetrics.gpuMemoryUsed.toFixed(1)}
            </div>
            <div className="text-sm text-dark-text-secondary">MB GPU memory</div>
          </div>
        </div>
      </motion.div>

      {/* Code Implementation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-dark-text mb-4">Implementation</h3>
        <CodeSnippet
          code={preprocessingPipeline.codeSnippet}
          language="python"
          title="dataloader/fault_csv_dataset.py"
        />
      </motion.div>
    </section>
  );
};

export default PreprocessingPipeline;
