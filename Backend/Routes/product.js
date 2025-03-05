const express = require('express');
const path = require('path');
const fs = require('fs');
const Product = require('../Models/product'); 
const verifyAdmin = require('../Middleware/adminAuthMiddleware.js');
const multer = require('multer');
const router = express.Router();




//Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ message: 'No Products found.' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching seeds:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const { name, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    return res.status(400).json({ error: "Invalid file type" });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      image: req.file.filename,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

router.put("/:id",  upload.single("image"), async (req, res) => {
  const { id } = req.params; 
  const updatedData = { ...req.body }; 

  if (req.file) {
    updatedData.image = req.file.filename; 
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: updatedProduct });
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ success: false, message: 'Failed to update product', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
