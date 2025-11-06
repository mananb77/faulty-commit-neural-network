import { motion } from 'framer-motion';
import { FiCode, FiAlertTriangle, FiTarget } from 'react-icons/fi';
import { datasetStats } from '../data/evaluationResults';

const ProblemStatement = () => {
  const challenges = [
    {
      icon: FiAlertTriangle,
      title: 'Extreme Class Imbalance',
      description: `Only ${datasetStats.positiveClassPercentage}% of commits are faulty, making it a highly imbalanced classification problem.`,
      impact: 'Traditional accuracy metrics are misleading; models can achieve 98%+ accuracy by always predicting "not faulty".',
    },
    {
      icon: FiCode,
      title: 'Complex Feature Space',
      description: 'Commits contain both numerical (additions, deletions) and categorical (author, file type) features.',
      impact: 'Requires sophisticated preprocessing and feature engineering to capture patterns.',
    },
    {
      icon: FiTarget,
      title: 'Real-World Impact',
      description: 'Early detection of faulty commits can save teams significant debugging time and prevent production issues.',
      impact: 'Need high precision to avoid false alarms while maintaining recall to catch real bugs.',
    },
  ];

  return (
    <section id="problem" className="section-container bg-dark-bg-secondary/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-12 text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          <span className="gradient-text">The Challenge</span>
        </h2>
        <p className="text-lg text-dark-text-secondary leading-relaxed">
          Predicting whether a software commit introduces bugs is a critical problem in software engineering.
          Identifying faulty commits early can help developers prevent bugs from reaching production and
          save significant debugging time.
        </p>
      </motion.div>

      {/* Problem Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="glass-card p-8 mb-12 max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">
              {datasetStats.positiveClassPercentage}%
            </div>
            <div className="text-sm text-dark-text-secondary">Faulty Commits</div>
          </div>

          <div className="h-24 w-px bg-dark-bg-tertiary" />

          <div className="text-center">
            <div className="text-4xl font-bold text-dark-text mb-2">
              {datasetStats.negativeClassPercentage}%
            </div>
            <div className="text-sm text-dark-text-secondary">Normal Commits</div>
          </div>
        </div>

        <div className="h-4 bg-dark-bg-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-red-600"
            style={{ width: `${datasetStats.positiveClassPercentage}%` }}
          />
        </div>
        <p className="text-center text-xs text-dark-text-secondary mt-3">
          Highly imbalanced dataset - only 1 in every 73 commits is faulty
        </p>
      </motion.div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-card p-6 hover:border-dark-accent/30 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-dark-bg-tertiary/50 group-hover:bg-dark-accent/10 transition-colors flex-shrink-0">
                <challenge.icon className="w-6 h-6 text-dark-accent" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-dark-text mb-3 group-hover:text-dark-accent transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-sm text-dark-text-secondary mb-3 leading-relaxed">
                  {challenge.description}
                </p>
                <div className="pt-3 border-t border-dark-bg-tertiary/50">
                  <p className="text-xs text-dark-text-secondary italic">
                    <span className="font-semibold text-dark-accent">Impact: </span>
                    {challenge.impact}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Approach Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-12 text-center max-w-3xl mx-auto glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-4 text-dark-text">
          Our Approach
        </h3>
        <p className="text-dark-text-secondary leading-relaxed">
          We address these challenges using deep neural networks trained on Git commit metadata.
          By leveraging both commit-level features (additions, deletions, file types) and developer-level
          information (author, committer), our models learn to identify patterns associated with faulty commits.
          We use precision-recall curves instead of accuracy, ensuring our evaluation properly accounts
          for the class imbalance.
        </p>
      </motion.div>
    </section>
  );
};

export default ProblemStatement;
