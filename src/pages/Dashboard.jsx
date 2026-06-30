import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>📊 Dashboard</h1>


        <p>👤 User: {user?.username}</p>
        <p>🔑 Token: {user?.token}</p>
        <p>👋 Welcome, {user?.username}</p>

        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
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
  },
  button: {
    marginTop: 15,
    padding: 10,
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 6,
  },
};