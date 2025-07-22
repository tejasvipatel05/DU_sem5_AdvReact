import React from 'react';
import { Calendar, Activity, FileText, TrendingUp } from 'lucide-react';
import { Patient, WearableData, RiskAssessment } from '../types';
import { RiskCard } from './RiskCard';
import { VitalChart } from './VitalChart';

interface PatientDashboardProps {
  patient: Patient;
  wearableData: WearableData[];
  riskAssessments: RiskAssessment[];
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  patient,
  wearableData,
  riskAssessments
}) => {
  const latestData = wearableData[wearableData.length - 1];

  const quickStats = [
    {
      title: 'Heart Rate',
      value: `${latestData?.heartRate || 0} bpm`,
      icon: <Activity className="h-6 w-6 text-red-500" />,
      trend: '+2%'
    },
    {
      title: 'Blood Pressure',
      value: `${latestData?.bloodPressure?.systolic || 0}/${latestData?.bloodPressure?.diastolic || 0}`,
      icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
      trend: '-1%'
    },
    {
      title: 'Daily Steps',
      value: `${latestData?.steps?.toLocaleString() || 0}`,
      icon: <Activity className="h-6 w-6 text-green-500" />,
      trend: '+12%'
    },
    {
      title: 'Sleep Hours',
      value: `${latestData?.sleepHours || 0}h`,
      icon: <Calendar className="h-6 w-6 text-purple-500" />,
      trend: '+0.5h'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {patient.name}</h2>
        <p className="text-blue-100">
          Here's your latest health overview and risk assessments
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.trend} from last week</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Assessments */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Risk Assessments</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {riskAssessments.map((assessment, index) => (
            <RiskCard key={index} assessment={assessment} />
          ))}
        </div>
      </div>

      {/* Vital Charts */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Vital Trends</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VitalChart
            data={wearableData}
            metric="heartRate"
            title="Heart Rate"
            unit="bpm"
            color="text-red-500"
            normalRange={{ min: 60, max: 100 }}
          />
          <VitalChart
            data={wearableData}
            metric="bloodPressure"
            title="Blood Pressure (Systolic)"
            unit="mmHg"
            color="text-blue-500"
            normalRange={{ min: 90, max: 120 }}
          />
          <VitalChart
            data={wearableData}
            metric="oxygenSaturation"
            title="Oxygen Saturation"
            unit="%"
            color="text-green-500"
            normalRange={{ min: 95, max: 100 }}
          />
          <VitalChart
            data={wearableData}
            metric="steps"
            title="Daily Steps"
            unit="steps"
            color="text-purple-500"
          />
        </div>
      </div>

      {/* Patient Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Personal Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Age:</span>
                <span className="text-gray-900">{patient.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="text-gray-900 capitalize">{patient.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{patient.email}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Medical History</h4>
            <div className="space-y-1">
              {patient.medicalHistory.map((condition, index) => (
                <span 
                  key={index}
                  className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2 mb-1"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};