import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div>No reservation data</div>;

  return (
    <div style={styles.container}>
      <h2>Booking Confirmation</h2>
      <p>Reservation ID: {state.reservation_id}</p>
      <p>Customer: {state.customer}</p>
      <p>Product: {state.product_name}</p>
      <p>Check-In: {state.check_in_date}</p>
      <p>Check-Out: {state.check_out_date}</p>
      <p>Total Cost: ${state.total_cost}</p>
      <button onClick={() => navigate("/")} style={styles.button}>
        Back to Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#E8D5B5",
    padding: "30px",
    borderRadius: "10px",
    width: "500px",
    margin: "50px auto",
  },
  button: {
    backgroundColor: "#F28C38",
    color: "#2F2F2F",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Confirmation;
