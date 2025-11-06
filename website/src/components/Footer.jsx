import { FiGithub, FiLinkedin, FiMail, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FiGithub,
      href: 'https://github.com/mananb77/faulty-commit-neural-network',
      label: 'GitHub Repository'
    },
  ];

  const quickLinks = [
    { label: 'Problem', href: '#problem' },
    { label: 'Dataset', href: '#data' },
    { label: 'Models', href: '#models' },
    { label: 'Training', href: '#training' },
    { label: 'Results', href: '#results' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-bg-secondary border-t border-dark-bg-tertiary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-dark-accent to-dark-accent-secondary flex items-center justify-center">
                <span className="text-dark-bg font-bold text-lg">FC</span>
              </div>
              <span className="text-dark-text font-bold text-lg">
                Faulty Commit Classifier
              </span>
            </div>
            <p className="text-dark-text-secondary text-sm leading-relaxed">
              A deep learning project for predicting faulty software commits using neural networks.
              Built with PyTorch and evaluated on real-world Git repository data.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-dark-text font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-dark-text-secondary hover:text-dark-accent transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-dark-text font-semibold mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {['PyTorch', 'Python', 'scikit-learn', 'NumPy', 'Pandas', 'React', 'Tailwind'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-dark-bg-tertiary/50 rounded-full text-dark-text-secondary text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-bg-tertiary/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-text-secondary text-sm">
            © {currentYear} Manan Bhargava. Built for a deep neural networks course at UC Berkeley.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-dark-bg-tertiary/50 text-dark-text-secondary hover:text-dark-accent hover:bg-dark-accent/10 transition-all duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-6 pt-6 border-t border-dark-bg-tertiary/50 text-center">
          <p className="text-dark-text-secondary text-xs">
            This project demonstrates machine learning fundamentals including data preprocessing,
            model training, evaluation, and deployment. All code is available on{' '}
            <a
              href="https://github.com/mananb77/faulty-commit-neural-network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-accent hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
