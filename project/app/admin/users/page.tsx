"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX,
  Filter,
  Download,
  Upload,
  Sparkles,
  Zap,
  Crown,
  Users,
  TrendingUp,
  Award,
  Eye
} from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useState(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const UserManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@university.edu",
      role: "student",
      branch: "Main Library",
      status: "active",
      joinDate: "2023-09-15",
      booksCount: 3,
      finesAmount: 0
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@university.edu",
      role: "librarian",
      branch: "North Branch",
      status: "active",
      joinDate: "2022-01-10",
      booksCount: 0,
      finesAmount: 0
    },
    {
      id: 3,
      name: "Carol White",
      email: "carol.white@university.edu",
      role: "student",
      branch: "South Branch",
      status: "suspended",
      joinDate: "2023-08-20",
      booksCount: 2,
      finesAmount: 15.50
    },
    {
      id: 4,
      name: "David Brown",
      email: "david.brown@admin.university.edu",
      role: "admin",
      branch: "Main Library",
      status: "active",
      joinDate: "2021-05-01",
      booksCount: 0,
      finesAmount: 0
    },
    {
      id: 5,
      name: "Emma Davis",
      email: "emma.davis@university.edu",
      role: "student",
      branch: "East Branch",
      status: "active",
      joinDate: "2023-10-05",
      booksCount: 5,
      finesAmount: 2.25
    }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'librarian': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'student': return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'suspended': return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'inactive': return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleEmoji = (role) => {
    switch (role) {
      case 'admin': return '👑';
      case 'librarian': return '📚';
      case 'student': return '🎓';
      default: return '👤';
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'active': return '✅';
      case 'suspended': return '⚠️';
      case 'inactive': return '💤';
      default: return '❓';
    }
  };

  const StatCard = ({ icon: Icon, title, value, color, emoji }) => (
    <Card className={`bg-gradient-to-br from-${color}-50 to-${color}-100 border-${color}-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 relative overflow-hidden`}>
      <div className="absolute top-2 right-2 text-2xl animate-bounce">{emoji}</div>
      <div className="absolute top-4 left-4 opacity-20">
        <Sparkles className={`w-6 h-6 text-${color}-400 animate-pulse`} />
      </div>
      <CardContent className="p-6 relative z-10">
        <div className="text-center">
          <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-${color}-400 to-${color}-600 flex items-center justify-center text-white mb-3 shadow-lg`}>
            <Icon className="w-8 h-8" />
          </div>
          <p className={`text-3xl font-bold text-${color}-700 mb-1`}>
            <AnimatedCounter end={parseInt(value)} />
          </p>
          <p className={`text-sm text-${color}-600 font-medium`}>{title}</p>
        </div>
      </CardContent>
    </Card>
  );

  const AddUserDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 hover:scale-105 transition-all duration-300 shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          <Sparkles className="w-4 h-4 mr-1" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Plus className="w-5 h-5 mr-2 text-blue-500" />
            Add New User ✨
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="flex items-center">
              👤 Full Name
            </Label>
            <Input id="name" placeholder="Enter full name" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email" className="flex items-center">
              📧 Email
            </Label>
            <Input id="email" type="email" placeholder="Enter email address" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="role" className="flex items-center">
              🎭 Role
            </Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">🎓 Student</SelectItem>
                <SelectItem value="librarian">📚 Librarian</SelectItem>
                <SelectItem value="admin">👑 Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="branch" className="flex items-center">
              📍 Branch
            </Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">🏢 Main Library</SelectItem>
                <SelectItem value="north">🧭 North Branch</SelectItem>
                <SelectItem value="south">🗺️ South Branch</SelectItem>
                <SelectItem value="east">🌅 East Branch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all duration-300">
            <Zap className="w-4 h-4 mr-2" />
            Create User ✨
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <ProtectedRoute requiredRoles={['admin']}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Header */}
          <div className="mb-8 relative">
            <div className="absolute -top-2 -left-2">
              <Crown className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              User Management 👥
            </h1>
            <p className="text-gray-600 text-lg">
              🎛️ Manage library users, roles, and permissions
            </p>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Users}
              title="Total Users"
              value="324"
              color="blue"
              emoji="👥"
            />
            <StatCard
              icon={TrendingUp}
              title="Active Students"
              value="298"
              color="green"
              emoji="🎓"
            />
            <StatCard
              icon={Award}
              title="Librarians"
              value="15"
              color="purple"
              emoji="📚"
            />
            <StatCard
              icon={Crown}
              title="Admins"
              value="3"
              color="orange"
              emoji="👑"
            />
          </div>

          {/* Enhanced Controls */}
          <Card className="mb-6 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Sparkles className="w-5 h-5 text-blue-400 animate-bounce" />
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <div className="relative flex-1 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="🔍 Search users by name or email..."
                        className="pl-10 border-2 hover:border-blue-300 transition-colors duration-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-48 border-2 hover:border-blue-300 transition-colors duration-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">🎓 Students</SelectItem>
                      <SelectItem value="librarian">📚 Librarians</SelectItem>
                      <SelectItem value="admin">👑 Admins</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48 border-2 hover:border-blue-300 transition-colors duration-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">✅ Active</SelectItem>
                      <SelectItem value="suspended">⚠️ Suspended</SelectItem>
                      <SelectItem value="inactive">💤 Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300 hover:scale-105 transition-all duration-300">
                    <Download className="w-4 h-4 mr-2" />
                    Export 📊
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-300">
                    <Upload className="w-4 h-4 mr-2" />
                    Import 📥
                  </Button>
                  <AddUserDialog />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Users Table */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Eye className="w-5 h-5 text-purple-400 animate-bounce" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-6 h-6 mr-2 text-blue-500" />
                Users ({mockUsers.length}) 📋
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-gray-50">
                      <TableHead className="font-bold">👤 User</TableHead>
                      <TableHead className="font-bold">🎭 Role</TableHead>
                      <TableHead className="font-bold">📍 Branch</TableHead>
                      <TableHead className="font-bold">📊 Status</TableHead>
                      <TableHead className="font-bold">📚 Books</TableHead>
                      <TableHead className="font-bold">💰 Fines</TableHead>
                      <TableHead className="font-bold">📅 Join Date</TableHead>
                      <TableHead className="font-bold">⚙️ Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getRoleColor(user.role)} animate-glow hover:animate-none transition-all duration-300`}>
                            {getRoleEmoji(user.role)} {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{user.branch}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(user.status)} animate-glow hover:animate-none transition-all duration-300`}>
                            {getStatusEmoji(user.status)} {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-blue-600">{user.booksCount}</span>
                        </TableCell>
                        <TableCell>
                          {user.finesAmount > 0 ? (
                            <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded-lg">
                              💰 ${user.finesAmount.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-lg">
                              ✅ $0.00
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:scale-110 transition-all duration-300">
                              <Edit className="w-4 h-4" />
                            </Button>
                            {user.status === 'active' ? (
                              <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hover:scale-110 transition-all duration-300">
                                <UserX className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50 hover:scale-110 transition-all duration-300">
                                <UserCheck className="w-4 h-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hover:scale-110 transition-all duration-300">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserManagement;