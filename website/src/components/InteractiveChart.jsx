import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label, labelFormatter, valueFormatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 border border-dark-accent/30">
        <p className="text-dark-text font-semibold mb-2">
          {labelFormatter ? labelFormatter(label) : label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {valueFormatter ? valueFormatter(entry.value) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const InteractiveChart = ({
  data,
  type = 'line',
  lines = [],
  xKey,
  xLabel,
  yLabel,
  title,
  height = 400,
  showLegend = true,
  labelFormatter,
  valueFormatter,
}) => {
  const ChartComponent = type === 'area' ? AreaChart : LineChart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-card p-6"
    >
      {title && (
        <h3 className="text-xl font-bold text-dark-text mb-6">{title}</h3>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#16213e" opacity={0.3} />
          <XAxis
            dataKey={xKey}
            stroke="#a0a0a0"
            style={{ fontSize: '12px' }}
            label={xLabel ? { value: xLabel, position: 'insideBottom', offset: -5, fill: '#a0a0a0' } : undefined}
          />
          <YAxis
            stroke="#a0a0a0"
            style={{ fontSize: '12px' }}
            label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', fill: '#a0a0a0' } : undefined}
          />
          <Tooltip
            content={<CustomTooltip labelFormatter={labelFormatter} valueFormatter={valueFormatter} />}
            cursor={{ stroke: '#00d9ff', strokeWidth: 1, strokeDasharray: '5 5' }}
          />
          {showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}

          {lines.map((line, index) => {
            if (type === 'area') {
              return (
                <Area
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  stroke={line.color}
                  fill={line.color}
                  fillOpacity={0.3}
                  strokeWidth={2}
                  name={line.name}
                  dot={{ fill: line.color, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              );
            }
            return (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                strokeWidth={2}
                name={line.name}
                dot={{ fill: line.color, r: 4 }}
                activeDot={{ r: 6 }}
              />
            );
          })}
        </ChartComponent>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default InteractiveChart;
