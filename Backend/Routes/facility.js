const express = require('express');
const path = require('path');
const fs = require('fs');
const Facility = require('../Models/facilities.js'); 
const verifyAdmin = require('../Middleware/adminAuthMiddleware.js');
const multer = require('multer');
const router = express.Router();

// Multer Storage Configuration for Facility Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });
  

// Get all facilities
router.get('/', async (req, res) => {
  try {
    const facility = await Facility.find();
    if (facility.length === 0) {
      return res.status(404).json({ message: 'No facility found.' });
    }
    res.status(200).json(facility);
  } catch (error) {
    console.error('Error fetching facilities:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Add a new facility with an image upload
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
    const newFacility = new Facility({
      name,
      description,
      image: req.file.filename,
    });

    await newFacility.save();
    res.status(201).json(newFacility);
  } catch (error) {
    res.status(500).json({ error: "Failed to add Facility" });
  }
});

// Update facility with an image upload
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params; 
  const updatedData = { ...req.body }; 

  if (req.file) {
    updatedData.image = req.file.filename; 
  }

  try {
    const updatedFacility = await Facility.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedFacility) {
      return res.status(404).json({ success: false, message: 'Facility not found' });
    }

    res.json({ success: true, data: updatedFacility });
  } catch (err) {
    console.error("Error updating Facility:", err.message);
    res.status(500).json({ success: false, message: 'Failed to update Facility', error: err.message });
  }
});

// Delete facility
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFacility = await Facility.findByIdAndDelete(id);

    if (!deletedFacility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    res.json({ message: 'Facility deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Facility' });
  }
});

module.exports = router;
