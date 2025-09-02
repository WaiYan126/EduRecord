import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, File, X, Calendar, Award } from 'lucide-react';
import { Badge } from './ui/badge';

interface Activity {
  title: string;
  type: string;
  description: string;
  points: number;
  certificate?: string;
}

interface UploadActivityFormProps {
  onSubmit: (activity: Activity) => void;
}

const activityTypes = [
  { value: 'workshop', label: 'Workshop/Training', points: 25 },
  { value: 'seminar', label: 'Seminar/Conference', points: 20 },
  { value: 'competition', label: 'Competition', points: 50 },
  { value: 'internship', label: 'Internship', points: 100 },
  { value: 'research', label: 'Research Project', points: 150 },
  { value: 'publication', label: 'Publication', points: 200 },
  { value: 'volunteer', label: 'Volunteer Work', points: 30 },
  { value: 'certification', label: 'Professional Certification', points: 75 },
  { value: 'hackathon', label: 'Hackathon', points: 60 },
  { value: 'presentation', label: 'Paper Presentation', points: 40 }
];

export function UploadActivityForm({ onSubmit }: UploadActivityFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    duration: '',
    organizer: '',
    date: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedActivityType = activityTypes.find(type => type.value === formData.type);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivityType) return;

    setIsSubmitting(true);
    
    // Simulate file upload and processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const activity: Activity = {
      title: formData.title,
      type: selectedActivityType.label,
      description: formData.description,
      points: selectedActivityType.points,
      certificate: uploadedFiles.length > 0 ? uploadedFiles[0].name : undefined
    };

    onSubmit(activity);
    
    // Reset form
    setFormData({
      title: '',
      type: '',
      description: '',
      duration: '',
      organizer: '',
      date: ''
    });
    setUploadedFiles([]);
    setIsSubmitting(false);
  };

  const isFormValid = formData.title && formData.type && formData.description && formData.date;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Upload New Activity</span>
        </CardTitle>
        <CardDescription>
          Submit your extracurricular activities, internships, certifications, and achievements for approval
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Activity Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="type">Activity Type *</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{type.label}</span>
                      <Badge variant="secondary" className="ml-2">{type.points} pts</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedActivityType && (
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Award className="w-4 h-4" />
                <span>This activity will earn you {selectedActivityType.points} points when approved</span>
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Activity Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Web Development Workshop"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer/Institution</Label>
              <Input
                id="organizer"
                placeholder="e.g., IEEE Student Branch"
                value={formData.organizer}
                onChange={(e) => handleInputChange('organizer', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 3 days, 40 hours"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your role, key learnings, achievements, and impact of this activity..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              required
            />
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <div>
              <Label>Supporting Documents</Label>
              <p className="text-sm text-gray-500 mb-2">
                Upload certificates, photos, project reports, or other proof of participation
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    <span className="text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, PNG, DOC up to 10MB each
                  </p>
                </label>
              </div>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files</Label>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024 / 1024).toFixed(1)} MB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Guidelines */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Submission Guidelines</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Provide clear, detailed descriptions of your activities</li>
                <li>• Include relevant certificates or proof of participation</li>
                <li>• Activities will be reviewed by faculty within 2-3 business days</li>
                <li>• You may be contacted for additional documentation if needed</li>
              </ul>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}