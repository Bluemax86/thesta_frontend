import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chatbox = () => {
  const [inquiry, setInquiry] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat`,
        {
          inquiry,
        }
      );
      setResults(response.data.results);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleBook = async (result) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/book`,
        {
          product_id: result.product_id,
          check_in_date: result.check_in_date,
          nights: result.nights,
          total_cost: result.total_cost,
        }
      );
      navigate("/confirmation", { state: response.data });
    } catch (err) {
      console.error("Error booking:", err);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="E.g., Book a cabin for 2 nights starting April 10"
          value={inquiry}
          onChange={(e) => setInquiry(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>
      {results.length > 0 && (
        <div style={styles.results}>
          {results.map((result, index) => (
            <div key={index} style={styles.resultCard}>
              <img
                src={result.image_url}
                alt={result.product_name}
                style={styles.image}
              />
              <div>
                <h3>{result.product_name}</h3>
                <p>Type: {result.description}</p>
                <p>Check-in: {result.check_in_date}</p>
                <p>Nights: {result.nights}</p>
                <p>Total Cost: ${result.total_cost}</p>
              </div>
              <button
                onClick={() => handleBook(result)}
                style={styles.bookButton}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    backgroundColor: "#3A6EA5",
    padding: "15px",
    borderRadius: "10px",
  },
  form: { display: "flex", gap: "10px" },
  input: {
    flexGrow: 1,
    padding: "10px",
    border: "2px solid #6B705C",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#F28C38",
    color: "#2F2F2F",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  results: { marginTop: "20px" },
  resultCard: {
    backgroundColor: "#E8D5B5",
    border: "1px solid #6B705C",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    display: "flex",
    gap: "20px",
  },
  image: {
    width: "150px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  bookButton: {
    backgroundColor: "#F28C38",
    color: "#2F2F2F",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Chatbox;
