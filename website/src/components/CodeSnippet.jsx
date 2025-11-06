import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

const CodeSnippet = ({ code, language = 'python', title, showLineNumbers = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="glass-card overflow-hidden"
    >
      {title && (
        <div className="px-6 py-3 bg-dark-bg-tertiary border-b border-dark-bg-tertiary/50 flex justify-between items-center">
          <span className="text-dark-text font-mono text-sm">{title}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-bg/50 hover:bg-dark-accent/20 transition-all duration-200 text-dark-text-secondary hover:text-dark-accent"
          >
            {copied ? (
              <>
                <FiCheck className="w-4 h-4" />
                <span className="text-xs">Copied!</span>
              </>
            ) : (
              <>
                <FiCopy className="w-4 h-4" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <div className="relative">
        {!title && (
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-bg/80 hover:bg-dark-accent/20 transition-all duration-200 text-dark-text-secondary hover:text-dark-accent backdrop-blur-sm"
          >
            {copied ? (
              <>
                <FiCheck className="w-4 h-4" />
                <span className="text-xs">Copied!</span>
              </>
            ) : (
              <>
                <FiCopy className="w-4 h-4" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </button>
        )}
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1em',
            color: '#4a5568',
            userSelect: 'none',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );
};

export default CodeSnippet;
