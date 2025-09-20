import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, LogOut, CheckCircle, Sparkles } from "lucide-react";
import { authUtils } from "@/lib/auth";
import "../styles/auth.css";

const SignOut = () => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Use the improved auth utils for logout
    const performLogout = async () => {
      try {
        // Use the auth utils signOut function which now includes axios integration
        await authUtils.signOut();
        
        // Show completion animation
        setTimeout(() => {
          setIsCompleted(true);
        }, 1500);
        
        // Navigate to sign in after completion
        setTimeout(() => {
          navigate("/signin", { 
            state: { 
              message: "You have been signed out successfully." 
            }
          });
        }, 3000);
      } catch (error) {
        console.error("Error during logout:", error);
        // Still redirect even if there's an error
        setTimeout(() => {
          navigate("/signin", { 
            state: { 
              message: "You have been signed out successfully." 
            }
          });
        }, 2000);
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-pink-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 text-white/10 animate-float">
          <LogOut size={40} />
        </div>
        <div className="absolute top-3/4 right-1/4 text-white/10 animate-float animation-delay-1000">
          <Sparkles size={32} />
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl animate-fade-in-up">
          <CardContent className="flex flex-col items-center justify-center p-12">
            {!isCompleted ? (
              <>
                {/* Loading state */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    <LogOut className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -inset-2 border-4 border-white/30 rounded-full animate-spin border-t-transparent"></div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                  Signing you out...
                </h2>
                <p className="text-orange-100/70 text-center mb-6">
                  We're securely clearing your session and logging you out.
                </p>
                
                <div className="flex items-center space-x-2 text-orange-200">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm">Almost done...</span>
                </div>
              </>
            ) : (
              <>
                {/* Completion state */}
                <div className="relative mb-8 animate-fade-in">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -inset-3 border-4 border-green-400/50 rounded-full animate-ping"></div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 text-center animate-fade-in">
                  Successfully signed out!
                </h2>
                <p className="text-green-100/70 text-center mb-6 animate-fade-in">
                  Your session has been securely ended. Thank you for using Smart Job Tracker!
                </p>
                
                <div className="flex items-center space-x-2 text-green-200 animate-fade-in">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm">Redirecting to sign in...</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-orange-100/60 text-sm animate-fade-in">
          © 2025 Smart Job Tracker. See you again soon!
        </div>
      </div>
    </div>
  );
};

export default SignOut;