import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-800 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Company Info */}
          <div className="md:w-1/3 ml-[1%]">
            <h3 className="text-lg font-serif text-yellow-500 mb-4">HARVI TOOLS</h3>
            {/* <img src="logo.png" alt="HARVI TOOLS Logo" className="w-20 h-20 mb-4" /> */}
            <p className="text-white text-[16px] leading-relaxed">
              Specialists in precision moulds and tools manufacturing. Delivering high-quality products tailored to meet your specific needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/3 text-gray-400">
            {/* <h4 className="text-lg font-serif text-yellow-500 mb-4  md:text-left">QUICK LINKS</h4> */}
            <ul className="space-y-2 text-[16px]  md:text-left">
              <li>
                <a href="/" className="text-white hover:text-yellow-500">About Us</a>
              </li>
              <li>
                <a href="/business" className="text-white hover:text-yellow-500">Our Services</a>
              </li>
              <li>
                <a href="/product" className="text-white hover:text-yellow-500">Products</a>
              </li>
              <li>
                <a href="/contact" className="text-white hover:text-yellow-500">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:w-1/3">
            <h4 className="text-lg font-serif text-yellow-500 mb-4">CONTACT US</h4>
            <p className="text-white text-[16px]">
              <span className="text-white font-medium">Address:</span> Adumancadu, Parasuvaikkal, Kerala 695508
            </p>
            <p className="text-[16px] mt-2">
              <span className="text-white font-medium">Phone:</span>{' '}
              <a href="tel:08078417696" className="text-white hover:text-yellow-500">
                +91-8078417696
              </a>
            </p>
            <p className="text-[16px] mt-2">
              <span className="text-white font-medium">Email:</span>{' '}
              <a href="mailto:harviplastics@gmail.com" className="text-white hover:text-yellow-500">
                harviplastics@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700  mt-12 my-6"></div>

        {/* Copyright */}
        <div className="text-yellow-500 text-center text-[15px]">
          <p>&copy; {new Date().getFullYear()} HARVI TOOLS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
