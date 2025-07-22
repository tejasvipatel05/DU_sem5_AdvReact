import React from 'react';
import { AlertTriangle, Info, X, Check } from 'lucide-react';
import { Alert } from '../types';

interface AlertPanelProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'info': return <Info className="h-5 w-5 text-blue-500" />;
    default: return <Info className="h-5 w-5 text-gray-500" />;
  }
};

const getAlertStyle = (type: string) => {
  switch (type) {
    case 'critical': return 'border-l-red-500 bg-red-50';
    case 'warning': return 'border-l-yellow-500 bg-yellow-50';
    case 'info': return 'border-l-blue-500 bg-blue-50';
    default: return 'border-l-gray-500 bg-gray-50';
  }
};

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, onAcknowledge, onDismiss }) => {
  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  
  if (unacknowledgedAlerts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">All Clear</h3>
          <p className="text-gray-500">No active alerts at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Active Alerts ({unacknowledgedAlerts.length})
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {unacknowledgedAlerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`border-l-4 pl-4 pr-4 py-3 rounded-r-lg ${getAlertStyle(alert.type)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onAcknowledge(alert.id)}
                  className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                  title="Acknowledge"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDismiss(alert.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};