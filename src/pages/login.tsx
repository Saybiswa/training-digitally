import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainframelogo from "../assets/Mainframe-logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if email ends with @lgindiabot.com
    const isValidDomain = email.endsWith("@lgindiabot.com");

    if (!isValidDomain) {
      setError("Only @lgindiabot.com email IDs are allowed");
      return;
    }

    // Example password validation (you can change this)
    if (password !== "1234") {
      setError("Invalid password");
      return;
    }

    // If everything is valid
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", email);
    navigate("/home");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        
        <img
          src={mainframelogo}
          alt="Mainframe Logo"
          style={styles.logo}
        />

        <h2 style={styles.title}>LG CIC Training Video Content</h2>
        <p style={styles.subtitle}>Sign in to continue</p>

        <form onSubmit={handleLogin} style={styles.form}>
          
          <input
            type="email"
            placeholder="Enter your LG Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <div style={styles.forgotContainer}>
            <span style={styles.forgot}>Forgot Password?</span>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #faf1ef, #e8dede)",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    width: "380px",
    padding: "45px",
    borderRadius: "20px",
    backdropFilter: "blur(15px)",
    background: "rgba(255, 255, 255, 0.15)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    textAlign: "center",
    color: "#121111",
  },
  logo: {
    width: "130px",
    marginBottom: "20px",
  },
  title: {
    marginBottom: "5px",
    fontSize: "26px",
    fontWeight: 600,
  },
  subtitle: {
    marginBottom: "25px",
    fontSize: "14px",
    opacity: 0.9,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.4)",
    background: "rgba(255,255,255,0.2)",
    color: "#171616",
    fontSize: "14px",
    outline: "none",
  },
  forgotContainer: {
    textAlign: "right",
  },
  forgot: {
    fontSize: "12px",
    cursor: "pointer",
    opacity: 0.85,
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
    color: "#121010",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "14px",
  },
  error: {
    color: "red",
    fontSize: "13px",
  },
};

export default Login;
