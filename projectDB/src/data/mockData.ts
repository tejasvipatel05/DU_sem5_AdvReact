import { Patient, WearableData, MedicalImage, RiskAssessment, Alert } from '../types';

export const mockPatient: Patient = {
  id: '1',
  name: 'Sarah Johnson',
  age: 45,
  gender: 'female',
  email: 'sarah.johnson@email.com',
  phone: '+1-555-0123',
  emergencyContact: 'Michael Johnson (+1-555-0124)',
  medicalHistory: ['Hypertension', 'Family history of diabetes'],
  allergies: ['Penicillin', 'Shellfish'],
  currentMedications: ['Lisinopril 10mg', 'Metformin 500mg']
};

export const mockWearableData: WearableData[] = [
  {
    timestamp: '2024-01-15T08:00:00Z',
    heartRate: 78,
    bloodPressure: { systolic: 140, diastolic: 90 },
    oxygenSaturation: 98,
    steps: 8500,
    sleepHours: 7.5,
    bloodGlucose: 125
  },
  {
    timestamp: '2024-01-15T12:00:00Z',
    heartRate: 85,
    bloodPressure: { systolic: 145, diastolic: 92 },
    oxygenSaturation: 97,
    steps: 12000,
    sleepHours: 7.5,
    bloodGlucose: 180
  },
  {
    timestamp: '2024-01-15T18:00:00Z',
    heartRate: 72,
    bloodPressure: { systolic: 138, diastolic: 88 },
    oxygenSaturation: 98,
    steps: 15500,
    sleepHours: 7.5,
    bloodGlucose: 110
  }
];

export const mockMedicalImages: MedicalImage[] = [
  {
    id: '1',
    type: 'xray',
    url: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadDate: '2024-01-15T10:30:00Z',
    analysis: {
      confidence: 0.87,
      findings: ['Slight opacity in left lower lobe', 'No acute abnormalities'],
      riskLevel: 'medium',
      recommendations: ['Follow-up CT scan in 3 months', 'Monitor symptoms']
    }
  },
  {
    id: '2',
    type: 'ecg',
    url: 'https://images.pexels.com/photos/6823568/pexels-photo-6823568.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadDate: '2024-01-14T14:15:00Z',
    analysis: {
      confidence: 0.92,
      findings: ['Normal sinus rhythm', 'Slight T-wave abnormality in lead V4'],
      riskLevel: 'low',
      recommendations: ['Continue current medications', 'Regular monitoring']
    }
  }
];

export const mockRiskAssessments: RiskAssessment[] = [
  {
    diseaseType: 'Type 2 Diabetes',
    riskScore: 0.78,
    riskLevel: 'high',
    factors: [
      { name: 'Blood Glucose Levels', impact: 0.4, description: 'Elevated post-meal glucose readings' },
      { name: 'Family History', impact: 0.2, description: 'Parent with Type 2 diabetes' },
      { name: 'BMI', impact: 0.18, description: 'Slightly elevated BMI of 28.5' }
    ],
    recommendations: [
      'Consult endocrinologist within 2 weeks',
      'Implement dietary modifications',
      'Increase physical activity to 150 min/week',
      'Monitor blood glucose daily'
    ],
    lastUpdated: '2024-01-15T15:30:00Z'
  },
  {
    diseaseType: 'Cardiovascular Disease',
    riskScore: 0.65,
    riskLevel: 'medium',
    factors: [
      { name: 'Blood Pressure', impact: 0.35, description: 'Consistently elevated readings' },
      { name: 'Age', impact: 0.15, description: '45 years old' },
      { name: 'Gender', impact: 0.15, description: 'Female, post-menopausal risk' }
    ],
    recommendations: [
      'Continue blood pressure monitoring',
      'Consider medication adjustment',
      'Implement DASH diet',
      'Regular cardiology follow-up'
    ],
    lastUpdated: '2024-01-15T15:30:00Z'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    message: 'Blood glucose reading of 280 mg/dL detected. Immediate medical attention required.',
    timestamp: '2024-01-15T09:15:00Z',
    patientId: '1',
    acknowledged: false
  },
  {
    id: '2',
    type: 'warning',
    message: 'Blood pressure consistently above 140/90. Consider medication review.',
    timestamp: '2024-01-15T07:30:00Z',
    patientId: '1',
    acknowledged: true
  },
  {
    id: '3',
    type: 'info',
    message: 'New chest X-ray analysis completed. Review recommended.',
    timestamp: '2024-01-15T10:45:00Z',
    patientId: '1',
    acknowledged: false
  }
];