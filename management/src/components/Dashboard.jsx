import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard`,
          {
            withCredentials: true,
          }
        );
        console.log("Response", response);
        setData(response.data);
      } catch (err) {
        navigate(err.response?.data?.error || "/login");
      }
    };
    fetchData();
  }, [navigate]);

  if (!data) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2>Management Dashboard</h2>
      <div style={styles.metrics}>
        <p>Total Reservations: {data.total_reservations}</p>
        <p>Total Revenue: ${data.total_revenue.toFixed(2)}</p>
        <h3>Revenue by Type</h3>
        <ul>
          {data.revenue_by_type.map((item, index) => (
            <li key={index}>
              {item.type}: ${item.revenue.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <h3>Reservations</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {data.reservations.map((reservation) => (
            <tr key={reservation.reservation_id}>
              <td>{reservation.reservation_id}</td>
              <td>{reservation.customer}</td>
              <td>{reservation.product_name}</td>
              <td>{reservation.check_in_date}</td>
              <td>{reservation.check_out_date}</td>
              <td>${reservation.total_cost.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "20px auto",
    backgroundColor: "#E8D5B5",
    padding: "20px",
    borderRadius: "10px",
  },
  metrics: { marginBottom: "20px" },
  table: { width: "100%", borderCollapse: "collapse" },
  // eslint-disable-next-line no-dupe-keys
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#D3CBBE",
  }, // Merged
  "table th, table td": {
    border: "1px solid #6B705C",
    padding: "10px",
    textAlign: "left",
  },
  "table th": { backgroundColor: "#3A6EA5", color: "#E8D5B5" },
};

export default Dashboard;
