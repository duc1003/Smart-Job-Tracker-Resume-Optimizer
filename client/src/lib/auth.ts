// Authentication utility functions
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const authUtils = {
  // Get stored token
  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  // Get stored user data
  getUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = authUtils.getToken();
    const user = authUtils.getUser();
    return !!(token && user);
  },

  // Store authentication data
  setAuth: (token: string, user: User): void => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  // Clear authentication data
  clearAuth: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Get authorization header for API calls
  getAuthHeader: (): { Authorization: string } | Record<string, never> => {
    const token = authUtils.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // Sign out function that can be called from anywhere
  signOut: async (navigate?: (path: string, options?: unknown) => void): Promise<void> => {
    try {
      // Optional: Call logout API endpoint
      // const { authAPI } = await import('./api');
      // await authAPI.logout();
    } catch (error) {
      console.error("Error during API logout:", error);
    } finally {
      authUtils.clearAuth();
      
      if (navigate) {
        navigate("/signin", {
          state: {
            message: "You have been signed out successfully."
          }
        });
      } else {
        // Fallback to window.location if navigate is not available
        window.location.href = "/signin";
      }
    }
  }
};

// Hook for authentication state
export const useAuth = () => {
  const isAuthenticated = authUtils.isAuthenticated();
  const user = authUtils.getUser();
  const token = authUtils.getToken();

  return {
    isAuthenticated,
    user,
    token,
    signOut: authUtils.signOut,
    setAuth: authUtils.setAuth,
    clearAuth: authUtils.clearAuth,
    getAuthHeader: authUtils.getAuthHeader,
  };
};