import { Link, useNavigate } from "react-router-dom";
import lgLogo from "../assets/lg-logo.png";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const username = localStorage.getItem("username");

  const [lastUpdate, setLastUpdate] = useState("");

  // Example: Fetch last update from localStorage or an API
  useEffect(() => {
    const update = localStorage.getItem("lastUpdate"); // Could also fetch from API
    if (update) {
      setLastUpdate(update);
    } else {
      const now = new Date().toLocaleString();
      setLastUpdate(now);
      localStorage.setItem("lastUpdate", now);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={lgLogo} alt="LG Logo" className="lg-logo" />
        </Link>

        {/* Right Section */}
        <div className="navbar-auth">
          {isAuthenticated && (
            <>
              <span className="user-name">
                Welcome {username}
              </span>

              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}

          {/* Last Update */}
          <span className="last-update">
            Last Update: {lastUpdate}
          </span>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;