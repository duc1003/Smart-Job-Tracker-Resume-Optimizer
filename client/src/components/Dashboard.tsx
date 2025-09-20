
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Calendar,
  Plus,
  Target,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Applications",
      value: "24",
      change: "+3 this week",
      icon: Briefcase,
      gradient: "gradient-primary"
    },
    {
      title: "Active CVs",
      value: "5",
      change: "+1 this month",
      icon: FileText,
      gradient: "gradient-success"
    },
    {
      title: "Interview Rate",
      value: "18%",
      change: "+5% improvement",
      icon: TrendingUp,
      gradient: "gradient-warning"
    },
    {
      title: "Pending Follow-ups",
      value: "7",
      change: "3 due today",
      icon: Calendar,
      gradient: "gradient-primary"
    }
  ];

  const recentApplications = [
    {
      company: "Google",
      position: "Senior Frontend Developer",
      status: "interview",
      matchScore: 92,
      appliedDate: "2024-05-28"
    },
    {
      company: "Microsoft",
      position: "React Developer",
      status: "pending",
      matchScore: 88,
      appliedDate: "2024-05-26"
    },
    {
      company: "Netflix",
      position: "UI/UX Engineer",
      status: "rejected",
      matchScore: 76,
      appliedDate: "2024-05-24"
    },
    {
      company: "Meta",
      position: "Full Stack Developer",
      status: "offer",
      matchScore: 95,
      appliedDate: "2024-05-22"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "interview": return "bg-blue-100 text-blue-800";
      case "offer": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-3 h-3" />;
      case "interview": return <Target className="w-3 h-3" />;
      case "offer": return <CheckCircle className="w-3 h-3" />;
      case "rejected": return <XCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Job Tracker Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your applications and optimize your success rate
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Job
          </Button>
          <Button className="gradient-primary text-white border-0" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Upload CV
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg">
              <div className={`absolute inset-0 ${stat.gradient} opacity-10`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.gradient}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <Card className="lg:col-span-2 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Recent Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{app.company}</h4>
                      <Badge className={`${getStatusColor(app.status)} flex items-center gap-1`}>
                        {getStatusIcon(app.status)}
                        {app.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{app.position}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Match Score:</span>
                        <Progress value={app.matchScore} className="w-16 h-2" />
                        <span className="text-xs font-medium">{app.matchScore}%</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Applied: {app.appliedDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start gradient-primary text-white border-0" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add New Application
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Analyze CV Match
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Find Similar Jobs
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Application Timeline */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Application Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-blue-400"></div>
            <div className="space-y-6">
              {recentApplications.slice(0, 3).map((app, index) => (
                <div key={index} className="relative flex items-center gap-4">
                  <div className="relative z-10 w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Applied to {app.company}</p>
                    <p className="text-xs text-muted-foreground">{app.position} • {app.appliedDate}</p>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
