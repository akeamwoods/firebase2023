import React from "react";
import { useAuth } from "../AuthContext";
import { useLogout } from "../hooks/useLogout";

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const logout = useLogout();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {currentUser ? (
        <div>
          <p>Welcome, {currentUser.email}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>No user is currently logged in.</p>
      )}
    </div>
  );
};

export default Home;
