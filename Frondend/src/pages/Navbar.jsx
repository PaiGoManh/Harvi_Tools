import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "@fortawesome/fontawesome-free/css/all.min.css";
import img1 from "../assets/images/logo.jpeg";
import "./Navbar.css";

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("adminToken");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/validate-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        setShowPopup(false);
        setIsAdmin(true);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    Cookies.remove("adminToken");
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-black text-white fixed w-full top-0 z-50 shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center space-x-4">
            <img src={img1} alt="Logo" className="h-16 w-auto shadow-lg rounded-full" />
            <div className="text-2xl font-bold tracking-wide">
              <span className="text-white">HARVI</span>
              <span className="text-yellow-500 ml-2">TOOLS</span>
              <p className="text-sm text-gray-300 font-medium">SINCE 2019</p>
            </div>
          </div>

          {/* Hamburger Icon */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <a href="/" className="text-sm font-bold hover:text-yellow-500">ABOUT</a>
            <a href="/product" className="text-sm font-bold hover:text-yellow-500">PRODUCTS</a>
            <a href="/business" className="text-sm font-bold hover:text-yellow-500">SERVICES</a>
            <a href="/facilities" className="text-sm font-bold hover:text-yellow-500">FACILITIES</a>
            <a href="/contact" className="text-sm font-bold hover:text-yellow-500">CONTACT</a>
            {isAdmin ? (
              <>
                <a href="/dashboard" className="text-sm font-bold hover:text-green-500">DASHBOARD</a>
                <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:text-red-700">LOGOUT</button>
              </>
            ) : (
              <button onClick={() => setShowPopup(true)} className="text-sm font-bold hover:text-yellow-500">DASHBOARD</button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col items-center space-y-4 py-4 px-6 bg-black">
            <a href="/" className="text-sm font-bold hover:text-yellow-500">ABOUT</a>
            <a href="/product" className="text-sm font-bold hover:text-yellow-500">PRODUCTS</a>
            <a href="/business" className="text-sm font-bold hover:text-yellow-500">SERVICES</a>
            <a href="/facilities" className="text-sm font-bold hover:text-yellow-500">FACILITIES</a>
            <a href="/contact" className="text-sm font-bold hover:text-yellow-500">CONTACT</a>
            {isAdmin ? (
              <>
                <a href="/dashboard" className="text-sm font-bold hover:text-green-500">DASHBOARD</a>
                <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:text-red-700">LOGOUT</button>
              </>
            ) : (
              <button onClick={() => setShowPopup(true)} className="text-sm font-bold hover:text-yellow-500">DASHBOARD</button>
            )}
          </div>
        )}
      </nav>

      <div className="pt-20"></div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-80 relative">
            <h2 className="text-lg font-bold mb-4">Enter Admin Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                placeholder="Password"
                required
              />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => { setShowPopup(false); setError(""); setPassword(""); }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors shadow-md font-semibold">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

