import { motion } from 'framer-motion';
import { useState } from 'react';

const ArchitectureDiagram = ({ layers }) => {
  const [hoveredLayer, setHoveredLayer] = useState(null);

  // Calculate SVG dimensions
  const layerHeight = 80;
  const layerWidth = 300;
  const verticalSpacing = 60;
  const totalHeight = layers.length * layerHeight + (layers.length - 1) * verticalSpacing + 100;
  const width = 400;

  const getLayerY = (index) => {
    return 50 + index * (layerHeight + verticalSpacing);
  };

  const getLayerColor = (type) => {
    if (type.includes('Linear')) {
      return {
        fill: 'url(#linearGradient)',
        stroke: '#00d9ff',
        strokeWidth: 2,
      };
    } else if (type.includes('Dropout')) {
      return {
        fill: 'rgba(251, 191, 36, 0.05)',
        stroke: '#fbbf24',
        strokeWidth: 2,
        strokeDasharray: '5,5',
      };
    }
    return {
      fill: 'rgba(15, 98, 254, 0.1)',
      stroke: '#0f62fe',
      strokeWidth: 2,
    };
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${totalHeight}`}
        className="w-full max-w-2xl mx-auto"
        style={{ minHeight: '400px' }}
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#00d9ff', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: '#0f62fe', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>

        {/* Connection Lines */}
        {layers.map((layer, index) => {
          if (index < layers.length - 1) {
            const y1 = getLayerY(index) + layerHeight;
            const y2 = getLayerY(index + 1);
            const x = width / 2;

            return (
              <motion.line
                key={`line-${index}`}
                x1={x}
                y1={y1}
                x2={x}
                y2={y2}
                stroke="#4a5568"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            );
          }
          return null;
        })}

        {/* Layers */}
        {layers.map((layer, index) => {
          const y = getLayerY(index);
          const x = (width - layerWidth) / 2;
          const style = getLayerColor(layer.type);
          const isHovered = hoveredLayer === index;

          return (
            <g key={index}>
              {/* Layer Rectangle */}
              <motion.rect
                x={x}
                y={y}
                width={layerWidth}
                height={layerHeight}
                rx="8"
                {...style}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredLayer(index)}
                onMouseLeave={() => setHoveredLayer(null)}
                style={{ cursor: 'pointer' }}
              />

              {/* Layer Number Badge */}
              <motion.circle
                cx={x - 15}
                cy={y + layerHeight / 2}
                r="18"
                fill="#00d9ff"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              />
              <text
                x={x - 15}
                y={y + layerHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#0a0a0f"
                fontSize="12"
                fontWeight="bold"
              >
                {index + 1}
              </text>

              {/* Layer Name */}
              <text
                x={width / 2}
                y={y + 25}
                textAnchor="middle"
                fill="#e0e0e0"
                fontSize="14"
                fontWeight="600"
              >
                {layer.name}
              </text>

              {/* Layer Type */}
              <text
                x={width / 2}
                y={y + 43}
                textAnchor="middle"
                fill="#a0a0a0"
                fontSize="11"
                fontFamily="monospace"
              >
                {layer.type}
              </text>

              {/* Dimensions or Details */}
              <text
                x={width / 2}
                y={y + 60}
                textAnchor="middle"
                fill={layer.type.includes('Dropout') ? '#fbbf24' : '#00d9ff'}
                fontSize="12"
                fontWeight="500"
              >
                {layer.inputDim && layer.outputDim
                  ? `${layer.inputDim} → ${layer.outputDim}`
                  : ''}
                {layer.activation && (
                  <tspan fill="#10b981" dx="5">
                    {layer.activation}
                  </tspan>
                )}
                {layer.dropoutRate && `p=${layer.dropoutRate}`}
              </text>

              {/* Hover Info */}
              {isHovered && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect
                    x={x + layerWidth + 10}
                    y={y + 10}
                    width="120"
                    height="60"
                    rx="6"
                    fill="#1a1a2e"
                    stroke="#00d9ff"
                    strokeWidth="1"
                  />
                  <text
                    x={x + layerWidth + 20}
                    y={y + 30}
                    fill="#e0e0e0"
                    fontSize="10"
                  >
                    {layer.type}
                  </text>
                  {layer.inputDim && (
                    <text
                      x={x + layerWidth + 20}
                      y={y + 45}
                      fill="#a0a0a0"
                      fontSize="9"
                    >
                      Input: {layer.inputDim}
                    </text>
                  )}
                  {layer.outputDim && (
                    <text
                      x={x + layerWidth + 20}
                      y={y + 58}
                      fill="#a0a0a0"
                      fontSize="9"
                    >
                      Output: {layer.outputDim}
                    </text>
                  )}
                </motion.g>
              )}
            </g>
          );
        })}

        {/* Output Label */}
        <text
          x={width / 2}
          y={totalHeight - 30}
          textAnchor="middle"
          fill="#10b981"
          fontSize="13"
          fontWeight="600"
        >
          Output: Sigmoid (during inference)
        </text>
      </svg>
    </div>
  );
};

export default ArchitectureDiagram;
