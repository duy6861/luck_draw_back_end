// utils/generateAmount.js
const { normalizeName } = require('./normalizeName');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roundToThousand(amount) {
  return Math.floor(amount / 1000) * 1000;
}
function isWordMatch(text, word) {
  const words = text.split(/\s+/); // tách theo khoảng trắng
  return words.some(w => w === word);
}
// Hàm sinh số tiền dựa trên tên
function generateAmount(name = '') {
  const normalizedName = normalizeName(name);

  // 🔴 KIỂM TRA "NHUNG" TRƯỚC "HUNG"!
  if (isWordMatch(normalizedName, 'nhung')) {
    const rand = Math.random();
    let amount;
    if (rand < 0.8) {
      amount = getRandomInt(500000, 800000);
    } else if (rand < 0.95) {
      amount = getRandomInt(800001, 1000000);
    } else {
      amount = getRandomInt(1000001, 1500000);
    }
    return roundToThousand(amount);
  }

  // 👥 LÌ XÌ THƯỜNG (bao gồm Hùng)
  const rand = Math.random();
  let amount;
  if (rand < 0.8) {
    amount = getRandomInt(20000, 50000);
  } else if (rand < 0.98) {
    amount = getRandomInt(50001, 100000);
  } else {
    amount = getRandomInt(100001, 500000);
  }
  return roundToThousand(amount);
}

module.exports = { generateAmount };