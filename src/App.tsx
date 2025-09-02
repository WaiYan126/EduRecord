import React, { useState, useEffect } from 'react';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { LoginScreen } from './components/LoginScreen';
import { StudentDashboard } from './components/StudentDashboard';
import { FacultyDashboard } from './components/FacultyDashboard';
import { InstitutionDashboard } from './components/InstitutionDashboard';
import { Badge } from './components/ui/badge';
import { LogOut, User } from 'lucide-react';

type UserRole = 'student' | 'faculty' | 'institution';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      const mockUser: User = {
        id: `${role}_${Date.now()}`,
        name: role === 'student' ? 'John Doe' : role === 'faculty' ? 'Dr. Sarah Smith' : 'Admin Johnson',
        email,
        role
      };
      setCurrentUser(mockUser);
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} isLoading={isLoading} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">EduRecord</span>
              </div>
              <Badge variant="secondary" className="capitalize">
                {currentUser.role}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentUser.role === 'student' && <StudentDashboard user={currentUser} />}
        {currentUser.role === 'faculty' && <FacultyDashboard user={currentUser} />}
        {currentUser.role === 'institution' && <InstitutionDashboard user={currentUser} />}
      </main>
    </div>
  );
}