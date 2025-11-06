import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MetricsCard = ({ title, value, unit, icon: Icon, delay = 0, animate = true }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!animate) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const end = typeof value === 'number' ? value : parseFloat(value);
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, animate]);

  const formatValue = (val) => {
    if (typeof value === 'string') return value;
    if (val >= 10000) return Math.round(val).toLocaleString();
    if (val >= 1) return val.toFixed(val >= 100 ? 0 : 2);
    return val.toFixed(4);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="glass-card p-6 relative group overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-accent/5 to-dark-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="p-3 rounded-lg bg-dark-bg-tertiary/50 group-hover:bg-dark-accent/10 transition-colors duration-300">
            {Icon && <Icon className="w-6 h-6 text-dark-accent" />}
          </div>
        </div>

        <h3 className="text-sm font-medium text-dark-text-secondary mb-2">
          {title}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold gradient-text">
            {formatValue(displayValue)}
          </span>
          {unit && (
            <span className="text-sm text-dark-text-secondary font-medium">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-dark-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default MetricsCard;
