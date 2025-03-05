const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: false, trim: true },
}, { timestamps: true }); // Optionally, add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Facility', FacilitySchema);
