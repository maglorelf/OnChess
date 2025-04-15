import React, { useState } from "react";

const UserProfile = ({ user }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Function to handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout");
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Badge styles for different user roles
  const roleBadges = {
    admin: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    premium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    normal: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  };

  return (
    <div className="user-profile p-4 rounded-lg border border-border dark:border-darkmode-border">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
          {user.username ? user.username.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <h4 className="font-medium">{user.username}</h4>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${roleBadges[user.role] || roleBadges.normal}`}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="user-details mb-4">
        <p className="text-sm mb-1">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        {user.role === "normal" && (
          <div className="mt-2">
            <a href="/pricing" className="text-sm text-primary hover:underline">
              Upgrade to Premium
            </a>
          </div>
        )}
      </div>
      
      <div className="border-t border-border dark:border-darkmode-border pt-4">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="btn btn-outline-primary btn-sm w-full"
        >
          {isLoggingOut ? "Signing Out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;