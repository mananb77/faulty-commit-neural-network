import { motion } from 'framer-motion';
import { FiLayers, FiZap, FiTrendingUp } from 'react-icons/fi';
import { modelArchitectures } from '../data/modelSpecs';
import CodeSnippet from './CodeSnippet';

const ModelArchitecture = () => {
  const models = [modelArchitectures.singleLayerNN, modelArchitectures.improvedModel];

  return (
    <section id="models" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-12 text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          <span className="text-dark-text">Model</span> <span className="gradient-text">Architectures</span>
        </h2>
        <p className="text-lg text-dark-text-secondary leading-relaxed">
          We implemented and compared multiple neural network architectures, from simple logistic regression
          to deeper networks with dropout regularization.
        </p>
      </motion.div>

      {models.map((model, modelIndex) => (
        <motion.div
          key={model.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: modelIndex * 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* Model Header */}
          <div className="glass-card p-8 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-dark-text mb-2">{model.name}</h3>
                <p className="text-dark-text-secondary">{model.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">
                    {model.parameters.toLocaleString()}
                  </div>
                  <div className="text-xs text-dark-text-secondary">parameters</div>
                </div>
              </div>
            </div>

            {/* Architecture Layers */}
            <div className="space-y-3">
              {model.architecture.layers.map((layer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-dark-bg-tertiary/30 p-4 rounded-lg hover:bg-dark-bg-tertiary/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-dark-accent to-dark-accent-secondary flex items-center justify-center text-dark-bg text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <span className="text-sm font-semibold text-dark-text group-hover:text-dark-accent transition-colors">
                          {layer.name}
                        </span>
                      </div>
                      <div>
                        <code className="text-xs text-dark-text-secondary font-mono">
                          {layer.type}
                        </code>
                      </div>
                      <div className="text-xs text-dark-text-secondary">
                        {layer.inputDim && layer.outputDim && (
                          <span>{layer.inputDim} → {layer.outputDim}</span>
                        )}
                        {layer.activation && (
                          <span className="ml-2 text-dark-accent">{layer.activation}</span>
                        )}
                        {layer.dropoutRate && (
                          <span className="ml-2 text-yellow-400">p={layer.dropoutRate}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Output */}
              <div className="bg-dark-accent/10 p-4 rounded-lg border border-dark-accent/30">
                <div className="flex items-center gap-3">
                  <FiZap className="w-5 h-5 text-dark-accent" />
                  <span className="text-sm font-semibold text-dark-text">
                    Output: {model.architecture.outputActivation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Training Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <FiTrendingUp className="w-5 h-5 text-dark-accent" />
                <h4 className="text-lg font-bold text-dark-text">Training Config</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Optimizer:</span>
                  <code className="text-dark-text font-mono">{model.training.optimizer}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Learning Rate:</span>
                  <code className="text-dark-text font-mono">{model.training.learningRate}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Batch Size:</span>
                  <code className="text-dark-text font-mono">{model.training.batchSize}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Epochs:</span>
                  <code className="text-dark-text font-mono">{model.training.epochs}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Loss Function:</span>
                  <code className="text-dark-text font-mono text-xs">{model.training.lossFunction}</code>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <FiLayers className="w-5 h-5 text-dark-accent" />
                <h4 className="text-lg font-bold text-dark-text">Optimizer Params</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Beta 1:</span>
                  <code className="text-dark-text font-mono">{model.training.betas[0]}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Beta 2:</span>
                  <code className="text-dark-text font-mono">{model.training.betas[1]}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Weight Decay:</span>
                  <code className="text-dark-text font-mono">{model.training.weightDecay}</code>
                </div>
              </div>
            </div>
          </div>

          {/* Code Snippet */}
          <CodeSnippet
            code={model.codeSnippet}
            language="python"
            title={`modeling/${model.name.toLowerCase().replace(/\s+/g, '_')}.py`}
          />
        </motion.div>
      ))}
    </section>
  );
};

export default ModelArchitecture;
