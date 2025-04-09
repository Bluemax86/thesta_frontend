import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        email,
        password,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Email already exists");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Management Sign Up</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#E8D5B5",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    margin: "50px auto",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "2px solid #6B705C",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#F28C38",
    color: "#2F2F2F",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: { color: "red" },
};

export default Signup;
