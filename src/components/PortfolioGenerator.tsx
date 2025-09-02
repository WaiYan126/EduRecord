import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Download, 
  Share2, 
  Eye, 
  FileText, 
  Award, 
  Calendar,
  ExternalLink,
  CheckCircle,
  Star,
  Trophy,
  Briefcase
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Activity {
  id: string;
  title: string;
  type: string;
  description: string;
  points: number;
  status: string;
  submittedAt: string;
  approvedAt?: string;
}

interface PortfolioGeneratorProps {
  user: User;
  activities: Activity[];
  totalPoints: number;
}

export function PortfolioGenerator({ user, activities, totalPoints }: PortfolioGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);

  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clean, corporate-style layout perfect for job applications',
      preview: 'bg-gradient-to-br from-blue-50 to-indigo-100'
    },
    {
      id: 'academic',
      name: 'Academic',
      description: 'Research-focused design ideal for academic applications',
      preview: 'bg-gradient-to-br from-green-50 to-emerald-100'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Modern, visually appealing design for creative fields',
      preview: 'bg-gradient-to-br from-purple-50 to-pink-100'
    }
  ];

  const activityCategories = {
    'Internship': activities.filter(a => a.type.toLowerCase().includes('internship')),
    'Competition': activities.filter(a => a.type.toLowerCase().includes('competition') || a.type.toLowerCase().includes('hackathon')),
    'Research': activities.filter(a => a.type.toLowerCase().includes('research') || a.type.toLowerCase().includes('publication')),
    'Workshop': activities.filter(a => a.type.toLowerCase().includes('workshop') || a.type.toLowerCase().includes('training')),
    'Other': activities.filter(a => !['internship', 'competition', 'hackathon', 'research', 'publication', 'workshop', 'training'].some(keyword => a.type.toLowerCase().includes(keyword)))
  };

  const handleGeneratePortfolio = async (format: 'pdf' | 'web') => {
    setIsGenerating(true);
    
    // Simulate portfolio generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${user.name.replace(/\s+/g, '_')}_Portfolio.${format}`;
    
    if (format === 'pdf') {
      // Simulate PDF download
      console.log('Generating PDF portfolio...');
    } else {
      // Simulate web link generation
      console.log('Generating web portfolio...');
      alert('Portfolio web link: https://portfolio.edurecord.com/john-doe-2024');
    }
    
    setIsGenerating(false);
  };

  const getActivityIcon = (type: string) => {
    if (type.toLowerCase().includes('internship')) return <Briefcase className="w-4 h-4" />;
    if (type.toLowerCase().includes('competition') || type.toLowerCase().includes('hackathon')) return <Trophy className="w-4 h-4" />;
    if (type.toLowerCase().includes('research')) return <FileText className="w-4 h-4" />;
    return <Award className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Digital Portfolio Generator</span>
          </CardTitle>
          <CardDescription>
            Create a professional portfolio showcasing your achievements and activities
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="preview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          {/* Portfolio Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Preview</CardTitle>
              <CardDescription>
                Preview how your portfolio will look with the selected template
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`p-8 rounded-lg ${templates.find(t => t.id === selectedTemplate)?.preview} border`}>
                {/* Header Section */}
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                  <p className="text-lg text-gray-600 mb-4">{user.email}</p>
                  <div className="flex items-center justify-center space-x-4">
                    <Badge className="bg-blue-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      {totalPoints} Points
                    </Badge>
                    <Badge variant="outline">
                      <Trophy className="w-3 h-3 mr-1" />
                      {activities.length} Activities
                    </Badge>
                  </div>
                </div>

                {/* Summary Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Academic Profile</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(activityCategories).filter(([_, acts]) => acts.length > 0).map(([category, acts]) => (
                      <div key={category} className="text-center p-4 bg-white/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{acts.length}</div>
                        <div className="text-sm text-gray-600">{category}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activities Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Key Achievements</h2>
                  {activities.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="bg-white/50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getActivityIcon(activity.type)}
                            <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                            <Badge variant="outline">{activity.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>{activity.approvedAt || activity.submittedAt}</span>
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Verified</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{activity.points}</div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {activities.length > 3 && (
                    <div className="text-center text-sm text-gray-500">
                      ... and {activities.length - 3} more activities
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Choose Template</CardTitle>
              <CardDescription>
                Select a template that best represents your professional style
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all ${
                      selectedTemplate === template.id 
                        ? 'ring-2 ring-blue-500 border-blue-500' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className={`h-32 rounded-lg mb-4 ${template.preview}`}></div>
                      <h3 className="font-semibold mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                      {selectedTemplate === template.id && (
                        <div className="mt-2 flex items-center text-blue-600 text-sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Selected
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Sections</CardTitle>
              <CardDescription>
                Customize which sections to include in your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(activityCategories).map(([category, acts]) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={category}
                        defaultChecked={acts.length > 0}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor={category} className="font-medium">
                        {category}
                      </label>
                    </div>
                    <Badge variant="secondary">{acts.length} items</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>
                Download or share your portfolio in different formats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-6 text-center">
                    <Download className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Download PDF</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get a professionally formatted PDF perfect for job applications and printing
                    </p>
                    <Button 
                      onClick={() => handleGeneratePortfolio('pdf')}
                      disabled={isGenerating}
                      className="w-full"
                    >
                      {isGenerating ? 'Generating...' : 'Download PDF'}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-6 text-center">
                    <Share2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Share Web Link</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get a shareable web link for online applications and social media
                    </p>
                    <Button 
                      onClick={() => handleGeneratePortfolio('web')}
                      disabled={isGenerating}
                      variant="outline"
                      className="w-full"
                    >
                      {isGenerating ? 'Generating...' : 'Generate Link'}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Portfolio Tips
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your portfolio is automatically updated when new activities are approved</li>
                    <li>• Web links are valid for 1 year and can be renewed</li>
                    <li>• PDF portfolios include verification QR codes for authenticity</li>
                    <li>• Share responsibly - only provide access to trusted parties</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Portfolio Statistics</h4>
                  <p className="text-sm text-gray-600">
                    {activities.length} verified activities • {totalPoints} total points
                  </p>
                </div>
                <Badge className="bg-green-600 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Complete
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}