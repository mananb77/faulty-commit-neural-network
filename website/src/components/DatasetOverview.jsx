import { motion } from 'framer-motion';
import { FiDatabase, FiPieChart, FiGrid } from 'react-icons/fi';
import { datasetStats } from '../data/evaluationResults';
import CodeSnippet from './CodeSnippet';

const DatasetOverview = () => {
  const splitData = [
    { name: 'Training', value: datasetStats.train, percentage: ((datasetStats.train / datasetStats.total) * 100).toFixed(1), color: 'from-blue-500 to-blue-600' },
    { name: 'Validation', value: datasetStats.validation, percentage: ((datasetStats.validation / datasetStats.total) * 100).toFixed(1), color: 'from-purple-500 to-purple-600' },
    { name: 'Test', value: datasetStats.test, percentage: ((datasetStats.test / datasetStats.total) * 100).toFixed(1), color: 'from-pink-500 to-pink-600' },
  ];

  const sampleData = `# Sample commit features
{
  "modifications_count": 3,
  "additions_count": 45,
  "deletions_count": 12,
  "hour": 14,              # Commit hour (0-23)
  "day": 3,                # Day of week (0-6)
  "repo_id": 42,
  "author_name": "john_doe",
  "author_email": "john@example.com",
  "committer_name": "john_doe",
  "committer_email": "john@example.com",
  "ext": "py",             # File extension
  "faulty": 0              # Label: 0=normal, 1=faulty
}`;

  return (
    <section id="data" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-12 text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          <span className="gradient-text">Dataset</span> <span className="text-dark-text">Overview</span>
        </h2>
        <p className="text-lg text-dark-text-secondary leading-relaxed">
          Our dataset comprises <span className="text-dark-accent font-semibold">{datasetStats.total.toLocaleString()}</span> commits
          from real-world Git repositories, with comprehensive metadata for each commit.
        </p>
      </motion.div>

      {/* Dataset Split */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="glass-card p-8 mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <FiPieChart className="w-6 h-6 text-dark-accent" />
          <h3 className="text-2xl font-bold text-dark-text">Train/Val/Test Split</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {splitData.map((split, index) => (
            <motion.div
              key={split.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`h-24 rounded-lg bg-gradient-to-br ${split.color} flex items-center justify-center mb-3 relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-white mb-1">
                    {split.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-white/80">{split.percentage}%</div>
                </div>
              </div>
              <div className="text-lg font-semibold text-dark-text">{split.name}</div>
            </motion.div>
          ))}
        </div>

        <div className="text-sm text-dark-text-secondary text-center">
          Standard 36/24/40 split ensuring no data leakage between sets
        </div>
      </motion.div>

      {/* Features Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <FiGrid className="w-5 h-5 text-dark-accent" />
            <h3 className="text-xl font-bold text-dark-text">Numerical Features (6)</h3>
          </div>
          <ul className="space-y-3">
            {datasetStats.features.numerical.map((feature) => (
              <li key={feature} className="flex items-center gap-3 group">
                <div className="w-2 h-2 bg-dark-accent rounded-full group-hover:scale-150 transition-transform" />
                <code className="text-sm text-dark-text-secondary font-mono group-hover:text-dark-text transition-colors">
                  {feature}
                </code>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <FiGrid className="w-5 h-5 text-dark-accent-secondary" />
            <h3 className="text-xl font-bold text-dark-text">Categorical Features (5)</h3>
          </div>
          <ul className="space-y-3">
            {datasetStats.features.categorical.map((feature) => (
              <li key={feature} className="flex items-center gap-3 group">
                <div className="w-2 h-2 bg-dark-accent-secondary rounded-full group-hover:scale-150 transition-transform" />
                <code className="text-sm text-dark-text-secondary font-mono group-hover:text-dark-text transition-colors">
                  {feature}
                </code>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Feature Dimensions After Preprocessing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass-card p-8 mb-12 text-center"
      >
        <div className="inline-flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-dark-accent/10">
            <FiDatabase className="w-8 h-8 text-dark-accent" />
          </div>
          <div className="text-left">
            <div className="text-sm text-dark-text-secondary mb-1">After One-Hot Encoding</div>
            <div className="text-4xl font-bold gradient-text">
              {datasetStats.features.total} dimensions
            </div>
          </div>
        </div>
        <p className="text-sm text-dark-text-secondary max-w-2xl mx-auto">
          Categorical features are one-hot encoded, expanding the feature space from 11 raw features
          to 1,098 dimensions for neural network input.
        </p>
      </motion.div>

      {/* Sample Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-dark-text mb-4">Sample Commit Data</h3>
        <CodeSnippet
          code={sampleData}
          language="python"
          title="example_commit.json"
        />
      </motion.div>
    </section>
  );
};

export default DatasetOverview;
