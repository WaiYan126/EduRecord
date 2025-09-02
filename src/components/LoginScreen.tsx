import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Loader2, GraduationCap, Users, Building } from 'lucide-react';

type UserRole = 'student' | 'faculty' | 'institution';

interface LoginScreenProps {
  onLogin: (email: string, password: string, role: UserRole) => void;
  isLoading: boolean;
}

export function LoginScreen({ onLogin, isLoading }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState('login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
  };

  const demoUsers = [
    { role: 'student', email: 'john.doe@university.edu', name: 'John Doe (Student)' },
    { role: 'faculty', email: 'sarah.smith@university.edu', name: 'Dr. Sarah Smith (Faculty)' },
    { role: 'institution', email: 'admin@university.edu', name: 'Admin Johnson (Institution)' }
  ];

  const handleDemoLogin = (demoUser: typeof demoUsers[0]) => {
    setEmail(demoUser.email);
    setPassword('demo123');
    setRole(demoUser.role as UserRole);
    setTimeout(() => {
      onLogin(demoUser.email, 'demo123', demoUser.role as UserRole);
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">EduRecord</h1>
          <p className="text-gray-600 mt-2">Student Activity Management Platform</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Choose your role and sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="demo">Demo Access</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="w-4 h-4" />
                            <span>Student</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="faculty">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>Faculty/Admin</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="institution">
                          <div className="flex items-center space-x-2">
                            <Building className="w-4 h-4" />
                            <span>Institution</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="demo" className="space-y-4 mt-4">
                <p className="text-sm text-gray-600 text-center">
                  Try the platform with demo accounts
                </p>
                <div className="space-y-2">
                  {demoUsers.map((user) => (
                    <Button
                      key={user.role}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDemoLogin(user)}
                      disabled={isLoading}
                    >
                      {user.role === 'student' && <GraduationCap className="w-4 h-4 mr-2" />}
                      {user.role === 'faculty' && <Users className="w-4 h-4 mr-2" />}
                      {user.role === 'institution' && <Building className="w-4 h-4 mr-2" />}
                      {user.name}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}