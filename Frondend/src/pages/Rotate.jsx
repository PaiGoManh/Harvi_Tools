import React, { useState, useRef } from "react";
import img1 from "../assets/images/PlasticMould1.jpg";
import img2 from "../assets/images/PlasticMould2.jpg";
import img3 from "../assets/images/PressTool1.jpeg";
import img4 from "../assets/images/PressTool2.jpg";
import img5 from "../assets/images/Lathe_Work.jpeg";
import img6 from "../assets/images/face-grooving.jpg";
import img7 from "../assets/images/Millingwork.jpg";
import img8 from "../assets/images/BoringWork.jpg";

const Rotate = () => {
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef(null);
  
  const products = [ img5,img2, img6, img3, img7, img1, img8, img4];

  return (
    <div className="relative overflow-hidden bg-gray-100 py-10 text-center">
      <h2 className="text-4xl font-bold text-gray-500 mb-8">Services</h2>

      {/* Scrollable Image Container */}
      <div
        ref={scrollRef}
        className="flex w-max gap-8 animate-scroll overflow-x-auto whitespace-nowrap scrollbar-hide"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {products.concat(products).map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Product ${index + 1}`}
            className="h-64 w-64 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-110 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default Rotate;

