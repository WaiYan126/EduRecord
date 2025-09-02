import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Upload, 
  Award, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Download, 
  Plus,
  TrendingUp,
  Star,
  Calendar,
  FileText,
  Trophy,
  Bot
} from 'lucide-react';
import { UploadActivityForm } from './UploadActivityForm';
import { PortfolioGenerator } from './PortfolioGenerator';
import { AIAssistant } from './AIAssistant';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface StudentDashboardProps {
  user: User;
}

interface Activity {
  id: string;
  title: string;
  type: string;
  description: string;
  points: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
  feedback?: string;
  certificate?: string;
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Web Development Workshop',
      type: 'Workshop',
      description: 'Completed 40-hour web development bootcamp',
      points: 50,
      status: 'approved',
      submittedAt: '2024-01-15',
      approvedAt: '2024-01-18',
      feedback: 'Excellent participation and final project submission.'
    },
    {
      id: '2',
      title: 'Hackathon 2024',
      type: 'Competition',
      description: 'Participated in university-wide hackathon',
      points: 75,
      status: 'approved',
      submittedAt: '2024-02-01',
      approvedAt: '2024-02-03'
    },
    {
      id: '3',
      title: 'Summer Internship - TechCorp',
      type: 'Internship',
      description: 'Software development internship for 8 weeks',
      points: 100,
      status: 'pending',
      submittedAt: '2024-02-10'
    },
    {
      id: '4',
      title: 'Research Paper Publication',
      type: 'Research',
      description: 'Published paper in IEEE conference',
      points: 150,
      status: 'rejected',
      submittedAt: '2024-02-05',
      feedback: 'Please provide proper documentation and supervisor approval.'
    }
  ]);

  const totalPoints = activities
    .filter(activity => activity.status === 'approved')
    .reduce((sum, activity) => sum + activity.points, 0);

  const pendingCount = activities.filter(activity => activity.status === 'pending').length;
  const approvedCount = activities.filter(activity => activity.status === 'approved').length;
  const rejectedCount = activities.filter(activity => activity.status === 'rejected').length;

  const handleAddActivity = (newActivity: Omit<Activity, 'id' | 'submittedAt' | 'status'>) => {
    const activity: Activity = {
      ...newActivity,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setActivities([...activities, activity]);
    setActiveTab('activities');
  };

  const getStatusIcon = (status: Activity['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-blue-100">Track your activities and build your digital portfolio</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-blue-600">{totalPoints}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Activities</p>
                <p className="text-2xl font-bold text-purple-600">{activities.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="upload">Upload Activity</TabsTrigger>
          <TabsTrigger value="activities">My Activities</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="ai-assistant" className="flex items-center space-x-1">
            <Bot className="w-4 h-4" />
            <span>AI Assistant</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 mt-6">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Progress</CardTitle>
              <CardDescription>Your journey towards academic excellence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Points Progress (Target: 500)</span>
                  <span>{totalPoints}/500</span>
                </div>
                <Progress value={(totalPoints / 500) * 100} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                  <p className="text-xl font-bold text-blue-600">+23%</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Achievement Level</p>
                  <p className="text-xl font-bold text-green-600">Gold</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest submissions and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(activity.status)}
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">{activity.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="mt-6">
          <UploadActivityForm onSubmit={handleAddActivity} />
        </TabsContent>

        <TabsContent value="activities" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>All Activities</CardTitle>
                <CardDescription>Manage and track your submitted activities</CardDescription>
              </div>
              <Button onClick={() => setActiveTab('upload')} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Activity</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <Card key={activity.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{activity.title}</h3>
                            <Badge variant="outline">{activity.type}</Badge>
                            {getStatusIcon(activity.status)}
                          </div>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>Submitted: {activity.submittedAt}</span>
                            </div>
                            {activity.approvedAt && (
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Approved: {activity.approvedAt}</span>
                              </div>
                            )}
                          </div>
                          {activity.feedback && (
                            <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                              <span className="font-medium">Feedback: </span>
                              {activity.feedback}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status}
                          </Badge>
                          <p className="text-sm font-semibold text-blue-600 mt-1">
                            {activity.points} points
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="mt-6">
          <PortfolioGenerator user={user} activities={activities.filter(a => a.status === 'approved')} totalPoints={totalPoints} />
        </TabsContent>

        <TabsContent value="ai-assistant" className="mt-6">
          <AIAssistant user={user} activities={activities} totalPoints={totalPoints} />
        </TabsContent>
      </Tabs>
    </div>
  );
}