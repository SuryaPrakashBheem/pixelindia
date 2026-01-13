import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      <button onClick={() => navigate("/login")}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
