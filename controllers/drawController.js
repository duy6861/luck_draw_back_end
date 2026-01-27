// controllers/drawController.js
const LuckyDraw = require('../models/LuckyDraw');
const { generateAmount } = require('../utils/generateAmount');
const { getCustomMessage } = require('../utils/customMessages'); // ← thêm dòng này

const drawController = {
  draw: async (req, res) => {
    try {
      const name = req.normalizedName; // dạng lowercase
      const originalName = req.body.name.trim(); // tên gốc
      const ip = req.clientIp;

      // 👇 Truyền originalName để detect "Nhung"
      const amount = generateAmount(originalName);

      const newDraw = new LuckyDraw({ name, amount, ip });
      await newDraw.save();

      const customMessage = getCustomMessage(originalName);
      const message = customMessage || 'Chúc mừng! Bạn đã nhận được lì xì may mắn!';

      res.json({
        success: true,
        name: originalName,
        amount: newDraw.amount,
        message
      });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern?.name) {
        return res.status(400).json({
          error: 'Tên này đã được dùng để bốc lì xì rồi!'// Xử lý lỗi trùng tên
        });
      }
      console.error('Lỗi khi bốc lì xì:', error);
      res.status(500).json({ error: 'Có lỗi xảy ra, vui lòng thử lại sau.' }); // Lỗi chung
    }
  }
};

module.exports = drawController;