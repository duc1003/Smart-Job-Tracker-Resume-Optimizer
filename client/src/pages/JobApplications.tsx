
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Building2, Calendar, MapPin, DollarSign, ExternalLink } from "lucide-react";

const JobApplications = () => {
  const applications = [
    {
      id: 1,
      company: "Google",
      position: "Senior Frontend Developer",
      location: "Remote",
      salary: "$120,000 - $160,000",
      status: "Interview Scheduled",
      appliedDate: "2024-01-15",
      progress: 75,
      statusColor: "bg-blue-500"
    },
    {
      id: 2,
      company: "Meta",
      position: "React Developer",
      location: "San Francisco, CA",
      salary: "$110,000 - $140,000",
      status: "Application Sent",
      appliedDate: "2024-01-12",
      progress: 25,
      statusColor: "bg-yellow-500"
    },
    {
      id: 3,
      company: "Microsoft",
      position: "Full Stack Developer",
      location: "Seattle, WA",
      salary: "$130,000 - $170,000",
      status: "Offer Received",
      appliedDate: "2024-01-08",
      progress: 100,
      statusColor: "bg-green-500"
    },
    {
      id: 4,
      company: "Amazon",
      position: "Software Engineer",
      location: "Austin, TX",
      salary: "$125,000 - $155,000",
      status: "Rejected",
      appliedDate: "2024-01-05",
      progress: 100,
      statusColor: "bg-red-500"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Job Applications
            </h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your job applications
            </p>
          </div>
          <Button className="gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        </div>

        <div className="grid gap-6">
          {applications.map((app) => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      {app.company}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold text-foreground mt-1">
                      {app.position}
                    </CardDescription>
                  </div>
                  <Badge 
                    className={`${app.statusColor} text-white`}
                  >
                    {app.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {app.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    {app.salary}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Applied: {app.appliedDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Application Progress</span>
                    <span>{app.progress}%</span>
                  </div>
                  <Progress value={app.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default JobApplications;
