
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Brain, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CVAnalyzer = () => {
  const { toast } = useToast();
  const [jobUrl, setJobUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "CV Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const handleAnalyze = () => {
    if (!jobUrl) {
      toast({
        title: "Error",
        description: "Please enter a job URL to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        matchScore: 87,
        strengths: [
          "Strong technical skills in React and TypeScript",
          "Relevant experience in frontend development",
          "Good educational background",
          "Previous startup experience"
        ],
        improvements: [
          "Add more details about project leadership",
          "Include specific metrics and achievements",
          "Highlight cloud platform experience",
          "Mention agile/scrum methodology experience"
        ],
        keywords: {
          missing: ["Docker", "Kubernetes", "AWS", "GraphQL"],
          present: ["React", "TypeScript", "JavaScript", "CSS"]
        }
      });
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Your CV has been analyzed successfully!",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          CV Analyzer & Optimizer
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload your CV and analyze it against job requirements using AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload CV
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Drop your CV here or click to browse
              </p>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="cv-upload"
              />
              <Button asChild variant="outline">
                <label htmlFor="cv-upload" className="cursor-pointer">
                  Choose File
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Job URL Input */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Job Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Job Posting URL</label>
              <Input
                placeholder="https://linkedin.com/jobs/..."
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full gradient-primary text-white border-0"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analyze Match
                </>
              )}
            </Button>
            {isAnalyzing && (
              <div className="space-y-2">
                <Progress value={33} className="w-full" />
                <p className="text-xs text-center text-muted-foreground">
                  AI is analyzing your CV against job requirements...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Match Score */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Match Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${analysisResult.matchScore * 2.51} 251`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{analysisResult.matchScore}%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Good match! Your CV aligns well with the job requirements.
              </p>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResult.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{strength}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Improvements */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Improvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResult.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{improvement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Keywords Analysis */}
      {analysisResult && (
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Keywords Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 text-green-600">Present Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.keywords.present.map((keyword, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-red-600">Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.keywords.missing.map((keyword, index) => (
                    <Badge key={index} className="bg-red-100 text-red-800">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CVAnalyzer;
