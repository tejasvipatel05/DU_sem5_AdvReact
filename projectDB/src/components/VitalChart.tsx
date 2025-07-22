import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { WearableData } from '../types';

interface VitalChartProps {
  data: WearableData[];
  metric: keyof WearableData;
  title: string;
  unit: string;
  color: string;
  normalRange?: { min: number; max: number };
}

export const VitalChart: React.FC<VitalChartProps> = ({ 
  data, 
  metric, 
  title, 
  unit, 
  color,
  normalRange 
}) => {
  const getMetricValue = (item: WearableData): number => {
    const value = item[metric];
    if (typeof value === 'object' && value !== null && 'systolic' in value) {
      return (value as any).systolic;
    }
    return value as number;
  };

  const values = data.map(getMetricValue);
  const latestValue = values[values.length - 1];
  const previousValue = values[values.length - 2];
  
  const trend = latestValue > previousValue ? 'up' : 
                latestValue < previousValue ? 'down' : 'stable';
  
  const isOutOfRange = normalRange && 
    (latestValue < normalRange.min || latestValue > normalRange.max);

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1;

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-2xl font-bold ${color}`}>
              {latestValue}
            </span>
            <span className="text-sm text-gray-500">{unit}</span>
            {getTrendIcon()}
          </div>
        </div>
        {isOutOfRange && (
          <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            Out of range
          </div>
        )}
      </div>

      {normalRange && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            Normal range: {normalRange.min} - {normalRange.max} {unit}
          </div>
        </div>
      )}

      <div className="h-32 relative">
        <svg className="w-full h-full" viewBox="0 0 300 120">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line 
              key={i}
              x1={0} 
              y1={i * 30} 
              x2={300} 
              y2={i * 30}
              stroke="#f3f4f6"
              strokeWidth={1}
            />
          ))}
          
          {/* Chart line */}
          <polyline
            fill="none"
            stroke={color.replace('text-', '#')}
            strokeWidth={2}
            points={values.map((value, index) => {
              const x = (index / (values.length - 1)) * 300;
              const y = 120 - ((value - minValue) / range) * 100;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Data points */}
          {values.map((value, index) => {
            const x = (index / (values.length - 1)) * 300;
            const y = 120 - ((value - minValue) / range) * 100;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={3}
                fill={color.replace('text-', '#')}
                className="hover:r-5 transition-all cursor-pointer"
              />
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>{new Date(data[0]?.timestamp).toLocaleDateString()}</span>
        <span>{new Date(data[data.length - 1]?.timestamp).toLocaleDateString()}</span>
      </div>
    </div>
  );
};