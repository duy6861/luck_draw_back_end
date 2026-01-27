// middleware/ensureUniqueNameAndIP.js
const LuckyDraw = require('../models/LuckyDraw');

function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip ||
    'unknown'
  );
}

const ensureUniqueNameAndIP = async (req, res, next) => {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Vui lòng nhập tên!' });
  }

  const normalizedName = name.trim().toLowerCase();
  const ip = getClientIp(req);

  // TẮT KIỂM TRA KHI TEST?
  if (process.env.SKIP_DRAW_LIMIT === 'true') {
    req.normalizedName = normalizedName;
    req.clientIp = 'test-ip';
    return next();
  }

  // Kiểm tra 1: IP đã bốc chưa?
  const existingByIP = await LuckyDraw.findOne({ ip });
  if (existingByIP) {
    return res.status(400).json({
      error: 'Máy này đã bốc lì xì rồi! Mỗi thiết bị chỉ được 1 lần.'
    });
  }

  // Kiểm tra 2: Tên đã bốc chưa?
  const existingByName = await LuckyDraw.findOne({ name: normalizedName });
  if (existingByName) {
    return res.status(400).json({
      error: 'Tên này đã được dùng để bốc lì xì rồi!'
    });
  }

  // Truyền dữ liệu đã chuẩn hóa sang controller
  req.normalizedName = normalizedName;
  req.clientIp = ip;

  next();
};

module.exports = { ensureUniqueNameAndIP };