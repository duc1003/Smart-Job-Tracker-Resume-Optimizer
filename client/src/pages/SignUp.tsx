import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Eye, EyeOff, UserPlus, Sparkles, Crown, Users } from "lucide-react";
import { authAPI } from "@/lib/api";
import "../styles/auth.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "job_seeker",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Redirect to sign in page with success message
      navigate("/signin", { 
        state: { 
          message: "Account created successfully! Please sign in." 
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = 
    formData.name.trim() && 
    formData.email.trim() && 
    formData.password.trim() && 
    formData.confirmPassword.trim() &&
    formData.password === formData.confirmPassword;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'recruiter': return <Users className="w-4 h-4" />;
      case 'admin': return <Crown className="w-4 h-4" />;
      default: return <UserPlus className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 right-1/4 text-white/10 animate-float">
          <UserPlus size={40} />
        </div>
        <div className="absolute top-3/4 left-1/4 text-white/10 animate-float animation-delay-1000">
          <Sparkles size={32} />
        </div>
        <div className="absolute top-1/2 right-1/6 text-white/10 animate-float animation-delay-2000">
          <Crown size={28} />
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Header section */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
            Join Smart Job Tracker
          </h1>
          <p className="text-emerald-100/80 text-lg">
            Start your career success journey today
          </p>
        </div>

        {/* Main card */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl animate-fade-in-up">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-white">Create Your Account</CardTitle>
            <CardDescription className="text-emerald-100/70">
              Join thousands of successful job seekers
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 px-6">
              {error && (
                <Alert className="bg-red-500/20 border-red-400/50 animate-shake">
                  <AlertDescription className="text-red-100">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2 group">
                <Label htmlFor="name" className="text-emerald-100 font-medium">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-emerald-400 transition-all duration-300 group-hover:border-white/50"
                />
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="email" className="text-emerald-100 font-medium">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-emerald-400 transition-all duration-300 group-hover:border-white/50"
                />
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="role" className="text-emerald-100 font-medium">I am a</Label>
                <Select value={formData.role} onValueChange={handleRoleChange} disabled={isLoading}>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white hover:bg-white/20 focus:border-emerald-400 transition-all duration-300 group-hover:border-white/50">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(formData.role)}
                      <SelectValue placeholder="Select your role" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="job_seeker" className="text-white hover:bg-gray-800">
                      <div className="flex items-center space-x-2">
                        <UserPlus className="w-4 h-4" />
                        <span>Job Seeker</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="recruiter" className="text-white hover:bg-gray-800">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Recruiter</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin" className="text-white hover:bg-gray-800">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4" />
                        <span>Admin</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="password" className="text-emerald-100 font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    disabled={isLoading}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-emerald-400 transition-all duration-300 pr-12 group-hover:border-white/50"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="confirmPassword" className="text-emerald-100 font-medium">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-emerald-400 transition-all duration-300 pr-12 group-hover:border-white/50"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white transition-colors duration-200"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="text-red-300 text-sm flex items-center space-x-2 animate-fade-in">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Passwords do not match</span>
                </div>
              )}

              {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="text-emerald-300 text-sm flex items-center space-x-2 animate-fade-in">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Passwords match perfectly!</span>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-6 px-6 pb-6">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create Account
                    <UserPlus className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </>
                )}
              </Button>

              <div className="text-center">
                <span className="text-emerald-100/70">Already have an account? </span>
                <Link
                  to="/signin"
                  className="text-emerald-200 hover:text-white font-semibold transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  Sign in here
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-emerald-100/60 text-sm animate-fade-in">
          © 2025 Smart Job Tracker. Your career, amplified.
        </div>
      </div>
    </div>
  );
};

export default SignUp;