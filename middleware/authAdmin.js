// middleware/authAdmin.js
const jwt = require('jsonwebtoken');

function authAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Lấy phần sau "Bearer "

  if (!token) {
    return res.status(401).json({ error: 'Không có token xác thực' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === 'admin') {
      next(); // Cho phép đi tiếp
    } else {
      return res.status(403).json({ error: 'Không đủ quyền' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}

module.exports = authAdmin;