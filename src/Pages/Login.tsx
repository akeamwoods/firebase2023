import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useRedirectLoggedInUser } from "../hooks/useRedirectLoggedInUser";
import { useAuth } from "../AuthContext";

const Login: React.FC = () => {
  const { loading } = useAuth();
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useRedirectLoggedInUser(); // Redirects logged-in users away from the login page

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      // On successful login, redirect or do something else
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Handle errors like wrong password, user not found, etc.
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Or any loading spinner component
  }

  if (!auth) {
    return (
      <div>Error: Firebase is not initialized. Check your configuration.</div>
    );
  }
  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
