"use client";

import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles: string[];
  fallback?: ReactNode;
}

const ProtectedRoute = ({ children, requiredRoles, fallback }: ProtectedRouteProps) => {
  const { user, hasRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !hasRole(requiredRoles)) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page. Required roles: {requiredRoles.join(', ')}
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Your role: {user?.role || 'Not authenticated'}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;