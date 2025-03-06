import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNUmber] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = { email, name, message, phoneNumber };

    try {
      const response = await fetch("https://harvitools-tp53.onrender.com/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Thank you! Your message has been sent.");
        setEmail("");
        setName("");
        setMessage("");
        setPhoneNUmber(false);
      } else {
        setSuccessMessage(`Error: ${data.error || "Failed to send message"}`);
      }
    } catch (error) {
      setSuccessMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-white"
      style={{
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[90%] max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-black/60 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="col-span-1 p-8 md:p-12"
        >
          <h1 className="text-3xl font-bold mb-8 text-yellow-400">GET IN TOUCH</h1>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-green-100/90 text-green-800 rounded-md"
            >
              {successMessage}
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border-b-2 border-gray-300/50 text-white py-2 px-1 focus:outline-none focus:border-yellow-400 transition-colors placeholder-gray-300"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <input
                type="email"
                placeholder="Enter a valid email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b-2 border-gray-300/50 text-white py-2 px-1 focus:outline-none focus:border-yellow-400 transition-colors placeholder-gray-300"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <input
                type="number"
                placeholder="Enter your Mobile Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNUmber(e.target.value)}
                required
                className="w-full bg-transparent border-b-2 border-gray-300/50 text-white py-2 px-1 focus:outline-none focus:border-yellow-400 transition-colors placeholder-gray-300"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <textarea
                placeholder="Enter your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-transparent border-b-2 border-gray-300/50 text-white py-2 px-1 focus:outline-none focus:border-yellow-400 transition-colors placeholder-gray-300 resize-none"
                rows="4"
              ></textarea>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-yellow-400/90 hover:bg-yellow-400 text-gray-900 font-bold py-3 rounded-md shadow-lg transition-all"
            >
              <i className="fas fa-paper-plane mr-2"></i> Submit
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="col-span-1 p-8 md:p-12 bg-black/40 backdrop-blur-"
        >
          <h1 className="text-3xl font-bold mb-8 text-yellow-400">LOCATE US</h1>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206898.79208929816!2d77.03091305723868!3d8.253249228746848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05ad60665b92b1%3A0x533652f13fa22670!2sHARVI%20TOOLS!5e0!3m2!1sen!2sin!4v1737357037140!5m2!1sen!2sin"
              width="100%"
              height="250"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-8 space-y-4 text-gray-200">
            <div>
              <p className="text-lg font-semibold mb-2 text-yellow-400">Business Hours</p>
              <p className="text-sm">Mon-Fri: 10 am - 8 pm</p>
              <p className="text-sm">Sat, Sun: Closed</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2 text-yellow-400">Contact Info</p>
              <p className="text-sm">📞 +91 8078417696</p>
              <p className="text-sm">✉️ info@harvitools.com</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;

