"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { BookOpen, User, Lock, Sparkles, Zap, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@library.com', password: 'password', color: 'red', emoji: '👑' },
    { role: 'Librarian', email: 'librarian@library.com', password: 'password', color: 'blue', emoji: '📚' },
    { role: 'Student', email: 'student@library.com', password: 'password', color: 'green', emoji: '🎓' }
  ];

  const fillDemo = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i}
          className="absolute w-2 h-2 bg-blue-300/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${4 + Math.random() * 3}s`
          }}
        />
      ))}

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center relative overflow-hidden group">
              <BookOpen className="w-8 h-8 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                LibraryPro
              </h1>
              <p className="text-gray-600 text-sm">Modern Library Management</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="relative overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50" />
          <div className="absolute top-4 right-4">
            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
          </div>
          
          <CardHeader className="relative z-10 text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center space-x-2">
              <User className="w-6 h-6 text-blue-500" />
              <span>Welcome Back</span>
            </CardTitle>
            <p className="text-gray-600 mt-2">Sign in to access your library account</p>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-2 focus:border-blue-500 transition-colors duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-2 focus:border-blue-500 transition-colors duration-300"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white font-medium py-3 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600 mb-3 font-medium">Try Demo Accounts:</p>
              <div className="grid grid-cols-1 gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.role}
                    onClick={() => fillDemo(account.email, account.password)}
                    className={`p-3 rounded-lg border-2 border-${account.color}-200 bg-${account.color}-50 hover:bg-${account.color}-100 transition-all duration-300 hover:scale-105 text-left`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{account.emoji}</span>
                      <div>
                        <p className={`font-medium text-${account.color}-700`}>{account.role}</p>
                        <p className="text-xs text-gray-600">{account.email}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;