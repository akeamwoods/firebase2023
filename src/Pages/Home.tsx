import React from "react";
import { useAuth } from "../AuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const logout = useLogout();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {currentUser ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p>Welcome, {currentUser.email}!</p>
          <Link to="/products">Products</Link>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>No user is currently logged in.</p>
      )}
    </div>
  );
};

export default Home;
