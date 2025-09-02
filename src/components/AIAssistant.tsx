import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  Target, 
  BookOpen,
  Trophy,
  Clock,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { Separator } from './ui/separator';

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
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
  feedback?: string;
  certificate?: string;
}

interface AIAssistantProps {
  user: User;
  activities: Activity[];
  totalPoints: number;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const suggestedPrompts = [
  "What activities should I pursue to reach 500 points?",
  "How can I improve my portfolio?",
  "Suggest internship opportunities in tech",
  "What skills should I develop for my career?",
  "How to write a compelling activity description?",
  "What are the best coding competitions to participate in?"
];

export function AIAssistant({ user, activities, totalPoints }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello ${user.name}! 👋 I'm your AI Academic Assistant. I'm here to help you optimize your academic journey, suggest relevant activities, and provide personalized guidance for your portfolio development. 

With your current ${totalPoints} points and ${activities.length} activities, I can help you strategize your next steps. What would you like to know?`,
      timestamp: new Date(),
      suggestions: [
        "Analyze my current progress",
        "Suggest new activities",
        "Help improve my portfolio",
        "Career guidance"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3.2:latest",
          system: "You are a concise academic assistant. Always reply in plain text without ANY Markdown characters. Use '-' bullets or '1)' numbering only.",
          prompt: `Answer in plain text (no markdown). Use simple '-' bullets or '1)':\n\n${userMessage}`,
          stream: true
        })
      });

      if (!response.body) {
        throw new Error("No response body from Ollama");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(line => line.trim() !== "");
        for (const line of lines) {
          const data = JSON.parse(line);
          if (data.response) {
            result += data.response;
          }
        }
      }

      return result.trim();
    } catch (error) {
      console.error("Ollama error:", error);
      return "⚠️ Sorry, I couldn’t connect to the AI right now. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <span>AI Academic Assistant</span>
            <Badge variant="secondary" className="ml-2">
              <Sparkles className="w-3 h-3 mr-1" />
              Smart
            </Badge>
          </CardTitle>
          <CardDescription>
            Get personalized guidance for your academic journey, activity planning, and career development
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-gray-600" />
              <span className="font-medium">Conversation</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {messages.length} messages
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 leading-relaxed text-[15px] space-y-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' && (
                      <Bot className="w-4 h-4 mt-1 text-blue-600" />
                    )}
                    {message.role === 'user' && (
                      <User className="w-4 h-4 mt-1 text-white" />
                    )}
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          <Separator className="bg-blue-200" />
                          <p className="text-sm font-medium text-blue-700">Quick actions:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => handleSuggestedPrompt(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="text-xs opacity-75 mt-2">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4 max-w-[80%] leading-relaxed text-[15px] space-y-2">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0 border-t p-4 bg-gray-50">
            <div className="space-y-3">
              {/* Suggested Prompts */}
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.slice(0, 3).map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSuggestedPrompt(prompt)}
                  >
                    <Lightbulb className="w-3 h-3 mr-1" />
                    {prompt}
                  </Button>
                ))}
              </div>
              
              {/* Input Field */}
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your academic journey..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats for AI Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-purple-600" />
            <span>AI Context</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Trophy className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <div className="text-sm font-medium text-gray-600">Total Points</div>
              <div className="font-bold text-blue-600">{totalPoints}</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm font-medium text-gray-600">Activities</div>
              <div className="font-bold text-green-600">{activities.length}</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <div className="text-sm font-medium text-gray-600">Progress</div>
              <div className="font-bold text-purple-600">{Math.round((totalPoints/500)*100)}%</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Target className="w-6 h-6 text-orange-600 mx-auto mb-1" />
              <div className="text-sm font-medium text-gray-600">To Goal</div>
              <div className="font-bold text-orange-600">{Math.max(0, 500 - totalPoints)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
