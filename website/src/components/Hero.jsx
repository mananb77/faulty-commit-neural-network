import { motion } from 'framer-motion';
import { FiArrowDown, FiDatabase, FiLayers, FiTrendingUp } from 'react-icons/fi';
import MetricsCard from './MetricsCard';
import { datasetStats } from '../data/evaluationResults';

const Hero = () => {
  const scrollToNext = () => {
    const element = document.querySelector('#problem');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const keyMetrics = [
    {
      title: 'Total Commits',
      value: datasetStats.total,
      unit: '',
      icon: FiDatabase,
    },
    {
      title: 'Feature Dimensions',
      value: datasetStats.features.total,
      unit: '',
      icon: FiLayers,
    },
    {
      title: 'Best Model AP',
      value: 0.0276,
      unit: '',
      icon: FiTrendingUp,
    },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-dark-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-dark-accent-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 section-container text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-dark-bg-tertiary/50 rounded-full mb-8 backdrop-blur-sm border border-dark-accent/20"
        >
          <span className="w-2 h-2 bg-dark-accent rounded-full animate-pulse" />
          <span className="text-sm text-dark-text-secondary font-medium">
            Deep Neural Networks Project • UC Berkeley
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-dark-text">Faulty Commit Classification</span>
          <br />
          <span className="gradient-text">with Neural Networks</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-dark-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Predicting buggy software commits using deep learning. An end-to-end machine learning
          pipeline featuring data preprocessing, neural network architectures, and comprehensive evaluation
          on 120K+ real-world Git commits.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={scrollToNext}
            className="btn-primary"
          >
            Explore the Project
          </button>
          <a
            href="https://github.com/mananb77/faulty-commit-neural-network"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-dark-bg-tertiary/50 text-dark-text font-semibold rounded-lg transition-all duration-300 hover:bg-dark-bg-tertiary border border-dark-bg-tertiary hover:border-dark-accent/50"
          >
            View on GitHub
          </a>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {keyMetrics.map((metric, index) => (
            <MetricsCard
              key={metric.title}
              {...metric}
              delay={0.5 + index * 0.1}
            />
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToNext}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-dark-accent hover:text-dark-accent-secondary transition-colors"
            aria-label="Scroll to next section"
          >
            <FiArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
