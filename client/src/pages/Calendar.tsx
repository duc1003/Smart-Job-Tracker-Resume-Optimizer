
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin, Video, Phone, Plus, Users } from "lucide-react";

const Calendar = () => {
  const upcomingInterviews = [
    {
      id: 1,
      company: "Google",
      position: "Senior Frontend Developer",
      date: "2024-06-05",
      time: "10:00 AM",
      duration: "1 hour",
      type: "Video Call",
      interviewer: "Sarah Johnson",
      location: "Google Meet",
      status: "confirmed"
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Full Stack Developer",
      date: "2024-06-07",
      time: "2:00 PM",
      duration: "45 minutes",
      type: "Phone Call",
      interviewer: "Mike Chen",
      location: "Phone Interview",
      status: "pending"
    },
    {
      id: 3,
      company: "Meta",
      position: "React Developer",
      date: "2024-06-10",
      time: "11:30 AM",
      duration: "1.5 hours",
      type: "On-site",
      interviewer: "Lisa Wang",
      location: "Meta HQ, Menlo Park",
      status: "confirmed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video Call":
        return <Video className="w-4 h-4" />;
      case "Phone Call":
        return <Phone className="w-4 h-4" />;
      case "On-site":
        return <MapPin className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Interview Calendar
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your interview schedule and appointments
            </p>
          </div>
          <Button className="gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Upcoming Interviews</h2>
            {upcomingInterviews.map((interview) => (
              <Card key={interview.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{interview.company}</CardTitle>
                      <CardDescription className="font-medium text-foreground">
                        {interview.position}
                      </CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(interview.status)} text-white`}>
                      {interview.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarIcon className="w-4 h-4" />
                        {interview.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {interview.time} ({interview.duration})
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {getTypeIcon(interview.type)}
                        {interview.location}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {interview.interviewer}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Join Meeting
                        </Button>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Week</span>
                  <span className="font-semibold">3 interviews</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-semibold">8 interviews</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="font-semibold text-green-600">75%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Research the company thoroughly</li>
                  <li>• Prepare STAR method examples</li>
                  <li>• Test your tech setup beforehand</li>
                  <li>• Prepare thoughtful questions</li>
                  <li>• Follow up within 24 hours</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
