import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MessagePage = () => {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/messages');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('There was an error fetching the messages!', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/messages/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete message');
            }
            setMessages(messages.filter((message) => message._id !== id));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-black">
            <div className="w-full max-w-6xl">
                <motion.button
                    onClick={() => navigate('/dashboard')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white focus:ring-4 focus:ring-yellow-300 font-semibold rounded-full px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-105 mb-6"
                >
                    ← Back to Dashboard
                </motion.button>

                <motion.h1
                    className="text-3xl sm:text-4xl font-extrabold text-yellow-400 mb-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Messages
                </motion.h1>

                <motion.div
                    className="bg-black/60 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-yellow-400/20 p-6 sm:p-8"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-black/60 backdrop-blur-lg rounded-lg">
                            <thead className="bg-yellow-400/10 text-yellow-400 text-xs sm:text-sm">
                                <tr>
                                    <th className="py-2 px-4 sm:py-3 sm:px-6 text-left font-semibold">Name</th>
                                    <th className="py-2 px-4 sm:py-3 sm:px-6 text-left font-semibold">Email</th>
                                    <th className="py-2 px-4 sm:py-3 sm:px-6 text-left font-semibold">Phone Number</th>
                                    <th className="py-2 px-4 sm:py-3 sm:px-6 text-left font-semibold">Message</th>
                                    <th className="py-2 px-4 sm:py-3 sm:px-6 text-left font-semibold">Sent At</th>
                                    {/* <th className="py-2 px-4 sm:py-3 sm:px-6 text-left font-semibold">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {messages.length > 0 ? (
                                    messages.map((message, index) => (
                                        <motion.tr
                                            key={message._id}
                                            className="hover:bg-yellow-400/20 text-xs sm:text-sm"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <td className="py-3 px-4 sm:py-4 sm:px-6 text-gray-300">{message.name}</td>
                                            <td className="py-3 px-4 sm:py-4 sm:px-6 text-gray-300">{message.email}</td>
                                            <td className="py-3 px-4 sm:py-4 sm:px-6 text-gray-300">{message.phoneNumber}</td>
                                            <td className="py-3 px-4 sm:py-4 sm:px-6 text-gray-300">{message.message}</td>
                                            <td className="py-3 px-4 sm:py-4 sm:px-6 text-gray-300">{new Date(message.createdAt).toLocaleString()}</td>
                                            <td className="py-3 px-4 sm:py-4 sm:px-6 text-gray-300">
                                                {/* <button
                                                    onClick={() => handleDelete(message._id)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                >
                                                    Delete
                                                </button> */}
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-4 px-6 text-center text-gray-500 text-sm">
                                            No messages available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MessagePage;