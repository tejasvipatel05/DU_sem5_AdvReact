import React, { useState } from 'react';
import { Users, AlertTriangle, TrendingUp, Calendar, Search, Filter } from 'lucide-react';
import { Patient, Alert, RiskAssessment } from '../types';
import { AlertPanel } from './AlertPanel';

interface DoctorDashboardProps {
  patients: Patient[];
  alerts: Alert[];
  riskAssessments: RiskAssessment[];
  onAcknowledgeAlert: (alertId: string) => void;
  onDismissAlert: (alertId: string) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  patients,
  alerts,
  riskAssessments,
  onAcknowledgeAlert,
  onDismissAlert
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical' && !alert.acknowledged);
  const highRiskPatients = riskAssessments.filter(assessment => assessment.riskLevel === 'high' || assessment.riskLevel === 'critical');

  const filteredAssessments = riskAssessments.filter(assessment => {
    const matchesSearch = assessment.diseaseType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRisk === 'all' || assessment.riskLevel === filterRisk;
    return matchesSearch && matchesFilter;
  });

  const dashboardStats = [
    {
      title: 'Total Patients',
      value: patients.length,
      icon: <Users className="h-6 w-6 text-blue-500" />,
      change: '+2 this week'
    },
    {
      title: 'Critical Alerts',
      value: criticalAlerts.length,
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      change: criticalAlerts.length > 0 ? 'Requires attention' : 'All clear'
    },
    {
      title: 'High Risk Cases',
      value: highRiskPatients.length,
      icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
      change: 'Monitor closely'
    },
    {
      title: 'Scheduled Today',
      value: 8,
      icon: <Calendar className="h-6 w-6 text-green-500" />,
      change: '3 follow-ups'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Clinical Dashboard</h2>
        <p className="text-indigo-100">
          Monitor patient health status and AI-powered risk assessments
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts Panel */}
      <AlertPanel 
        alerts={alerts}
        onAcknowledge={onAcknowledgeAlert}
        onDismiss={onDismissAlert}
      />

      {/* Risk Assessments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Patient Risk Assessments</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search diseases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                  <option value="critical">Critical Risk</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disease Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssessments.map((assessment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {assessment.diseaseType}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {Math.round(assessment.riskScore * 100)}%
                      </div>
                      <div className="ml-3 w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            assessment.riskLevel === 'low' ? 'bg-green-500' :
                            assessment.riskLevel === 'medium' ? 'bg-yellow-500' :
                            assessment.riskLevel === 'high' ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${assessment.riskScore * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      assessment.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      assessment.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      assessment.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {assessment.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(assessment.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View Details
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Contact Patient
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Schedule Patient Consultation
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Review Pending Results
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Generate Health Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">9:00 AM</span>
              <span className="text-gray-900">Sarah Johnson - Follow-up</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">11:30 AM</span>
              <span className="text-gray-900">John Smith - Consultation</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">2:00 PM</span>
              <span className="text-gray-900">Team Meeting</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">System Status</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">AI Model Status</span>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Data Processing</span>
              <span className="text-sm text-green-600 font-medium">Normal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Backup</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};