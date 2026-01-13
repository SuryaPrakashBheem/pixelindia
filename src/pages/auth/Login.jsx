import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>
      <button onClick={() => navigate("/dashboard")}>
        Login
      </button>
    </div>
  );
};

export default Login;
