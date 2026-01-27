// controllers/adminController.js
const LuckyDraw = require('../models/LuckyDraw');

const adminController = {
  getSummary: async (req, res) => {
    try {
      const total = await LuckyDraw.countDocuments();
      const totalAmount = await LuckyDraw.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);

      const totalMoney = totalAmount.length > 0 ? totalAmount[0].total : 0;

      res.json({
        total,
        totalAmount: totalMoney
      });
    } catch (error) {
      console.error('Lỗi khi lấy thống kê:', error);
      res.status(500).json({ error: 'Lỗi server' });
    }
  },

  // Thêm API lấy danh sách chi tiết
  getAllDraws: async (req, res) => {
    try {
      const draws = await LuckyDraw.find().sort({ createdAt: -1 }).lean(); // .lean() giúp nhanh hơn
      res.json(draws);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách:', error);
      res.status(500).json({ error: 'Lỗi server' });
    }
  }
};

module.exports = adminController;