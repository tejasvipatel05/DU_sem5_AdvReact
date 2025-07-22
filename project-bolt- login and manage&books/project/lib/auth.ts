export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'librarian' | 'admin';
  booksRead: number;
  booksCheckedOut: number;
  favoriteGenre: string;
  joinDate: string;
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock users for different roles
export const mockUsers: Record<string, User> = {
  'student@university.edu': {
    id: '1',
    name: 'Sarah Johnson',
    email: 'student@university.edu',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    role: 'student',
    booksRead: 47,
    booksCheckedOut: 3,
    favoriteGenre: 'Science Fiction',
    joinDate: '2023-09-01',
    permissions: ['view_books', 'checkout_books', 'manage_favorites', 'view_profile']
  },
  'librarian@university.edu': {
    id: '2',
    name: 'Michael Chen',
    email: 'librarian@university.edu',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    role: 'librarian',
    booksRead: 156,
    booksCheckedOut: 0,
    favoriteGenre: 'History',
    joinDate: '2020-03-15',
    permissions: ['view_books', 'manage_books', 'manage_checkouts', 'view_reports', 'manage_users']
  },
  'admin@university.edu': {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'admin@university.edu',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    role: 'admin',
    booksRead: 234,
    booksCheckedOut: 0,
    favoriteGenre: 'Philosophy',
    joinDate: '2018-01-10',
    permissions: ['view_books', 'manage_books', 'manage_checkouts', 'view_reports', 'manage_users', 'system_admin', 'manage_categories']
  }
};

export const rolePermissions = {
  student: ['view_books', 'checkout_books', 'manage_favorites', 'view_profile'],
  librarian: ['view_books', 'manage_books', 'manage_checkouts', 'view_reports', 'manage_users', 'manage_favorites', 'view_profile'],
  admin: ['view_books', 'manage_books', 'manage_checkouts', 'view_reports', 'manage_users', 'system_admin', 'manage_categories', 'manage_favorites', 'view_profile']
};

export const authenticate = (email: string, password: string): User | null => {
  // Simple mock authentication - in real app, this would be API call
  if (password === 'password123' && mockUsers[email]) {
    return mockUsers[email];
  }
  return null;
};

export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false;
  return user.permissions.includes(permission);
};

export const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case 'student': return '🎓 Student';
    case 'librarian': return '📚 Librarian';
    case 'admin': return '👑 Administrator';
    default: return role;
  }
};

export const getRoleColor = (role: string): string => {
  switch (role) {
    case 'student': return 'from-blue-500 to-cyan-500';
    case 'librarian': return 'from-green-500 to-emerald-500';
    case 'admin': return 'from-purple-500 to-pink-500';
    default: return 'from-gray-500 to-gray-600';
  }
};