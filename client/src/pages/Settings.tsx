
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Shield, Key, Database, Trash2, Save, Crown, Users, Briefcase, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth";

const Settings = () => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  // Initialize form data with user information
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: "", // Add phone to user interface if needed
        bio: "", // Add bio to user interface if needed
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setMessage("");
    
    try {
      // Here you would typically call an API to update user profile
      // await userAPI.updateProfile(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage("Profile updated successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "recruiter":
        return {
          icon: <Crown className="w-4 h-4" />,
          label: "Recruiter",
          color: "bg-purple-100 text-purple-800 border-purple-200"
        };
      case "job_seeker":
        return {
          icon: <Briefcase className="w-4 h-4" />,
          label: "Job Seeker",
          color: "bg-blue-100 text-blue-800 border-blue-200"
        };
      case "admin":
        return {
          icon: <Shield className="w-4 h-4" />,
          label: "Administrator",
          color: "bg-red-100 text-red-800 border-red-200"
        };
      default:
        return {
          icon: <Users className="w-4 h-4" />,
          label: "User",
          color: "bg-gray-100 text-gray-800 border-gray-200"
        };
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isAuthenticated || !user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please sign in to access your settings.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Settings
            </h1>
            <Badge variant="outline" className={getRoleInfo(user.role).color}>
              {getRoleInfo(user.role).icon}
              <span className="ml-1">{getRoleInfo(user.role).label}</span>
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Manage your account and application preferences
          </p>
          {user && (
            <p className="text-sm text-muted-foreground mt-1">
              Signed in as <span className="font-medium">{user.email}</span>
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {message && (
                  <Alert className={messageType === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className={messageType === "success" ? "text-green-800" : "text-red-800"}>
                      {message}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline">Change Photo</Button>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                  <p className="text-xs text-muted-foreground">
                    This is your primary email for notifications and login.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Account Type</Label>
                  <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/30">
                    {getRoleInfo(user.role).icon}
                    <span className="font-medium">{getRoleInfo(user.role).label}</span>
                    <Badge variant="secondary" className="ml-auto">
                      Current Role
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Contact support to change your account type.
                  </p>
                </div>
                
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="gradient-primary text-white"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about job matches and applications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Job Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new jobs match your criteria
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Interview Reminders</p>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about upcoming interviews
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">AI Analysis Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Get notifications when new AI analysis is available
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Configuration
                </CardTitle>
                <CardDescription>
                  Configure external API keys for enhanced features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openaiKey">OpenAI API Key</Label>
                  <Input 
                    id="openaiKey" 
                    type="password" 
                    placeholder="sk-..." 
                    defaultValue="sk-proj-..."
                  />
                  <p className="text-sm text-muted-foreground">
                    Used for AI-powered CV analysis and job matching
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedinToken">LinkedIn API Token</Label>
                  <Input 
                    id="linkedinToken" 
                    type="password" 
                    placeholder="Enter LinkedIn API token"
                  />
                  <p className="text-sm text-muted-foreground">
                    Optional: For importing jobs from LinkedIn
                  </p>
                </div>
                
                <Button variant="outline">
                  Test Connection
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-semibold">
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">User Name</span>
                    <span className="font-mono text-xs">{user.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Account Type</span>
                    <Badge variant="outline" className={`text-xs ${getRoleInfo(user.role).color}`}>
                      {getRoleInfo(user.role).label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="text-xs">Dec 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full">
                  Two-Factor Auth
                </Button>
                <Button variant="outline" className="w-full">
                  Login History
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Export Data
                </Button>
                <Button variant="outline" className="w-full">
                  Import Data
                </Button>
                <Separator />
                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Analyses Used</span>
                  <span>47/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>CV Versions</span>
                  <span>4/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Storage Used</span>
                  <span>1.2GB/5GB</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
