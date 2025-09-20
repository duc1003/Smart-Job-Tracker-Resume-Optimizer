
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, MapPin, Building2, DollarSign, Clock, ExternalLink, Heart, Bookmark } from "lucide-react";

const JobMatcher = () => {
  const matchedJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$140,000 - $180,000",
      matchScore: 95,
      postedDate: "2 days ago",
      type: "Full-time",
      remote: true,
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      description: "We're looking for a senior React developer to lead our frontend team..."
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$120,000 - $160,000",
      matchScore: 88,
      postedDate: "1 week ago",
      type: "Full-time",
      remote: true,
      skills: ["React", "Python", "PostgreSQL", "Docker"],
      description: "Join our fast-growing startup as a full stack engineer..."
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Design Studio",
      location: "New York, NY",
      salary: "$100,000 - $130,000",
      matchScore: 82,
      postedDate: "3 days ago",
      type: "Full-time",
      remote: false,
      skills: ["React", "JavaScript", "CSS", "Figma"],
      description: "Create beautiful user interfaces for our design-focused projects..."
    },
    {
      id: 4,
      title: "React Native Developer",
      company: "Mobile First",
      location: "Austin, TX",
      salary: "$110,000 - $140,000",
      matchScore: 78,
      postedDate: "5 days ago",
      type: "Contract",
      remote: true,
      skills: ["React Native", "JavaScript", "iOS", "Android"],
      description: "Build cross-platform mobile applications using React Native..."
    }
  ];

  const getMatchColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Job Matcher
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered job recommendations based on your profile
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Jobs</CardTitle>
            <CardDescription>Find jobs that match your skills and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Job title or keywords" className="pl-10" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Location" className="pl-10" />
              </div>
              <Button className="gradient-primary text-white">
                <Search className="w-4 h-4 mr-2" />
                Search Jobs
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recommended Jobs ({matchedJobs.length})</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Most Relevant</Button>
              <Button variant="outline" size="sm">Newest</Button>
              <Button variant="outline" size="sm">Highest Pay</Button>
            </div>
          </div>

          {matchedJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <Badge className={`${getMatchColor(job.matchScore)} text-white`}>
                        {job.matchScore}% Match
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                        {job.remote && <Badge variant="outline">Remote</Badge>}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.postedDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Match Score</span>
                      <span>{job.matchScore}%</span>
                    </div>
                    <Progress value={job.matchScore} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex gap-2">
                    <Button className="gradient-primary text-white">
                      Apply Now
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default JobMatcher;
