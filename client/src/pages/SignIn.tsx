import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff, Briefcase, Sparkles, ArrowRight } from "lucide-react";
import { authAPI } from "@/lib/api";
import "../styles/auth.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for success message from location state
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await authAPI.login(formData);

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Redirect to the page user was trying to access, or dashboard
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.email.trim() && formData.password.trim();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 text-white/10 animate-float">
          <Briefcase size={40} />
        </div>
        <div className="absolute top-3/4 right-1/4 text-white/10 animate-float animation-delay-1000">
          <Sparkles size={32} />
        </div>
        <div className="absolute top-1/2 left-1/6 text-white/10 animate-float animation-delay-2000">
          <ArrowRight size={28} />
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Header section */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            Smart Job Tracker
          </h1>
          <p className="text-blue-100/80 text-lg">
            Welcome back to your career journey
          </p>
        </div>

        {/* Main card */}
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl animate-fade-in-up">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-blue-100/70">
              Sign in to continue your success story
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 px-6">
              {successMessage && (
                <Alert className="bg-green-500/20 border-green-400/50 animate-fade-in">
                  <AlertDescription className="text-green-100">{successMessage}</AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="bg-red-500/20 border-red-400/50 animate-shake">
                  <AlertDescription className="text-red-100">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2 group">
                <Label htmlFor="email" className="text-blue-100 font-medium">Email address</Label>
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
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-blue-400 transition-all duration-300 group-hover:border-white/50"
                />
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="password" className="text-blue-100 font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-blue-400 transition-all duration-300 pr-12 group-hover:border-white/50"
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

              <div className="flex items-center justify-between pt-2">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-blue-200 hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-6 px-6 pb-6">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </Button>

              <div className="text-center">
                <span className="text-blue-100/70">Don't have an account? </span>
                <Link
                  to="/signup"
                  className="text-blue-200 hover:text-white font-semibold transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  Create one now
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-100/60 text-sm animate-fade-in">
          © 2025 Smart Job Tracker. Empowering your career success.
        </div>
      </div>
    </div>
  );
};

export default SignIn;