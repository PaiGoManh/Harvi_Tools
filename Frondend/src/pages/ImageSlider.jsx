import React, { useState, useEffect } from 'react';
import img1 from '../assets/images/aaaa.jpg';
import img2 from '../assets/images/about.jpg';
import img3 from '../assets/images/pic.jpeg'; 
import img4 from '../assets/images/Mechanical.jpg'; 
import img5 from '../assets/images/Image105.jpeg'; 

const images = [img1, img2, img3, img4, img5]; // List of images to rotate

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
      <div className="w-80 h-80 rounded-full overflow-hidden relative shadow-lg ">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={`absolute w-full h-full object-cover rounded-full transition-all duration-1000 ease-in-out 
              ${index === currentImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-95'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
