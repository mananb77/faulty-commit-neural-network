import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGithub } from 'react-icons/fi';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Problem', href: '#problem' },
    { label: 'Data', href: '#data' },
    { label: 'Models', href: '#models' },
    { label: 'Training', href: '#training' },
    { label: 'Results', href: '#results' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-bg/80 backdrop-blur-lg border-b border-dark-bg-tertiary/50 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection('#hero')}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-dark-accent to-dark-accent-secondary flex items-center justify-center">
                <span className="text-dark-bg font-bold text-lg">FC</span>
              </div>
              <span className="text-dark-text font-bold text-lg hidden sm:block">
                Faulty Commit <span className="gradient-text">Classifier</span>
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 py-2 rounded-lg text-dark-text-secondary hover:text-dark-accent hover:bg-dark-bg-tertiary/50 transition-all duration-200 font-medium text-sm"
                >
                  {item.label}
                </motion.a>
              ))}

              {/* GitHub Link */}
              <motion.a
                href="https://github.com/mananb77/faulty-commit-neural-network"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 p-2 rounded-lg text-dark-text hover:text-dark-accent hover:bg-dark-bg-tertiary/50 transition-all duration-200"
              >
                <FiGithub className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-dark-text hover:text-dark-accent hover:bg-dark-bg-tertiary/50 transition-colors"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 sm:top-20 left-0 right-0 z-40 md:hidden bg-dark-bg-secondary/95 backdrop-blur-lg border-b border-dark-bg-tertiary/50"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block px-4 py-3 rounded-lg text-dark-text-secondary hover:text-dark-accent hover:bg-dark-bg-tertiary/50 transition-all duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}

              <a
                href="https://github.com/mananb77/faulty-commit-neural-network"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-dark-text hover:text-dark-accent hover:bg-dark-bg-tertiary/50 transition-all duration-200 font-medium"
              >
                <FiGithub className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
