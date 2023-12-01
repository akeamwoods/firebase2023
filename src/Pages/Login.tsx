import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRedirectLoggedInUser } from "../hooks/useRedirectLoggedInUser";
import { useAuth } from "../AuthContext";
import { useLogin } from "../hooks/useLogin";

const Login: React.FC = () => {
  const { loading } = useAuth();
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useRedirectLoggedInUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error: Error) => {
          console.log(error);
        },
      }
    );
  };

  if (loading || loginMutation.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Login</h1>
      {loginMutation.isError && (
        <p style={{ color: "red" }}>{(loginMutation.error as Error).message}</p>
      )}
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
