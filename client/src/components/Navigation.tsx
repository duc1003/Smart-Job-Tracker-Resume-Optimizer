import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { LogOut, User, Briefcase, Sparkles } from "lucide-react";
import "../styles/auth.css";

const Navigation = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(navigate);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/20 px-4 py-3 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-3 text-xl font-bold text-white hover:text-purple-200 transition-colors duration-300 group"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Smart Job Tracker
          </span>
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-fade-in">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-white">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-purple-200 capitalize">{user?.role}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="bg-red-500/20 border-red-400/50 text-red-100 hover:bg-red-500/30 hover:border-red-400 transition-all duration-300 hover:scale-105 flex items-center space-x-2 backdrop-blur-sm"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </>
          ) : (
            <div className="flex space-x-3 animate-slide-in-right">
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button 
                size="sm" 
                asChild
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;