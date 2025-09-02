import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Award, 
  FileText, 
  Download,
  Calendar,
  Building,
  GraduationCap,
  BookOpen,
  Target,
  Settings,
  BarChart3,
  UserCheck,
  Trophy,
  Clock
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface InstitutionDashboardProps {
  user: User;
}

const activityData = [
  { month: 'Jan', activities: 45, points: 1200 },
  { month: 'Feb', activities: 52, points: 1450 },
  { month: 'Mar', activities: 48, points: 1380 },
  { month: 'Apr', activities: 61, points: 1620 },
  { month: 'May', activities: 55, points: 1510 },
  { month: 'Jun', activities: 67, points: 1890 }
];

const departmentData = [
  { name: 'Computer Science', value: 35, color: '#3B82F6' },
  { name: 'Electrical Engineering', value: 25, color: '#10B981' },
  { name: 'Mechanical Engineering', value: 20, color: '#F59E0B' },
  { name: 'Civil Engineering', value: 15, color: '#EF4444' },
  { name: 'Other', value: 5, color: '#8B5CF6' }
];

const topActivities = [
  { type: 'Internships', count: 125, growth: '+12%' },
  { type: 'Workshops', count: 98, growth: '+8%' },
  { type: 'Competitions', count: 87, growth: '+15%' },
  { type: 'Research', count: 64, growth: '+22%' },
  { type: 'Certifications', count: 45, growth: '+18%' }
];

export function InstitutionDashboard({ user }: InstitutionDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedReport, setSelectedReport] = useState('');

  const handleExportReport = (reportType: string) => {
    // Simulate report generation
    console.log(`Generating ${reportType} report...`);
    alert(`${reportType} report will be downloaded shortly.`);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Institution Analytics</h1>
        <p className="text-purple-100">Comprehensive insights into student activities and engagement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
                <p className="text-xs text-green-600 mt-1">+8% from last semester</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Activities</p>
                <p className="text-2xl font-bold text-green-600">419</p>
                <p className="text-xs text-green-600 mt-1">+15% this month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-purple-600">45,890</p>
                <p className="text-xs text-green-600 mt-1">+12% from last quarter</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold text-orange-600">87%</p>
                <p className="text-xs text-green-600 mt-1">Above target (85%)</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Activity Trends */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Activity Trends</CardTitle>
                <CardDescription>Monthly activity submissions and points earned</CardDescription>
              </div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="2years">2 Years</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="activities" fill="#3B82F6" name="Activities" />
                    <Line yAxisId="right" type="monotone" dataKey="points" stroke="#10B981" strokeWidth={3} name="Points" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Distribution by Department</CardTitle>
                <CardDescription>Participation across different departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                      <span className="text-sm text-gray-600">{dept.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Activities</CardTitle>
                <CardDescription>Most engaged activity types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          {index === 0 && <GraduationCap className="w-4 h-4 text-blue-600" />}
                          {index === 1 && <BookOpen className="w-4 h-4 text-green-600" />}
                          {index === 2 && <Trophy className="w-4 h-4 text-yellow-600" />}
                          {index === 3 && <FileText className="w-4 h-4 text-purple-600" />}
                          {index === 4 && <Award className="w-4 h-4 text-red-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.type}</p>
                          <p className="text-sm text-gray-600">{activity.count} submissions</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        {activity.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>In-depth analysis of student engagement patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="activities" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <UserCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Active Students</h3>
                <p className="text-3xl font-bold text-blue-600">1,089</p>
                <p className="text-sm text-gray-600">87% participation rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Avg. Response Time</h3>
                <p className="text-3xl font-bold text-yellow-600">2.1</p>
                <p className="text-sm text-gray-600">days for approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Goal Achievement</h3>
                <p className="text-3xl font-bold text-green-600">94%</p>
                <p className="text-sm text-gray-600">of monthly targets</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Export detailed reports for accreditation and analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-dashed border-blue-300">
                  <CardContent className="p-6 text-center">
                    <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">NAAC Report</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Comprehensive report formatted for NAAC accreditation requirements
                    </p>
                    <Button 
                      onClick={() => handleExportReport('NAAC')}
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Generate NAAC Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-green-300">
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">AICTE Report</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Technical education metrics formatted for AICTE compliance
                    </p>
                    <Button 
                      onClick={() => handleExportReport('AICTE')}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Generate AICTE Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-purple-300">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">NIRF Report</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      National ranking framework metrics and analysis
                    </p>
                    <Button 
                      onClick={() => handleExportReport('NIRF')}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Generate NIRF Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-orange-300">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Custom Analytics</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Department-wise detailed analytics and insights
                    </p>
                    <Button 
                      onClick={() => handleExportReport('Custom')}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Generate Custom Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Report Generation Guidelines</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Reports include verified activities from the last academic year</li>
                    <li>• All data is automatically formatted according to respective standards</li>
                    <li>• Generated reports include QR codes for digital verification</li>
                    <li>• Export time may vary based on data volume (typically 2-5 minutes)</li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Manage institution-wide settings and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-6">
                    <Settings className="w-8 h-8 text-gray-600 mb-4" />
                    <h3 className="font-semibold mb-2">Point System</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Configure point values for different activity types
                    </p>
                    <Button variant="outline" className="w-full">
                      Configure Points
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-6">
                    <Building className="w-8 h-8 text-gray-600 mb-4" />
                    <h3 className="font-semibold mb-2">LMS Integration</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Connect with existing Learning Management System
                    </p>
                    <Button variant="outline" className="w-full">
                      Setup Integration
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-6">
                    <UserCheck className="w-8 h-8 text-gray-600 mb-4" />
                    <h3 className="font-semibold mb-2">User Management</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Manage faculty, students, and administrative access
                    </p>
                    <Button variant="outline" className="w-full">
                      Manage Users
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-6">
                    <FileText className="w-8 h-8 text-gray-600 mb-4" />
                    <h3 className="font-semibold mb-2">Backup & Export</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Configure automated backups and data retention
                    </p>
                    <Button variant="outline" className="w-full">
                      Configure Backup
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}