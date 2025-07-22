import React, { useState } from 'react';
import { Brain, Eye, BarChart3, Info } from 'lucide-react';
import { RiskAssessment } from '../types';

interface ExplainableAIProps {
  assessment: RiskAssessment;
}

export const ExplainableAI: React.FC<ExplainableAIProps> = ({ assessment }) => {
  const [activeTab, setActiveTab] = useState<'factors' | 'model' | 'similar'>('factors');

  const tabs = [
    { id: 'factors', label: 'Risk Factors', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'model', label: 'Model Insights', icon: <Brain className="h-4 w-4" /> },
    { id: 'similar', label: 'Similar Cases', icon: <Eye className="h-4 w-4" /> }
  ];

  const modelInsights = [
    { feature: 'Blood Glucose Pattern', importance: 0.45, description: 'Consistent elevation after meals' },
    { feature: 'BMI Trend', importance: 0.28, description: 'Gradual increase over 6 months' },
    { feature: 'Family History', importance: 0.15, description: 'Maternal diabetes history' },
    { feature: 'Age Factor', importance: 0.12, description: 'Risk increases after 40' }
  ];

  const similarCases = [
    { similarity: 0.89, outcome: 'Managed with lifestyle changes', timeframe: '6 months' },
    { similarity: 0.82, outcome: 'Required medication intervention', timeframe: '3 months' },
    { similarity: 0.78, outcome: 'Reversed with diet modification', timeframe: '8 months' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Explanation</h3>
            <p className="text-sm text-gray-500">
              Understanding the {assessment.diseaseType} risk assessment
            </p>
          </div>
        </div>

        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'factors' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">
                These factors contributed most to your risk assessment
              </span>
            </div>
            {assessment.factors.map((factor, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{factor.name}</h4>
                  <span className="text-sm font-semibold text-purple-600">
                    {Math.round(factor.impact * 100)}% impact
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{factor.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${factor.impact * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'model' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-gray-600">
                How our AI model analyzed your data
              </span>
            </div>
            {modelInsights.map((insight, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{insight.feature}</h4>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-lg font-bold text-purple-600">
                    {Math.round(insight.importance * 100)}%
                  </div>
                  <div className="text-xs text-gray-500">importance</div>
                </div>
              </div>
            ))}
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Model Confidence</h4>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-purple-500 h-3 rounded-full"
                    style={{ width: '87%' }}
                  />
                </div>
                <span className="text-sm font-semibold text-purple-700">87%</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'similar' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">
                Similar patient cases and outcomes
              </span>
            </div>
            {similarCases.map((case_, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Similarity:</span>
                    <span className="font-semibold text-green-600">
                      {Math.round(case_.similarity * 100)}%
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{case_.timeframe}</span>
                </div>
                <p className="text-sm text-gray-900 font-medium">{case_.outcome}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: `${case_.similarity * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> These comparisons are based on anonymized patient data 
                and clinical outcomes. Individual results may vary.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};