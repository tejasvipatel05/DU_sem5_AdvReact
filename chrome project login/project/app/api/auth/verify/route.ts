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

const verifyToken = (token: string): User | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = mockUsers.find(u => u.id === decoded.id);
    if (!user) return null;
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      branch: user.branch,
      createdAt: user.createdAt
    };
  } catch (error) {
    return null;
  }
};

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}