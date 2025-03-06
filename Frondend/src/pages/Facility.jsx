import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../assets/images/CreactProduct.gif";
import { motion } from "framer-motion";

const FacilityAddPage = () => {
  const [formData, setFormData] = useState({ name: "", description: "", image: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    fetch("https://harvitools-tp53.onrender.com/facility", {
      method: "POST",
      headers: {
        "x-admin-password": "harvi_tools",
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("Facility added:", data);
        navigate("/facility-view");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-700 via-black to-gray-800 py-16 px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.button
        onClick={() => navigate("/dashboard")}
        className="text-white focus:ring-4 focus:ring-yellow-300 font-semibold rounded-full px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-105"
        whileTap={{ scale: 0.9 }}
      >
        ← Back to Dashboard
      </motion.button>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        {/* GIF Section */}
        <motion.div
          className="md:w-1/2 mb-12 md:mb-0 flex justify-center relative"
          whileHover={{ scale: 1.1, rotate: 3 }}
        >
          <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-yellow-500/30 p-1 backdrop-blur-sm">
            <img 
              src={Product}
              alt="Product Animation" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </motion.div>

        {/* Glass Form Container */}
        <motion.div
          className="md:w-1/2 relative"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-container bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-bold uppercase mb-6 tracking-wide text-yellow-400">
              Add New Facility
            </h1>
            
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <label className="block text-gray-300 font-semibold mb-3 text-lg">Facility Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/40 border-2 border-white/10 rounded-xl p-4 text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 placeholder-gray-400"
                  placeholder="Enter product name"
                />
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <label className="block text-gray-300 font-semibold mb-3 text-lg">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-black/40 border-2 border-white/10 rounded-xl p-4 text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 h-32 placeholder-gray-400"
                  placeholder="Describe your product..."
                ></textarea>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <label className="block text-gray-300 font-semibold mb-3 text-lg">Product Image</label>
                <div className="relative bg-black/40 border-2 border-white/10 rounded-xl p-4 transition-colors hover:border-yellow-500/50">
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-gray-400">
                    <span className="text-yellow-400">Click to upload</span> or drag and drop
                  </div>
                </div>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20"
                whileTap={{ scale: 0.95 }}
              >
                Create Facility
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FacilityAddPage;

