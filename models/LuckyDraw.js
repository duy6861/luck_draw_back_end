// models/LuckyDraw.js
const mongoose = require('mongoose');

const luckyDrawSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  amount: { type: Number, required: true },
  ip: { type: String, required: true }, // ← vẫn lưu IP
  createdAt: { type: Date, default: Date.now }
});

// Unique index cho TÊN
luckyDrawSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('LuckyDraw', luckyDrawSchema);