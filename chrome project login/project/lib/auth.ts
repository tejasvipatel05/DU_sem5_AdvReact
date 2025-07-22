export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'librarian' | 'student';
  branch: string;
  createdAt: string;
}

export interface AuthUser extends User {
  token: string;
}

export const hasPermission = (userRole: string, requiredRole: string[]): boolean => {
  const roleHierarchy = {
    admin: 3,
    librarian: 2,
    student: 1
  };

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
  const requiredLevels = requiredRole.map(role => roleHierarchy[role as keyof typeof roleHierarchy] || 0);
  
  return requiredLevels.some(level => userLevel >= level);
};