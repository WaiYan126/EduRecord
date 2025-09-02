import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter,
  FileText,
  User,
  Calendar,
  Award,
  Download,
  Eye,
  MessageSquare,
  TrendingUp,
  Users
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface FacultyDashboardProps {
  user: User;
}

interface Submission {
  id: string;
  studentName: string;
  studentEmail: string;
  title: string;
  type: string;
  description: string;
  points: number;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
  feedback?: string;
}

export function FacultyDashboard({ user }: FacultyDashboardProps) {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState('');

  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: '1',
      studentName: 'John Doe',
      studentEmail: 'john.doe@university.edu',
      title: 'Summer Internship - TechCorp',
      type: 'Internship',
      description: 'Software development internship for 8 weeks at TechCorp. Worked on React.js applications and gained experience in full-stack development.',
      points: 100,
      submittedAt: '2024-02-10',
      status: 'pending',
      documents: ['internship_certificate.pdf', 'project_report.pdf']
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentEmail: 'jane.smith@university.edu',
      title: 'AI/ML Workshop',
      type: 'Workshop',
      description: 'Completed 3-day intensive workshop on Machine Learning fundamentals and practical applications.',
      points: 25,
      submittedAt: '2024-02-08',
      status: 'pending',
      documents: ['workshop_certificate.pdf']
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      studentEmail: 'mike.johnson@university.edu',
      title: 'Research Paper on Blockchain',
      type: 'Research',
      description: 'Published research paper titled "Blockchain Applications in Supply Chain Management" in IEEE conference.',
      points: 150,
      submittedAt: '2024-02-05',
      status: 'pending',
      documents: ['research_paper.pdf', 'publication_proof.pdf']
    },
    {
      id: '4',
      studentName: 'Sarah Wilson',
      studentEmail: 'sarah.wilson@university.edu',
      title: 'Hackathon Winner',
      type: 'Competition',
      description: 'First place winner in University Hackathon 2024 with innovative mobile app solution.',
      points: 75,
      submittedAt: '2024-01-28',
      status: 'approved',
      documents: ['winner_certificate.pdf'],
      feedback: 'Excellent innovation and technical implementation. Well deserved win!'
    }
  ]);

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const approvedCount = submissions.filter(s => s.status === 'approved').length;
  const rejectedCount = submissions.filter(s => s.status === 'rejected').length;

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || submission.type.toLowerCase() === filterType.toLowerCase();
    const matchesTab = activeTab === 'all' || submission.status === activeTab;
    
    return matchesSearch && matchesFilter && matchesTab;
  });

  const handleApproval = (submissionId: string, action: 'approved' | 'rejected', feedbackText: string) => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === submissionId 
          ? { ...sub, status: action, feedback: feedbackText }
          : sub
      )
    );
    setSelectedSubmission(null);
    setFeedback('');
  };

  const getStatusColor = (status: Submission['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: Submission['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Faculty Dashboard</h1>
        <p className="text-indigo-100">Review and approve student activity submissions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
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
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-blue-600">{submissions.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by student name or activity title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="competition">Competition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submissions List */}
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold">{submission.studentName}</span>
                        </div>
                        <Badge variant="outline">{submission.type}</Badge>
                        {getStatusIcon(submission.status)}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{submission.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{submission.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Submitted: {submission.submittedAt}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="w-3 h-3" />
                            <span>{submission.points} points</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-3 h-3" />
                            <span>{submission.documents.length} document(s)</span>
                          </div>
                        </div>

                        {submission.documents.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {submission.documents.map((doc, index) => (
                              <Button key={index} variant="outline" size="sm" className="text-xs">
                                <Eye className="w-3 h-3 mr-1" />
                                {doc}
                              </Button>
                            ))}
                          </div>
                        )}

                        {submission.feedback && (
                          <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-700">Feedback:</p>
                                <p className="text-sm text-gray-600">{submission.feedback}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status}
                      </Badge>
                      
                      {submission.status === 'pending' && (
                        <div className="space-y-2">
                          <Button
                            size="sm"
                            onClick={() => setSelectedSubmission(submission)}
                            className="w-full"
                          >
                            Review
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredSubmissions.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No submissions found</h3>
                  <p className="text-gray-500">
                    {activeTab === 'pending' 
                      ? 'All caught up! No pending submissions to review.' 
                      : 'No submissions match your current filters.'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Tabs>

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Review Submission</CardTitle>
              <CardDescription>
                Evaluate {selectedSubmission.studentName}'s activity submission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">{selectedSubmission.title}</h3>
                <Badge variant="outline">{selectedSubmission.type}</Badge>
                <p className="text-sm text-gray-600">{selectedSubmission.description}</p>
                <p className="text-sm text-blue-600 font-medium">
                  Points to be awarded: {selectedSubmission.points}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Feedback (optional)</label>
                <Textarea
                  placeholder="Provide feedback for the student..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={() => handleApproval(selectedSubmission.id, 'approved', feedback)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => handleApproval(selectedSubmission.id, 'rejected', feedback)}
                  variant="destructive"
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    setSelectedSubmission(null);
                    setFeedback('');
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}