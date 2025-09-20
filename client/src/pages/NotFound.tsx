import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, AlertTriangle, Sparkles } from "lucide-react";
import "../styles/auth.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

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
          <Search size={40} />
        </div>
        <div className="absolute top-3/4 right-1/4 text-white/10 animate-float animation-delay-1000">
          <Sparkles size={32} />
        </div>
        <div className="absolute top-1/2 right-1/6 text-white/10 animate-float animation-delay-2000">
          <AlertTriangle size={28} />
        </div>
      </div>

      <div className="relative z-10 max-w-lg w-full mx-4">
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl animate-fade-in-up">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            {/* 404 Animation */}
            <div className="relative mb-8">
              <div className="text-8xl font-bold text-white/20 animate-pulse">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce-in">
                  <AlertTriangle className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4 animate-fade-in">
              Oops! Page Not Found
            </h1>
            
            <p className="text-blue-100/70 text-lg mb-2 animate-fade-in">
              The page you're looking for seems to have vanished into the digital void.
            </p>
            
            <p className="text-blue-100/50 text-sm mb-8 animate-fade-in">
              Don't worry, let's get you back on track to your career success!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full animate-fade-in">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex-1"
              >
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-semibold py-3 rounded-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-200 flex-1"
              >
                <Link to="/applications">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Jobs
                </Link>
              </Button>
            </div>

            {/* Suggested routes */}
            <div className="mt-8 w-full animate-fade-in">
              <p className="text-blue-100/60 text-sm mb-4">Popular destinations:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { to: "/applications", label: "Job Applications" },
                  { to: "/cv-manager", label: "CV Manager" },
                  { to: "/ai-analysis", label: "AI Analysis" },
                  { to: "/analytics", label: "Analytics" }
                ].map((link, index) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs rounded-full transition-colors duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-100/60 text-sm animate-fade-in">
          <p>Lost? We've all been there. Let's find your way back! 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
