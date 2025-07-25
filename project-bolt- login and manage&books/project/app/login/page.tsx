'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, User, Lock, Eye, EyeOff, Sparkles, Crown, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import ParticleBackground from '@/components/ParticleBackground';
import FloatingBooks from '@/components/FloatingBooks';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState('');
  const [magicParticles, setMagicParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const particles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setMagicParticles(particles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      router.push('/');
    } else {
      setError('Invalid credentials. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setSelectedDemo(demoEmail);
  };

  const demoAccounts = [
    {
      email: 'student@university.edu',
      role: 'Student',
      icon: GraduationCap,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      description: 'Browse books, checkout, manage favorites'
    },
    {
      email: 'librarian@university.edu',
      role: 'Librarian',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      description: 'Manage books, handle checkouts, view reports'
    },
    {
      email: 'admin@university.edu',
      role: 'Administrator',
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      description: 'Full system access, user management'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Magical Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/95 to-purple-50/90" />
      </div>
      
      <ParticleBackground />
      <FloatingBooks />

      {/* Floating Magic Particles */}
      {magicParticles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`
          }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse opacity-60" />
        </div>
      ))}

      <div className="relative z-30 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <div className="ml-6">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Readify
                </h1>
                <p className="text-xl text-gray-600 font-medium">Where knowledge meets magic ✨</p>
              </div>
            </div>
            
            <div className="space-y-6 mb-8">
              <h2 className="text-4xl font-bold text-gray-900">
                Welcome to Your
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Magical Journey
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Access thousands of books, manage your reading list, and discover new worlds of knowledge in our enchanted digital library.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '📚', title: 'Vast Collection', desc: '10,000+ Books' },
                { icon: '⚡', title: 'Instant Access', desc: 'Digital Checkout' },
                { icon: '🎯', title: 'Personalized', desc: 'Reading Goals' },
                { icon: '🌟', title: 'Community', desc: 'Reviews & Ratings' }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <h3 className="font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="bg-white/80 backdrop-blur-xl shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardHeader className="text-center pb-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  🔮 Enter the Library
                </CardTitle>
                <p className="text-gray-600">Sign in to access your magical collection</p>
              </CardHeader>

              <CardContent className="p-8">
                {/* Demo Accounts */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                    ✨ Try Demo Accounts
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {demoAccounts.map((account) => (
                      <button
                        key={account.email}
                        onClick={() => handleDemoLogin(account.email)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 text-left ${
                          selectedDemo === account.email
                            ? 'border-blue-500 bg-gradient-to-r ' + account.bgColor
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${account.color} flex items-center justify-center`}>
                            <account.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-gray-900">{account.role}</div>
                            <div className="text-sm text-gray-600">{account.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm animate-in slide-in-from-top-2">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Casting Login Spell...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Enter the Library
                      </div>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Demo password for all accounts: <Badge className="bg-blue-100 text-blue-700">password123</Badge>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}