import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/Auth";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const validate = () => {
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      return "Enter a valid 10-digit mobile number";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(formData.mobile, formData.password)
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      // 🔹 Replace with real API
      const response = await login({
        "email": formData.mobile,
        "password": formData.password
      });

      // Example success flow
      if (response.status === 'Ok') {

        localStorage.setItem('token', response.access);
        localStorage.setItem('userId', response.userid);
        localStorage.setItem('userName',response.username);
        localStorage.setItem('name',response.first_name);
         localStorage.setItem('Mobile',response.Mobile);
          localStorage.setItem('GST',response.GST);
           localStorage.setItem('usertype',response.usertype);

        navigate("/");
      }
    } catch (err) {
      setError("Invalid mobile number or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          maxLength="10"
          value={formData.mobile}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f6fa",
  },
  form: {
    width: "100%",
    maxWidth: "360px",
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default Login;
