import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Animation variants for the product cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  // Animation variants for the page title
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-8">
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl font-bold uppercase mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Explore Our Products
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our premium collection of tools and accessories
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No products available</p>
            <p className="text-gray-500 mt-2">Please check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  className="group bg-gray-900 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <div className="relative h-60 overflow-hidden">
                    {product.image ? (
                      <img
                        src={`/api/uploads/${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  </div>

                  <div className="p-4">
                    <h2 className="text-xl font-bold text-white mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-300 text-sm">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;