import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Username validation
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters (letters or digits)");
      return;
    }

    try {
      const data = await loginUser(username, password);

      login({
        username: data.username,
        token: data.token,
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Login failed ❌ Check credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🔐 Login</h2>

        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            placeholder="Username (e.g. john123)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            style={styles.input}
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} type="submit">
            Login
          </button>

          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
  },
  card: {
    padding: 30,
    background: "#1e293b",
    borderRadius: 12,
    width: 320,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "8px 0",
    borderRadius: 6,
    border: "none",
  },
  button: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
};