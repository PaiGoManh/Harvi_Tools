import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
    <>
    <div className=" ">
        <div className="bg-blue-50 rounded-md shadow-xl flex flex-col items-center justify-center mx-5 my-5 py-5 outline-none  hover:outline-blue-500 outline-2">
            <h2 className="text-3xl mb-4 font-bold text-blue-600">
                {product.name}
            </h2>
            <p className="text-black my-2 mx-5">{product.description}</p>
    
        </div>
        </div>
        </>
    );
};

export default ProductCard;
