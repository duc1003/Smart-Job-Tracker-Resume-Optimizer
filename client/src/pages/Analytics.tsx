
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Calendar, Target, Briefcase, Clock } from "lucide-react";

const Analytics = () => {
  const applicationData = [
    { month: "Jan", applications: 12, interviews: 3, offers: 1 },
    { month: "Feb", applications: 15, interviews: 5, offers: 2 },
    { month: "Mar", applications: 8, interviews: 2, offers: 0 },
    { month: "Apr", applications: 20, interviews: 7, offers: 3 },
    { month: "May", applications: 18, interviews: 6, offers: 2 },
    { month: "Jun", applications: 22, interviews: 8, offers: 4 }
  ];

  const responseData = [
    { name: "Positive Response", value: 35, color: "#10b981" },
    { name: "No Response", value: 45, color: "#f59e0b" },
    { name: "Rejection", value: 20, color: "#ef4444" }
  ];

  const skillDemandData = [
    { skill: "React", demand: 85 },
    { skill: "TypeScript", demand: 78 },
    { skill: "Node.js", demand: 65 },
    { skill: "Python", demand: 72 },
    { skill: "AWS", demand: 68 },
    { skill: "Docker", demand: 58 }
  ];

  const stats = [
    {
      title: "Total Applications",
      value: "95",
      change: "+12%",
      icon: Briefcase,
      color: "text-blue-600"
    },
    {
      title: "Interview Rate",
      value: "32%",
      change: "+5%",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Offer Rate",
      value: "12.6%",
      change: "+3%",
      icon: Target,
      color: "text-purple-600"
    },
    {
      title: "Avg Response Time",
      value: "7 days",
      change: "-2 days",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your job search progress and insights
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change} vs last month</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Trends</CardTitle>
              <CardDescription>Monthly application activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={applicationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="interviews" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="offers" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Distribution</CardTitle>
              <CardDescription>Application response breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={responseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {responseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Skill Demand Analysis</CardTitle>
            <CardDescription>Most requested skills in job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillDemandData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="demand" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;
