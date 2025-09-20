
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, FileText, Target, TrendingUp, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const AIAnalysis = () => {
  const analysisResults = {
    overallScore: 78,
    jobMatch: {
      score: 85,
      strengths: [
        "Strong React.js experience matches job requirements",
        "Leadership experience aligns with senior role expectations",
        "Portfolio demonstrates relevant project experience"
      ],
      improvements: [
        "Add more TypeScript experience examples",
        "Include cloud platform certifications",
        "Highlight agile methodology experience"
      ]
    },
    skillsAnalysis: [
      { skill: "React.js", current: 90, required: 85, status: "excellent" },
      { skill: "TypeScript", current: 70, required: 80, status: "needs-improvement" },
      { skill: "Node.js", current: 75, required: 70, status: "good" },
      { skill: "AWS", current: 40, required: 75, status: "critical" },
      { skill: "Leadership", current: 85, required: 70, status: "excellent" }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "good":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "needs-improvement":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "critical":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-500";
      case "good":
        return "bg-blue-500";
      case "needs-improvement":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Analysis
            </h1>
            <p className="text-muted-foreground mt-2">
              AI-powered CV and job matching analysis
            </p>
          </div>
          <Button className="gradient-primary text-white">
            <Brain className="w-4 h-4 mr-2" />
            Run New Analysis
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Target className="w-5 h-5" />
                Overall Match
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold mb-2">{analysisResults.overallScore}%</div>
              <Progress value={analysisResults.overallScore} className="h-3" />
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                CV Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold mb-2">82%</div>
              <Progress value={82} className="h-3" />
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Improvement
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold mb-2">+15%</div>
              <p className="text-sm text-muted-foreground">vs last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">✓ Strengths</CardTitle>
              <CardDescription>What makes you a great candidate</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysisResults.jobMatch.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">⚠ Areas to Improve</CardTitle>
              <CardDescription>Recommendations to boost your score</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysisResults.jobMatch.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Skills Analysis</CardTitle>
            <CardDescription>How your skills match the job requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisResults.skillsAnalysis.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(skill.status)}
                      <span className="font-medium">{skill.skill}</span>
                      <Badge variant="outline" className={`text-white ${getStatusColor(skill.status)}`}>
                        {skill.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {skill.current}% / {skill.required}% required
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Your Level</div>
                      <Progress value={skill.current} className="h-2" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Required Level</div>
                      <Progress value={skill.required} className="h-2 opacity-50" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AIAnalysis;
