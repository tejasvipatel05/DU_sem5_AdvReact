import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { RiskAssessment } from '../types';

interface RiskCardProps {
  assessment: RiskAssessment;
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'low': return 'text-green-600 bg-green-50 border-green-200';
    case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'critical': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const getRiskIcon = (level: string) => {
  switch (level) {
    case 'low': return <CheckCircle className="h-5 w-5" />;
    case 'medium': return <Info className="h-5 w-5" />;
    case 'high': return <AlertTriangle className="h-5 w-5" />;
    case 'critical': return <XCircle className="h-5 w-5" />;
    default: return <Info className="h-5 w-5" />;
  }
};

export const RiskCard: React.FC<RiskCardProps> = ({ assessment }) => {
  const riskPercentage = Math.round(assessment.riskScore * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {assessment.diseaseType}
          </h3>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(assessment.lastUpdated).toLocaleDateString()}
          </p>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getRiskColor(assessment.riskLevel)}`}>
          {getRiskIcon(assessment.riskLevel)}
          <span className="text-sm font-medium capitalize">{assessment.riskLevel} Risk</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Risk Score</span>
          <span className="text-lg font-bold text-gray-900">{riskPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              assessment.riskLevel === 'low' ? 'bg-green-500' :
              assessment.riskLevel === 'medium' ? 'bg-yellow-500' :
              assessment.riskLevel === 'high' ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${riskPercentage}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Risk Factors</h4>
        <div className="space-y-2">
          {assessment.factors.slice(0, 3).map((factor, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{factor.name}</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${factor.impact * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-8">
                  {Math.round(factor.impact * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Recommendations</h4>
        <ul className="space-y-1">
          {assessment.recommendations.slice(0, 2).map((rec, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
              {rec}
            </li>
          ))}
        </ul>
        {assessment.recommendations.length > 2 && (
          <button className="text-sm text-blue-600 hover:text-blue-800 mt-2 font-medium">
            View all recommendations
          </button>
        )}
      </div>
    </div>
  );
};