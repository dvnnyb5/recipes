import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signInWithEmailPassword } from "../../firebase/firebase";

import "../../styles/login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailPassword(email, password);
      history.push("/home");
    } catch (error) {
      setError("Failed to sign in. Please check your credentials.");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="email-wrapper">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="password-wrapper">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
      </div>
    </div>
  );
};

export default Login;
