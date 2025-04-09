import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Chatbox from "./components/chatbox.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Confirmation from "./components/confirmation.jsx";
import axios from "axios";

const App = () => {
  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/logout`);
    window.location.href = "/";
  };

  return (
    <Router>
      <div style={styles.header}>
        <h1 style={styles.title}>Thesta Eco-Resort</h1>
        <div style={styles.authLinks}>
          <Link to="/login" style={styles.link}>
            Login
          </Link>
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Chatbox />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
};

const styles = {
  header: {
    backgroundColor: "#3A6EA5",
    padding: "20px",
    textAlign: "center",
    position: "relative",
  },
  title: { color: "#E8D5B5" },
  authLinks: { position: "absolute", top: "20px", right: "20px" },
  link: {
    color: "#F28C38",
    textDecoration: "none",
    marginLeft: "10px",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#F28C38",
    cursor: "pointer",
    marginLeft: "10px",
    fontWeight: "bold",
  },
};

export default App;
