// controllers/authController.js
const jwt = require('jsonwebtoken');

const authController = {
  login: (req, res) => {
    const { username, password } = req.body;

    const correctUser = process.env.ADMIN_USERNAME;
    const correctPass = process.env.ADMIN_PASSWORD;

    if (username === correctUser && password === correctPass) {
      // Tạo token (hết hạn sau 1 ngày)
      const token = jwt.sign(
        { role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({ token });
    }

    return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu!' });
  }
};

module.exports = authController;