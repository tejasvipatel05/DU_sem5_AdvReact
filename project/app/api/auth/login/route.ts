import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'librarian' | 'student';
  branch: string;
  createdAt: string;
}

interface AuthUser extends User {
  token: string;
}

// Mock user database
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@library.com',
    password: 'password',
    role: 'admin' as const,
    branch: 'Main Library',
    createdAt: '2023-01-01'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'librarian@library.com',
    password: 'password',
    role: 'librarian' as const,
    branch: 'Main Library',
    createdAt: '2023-02-01'
  },
  {
    id: '3',
    name: 'Alex Johnson',
    email: 'student@library.com',
    password: 'password',
    role: 'student' as const,
    branch: 'Main Library',
    createdAt: '2023-03-01'
  }
];

const generateToken = (user: User): string => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const login = async (email: string, password: string): Promise<AuthUser | null> => {
  const user = mockUsers.find(u => u.email === email);
  if (!user) return null;

  if (user.password !== password) return null;

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    branch: user.branch,
    createdAt: user.createdAt
  };

  const token = generateToken(userWithoutPassword);

  return {
    ...userWithoutPassword,
    token
  };
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const authUser = await login(email, password);

    if (!authUser) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json(authUser);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}