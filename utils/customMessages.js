// utils/customMessages.js
const { normalizeName } = require('./normalizeName');

// Hàm kiểm tra: word có xuất hiện như một TỪ RIÊNG không?
function isStandaloneWord(text, word) {
  // Tạo regex: \b = word boundary (ranh giới từ)
  const regex = new RegExp(`\\b${word}\\b`, 'i');
  return regex.test(text);
}

const customRules = [
  {
    words: ['nhung'],
    message: 'Lì xì to cho em gái cưng! Năm mới xinh đẹp, giàu có nhé!'
  },
  {
    words: ['hung', 'hùng'],
    message: 'Chuyên bán xe đâm đụng!'
  },
  {
    words: ['nam'],
    message: 'Sang năm bán được nhiều quần áo nhé!'
  },
  {
    words: ['vuong', 'vương'],
    message: 'Bớt sống cao su lại, lo lấy vợ đi!'
  },
  {
    words: ['dang', 'đăng'],
    message: 'Đăng Trọc!'
  },
  {
    words: ['ha', 'hà'],
    message: 'Tùy unfriend tôi nhưng vì tôi nhân từ nên vẫn lixi cho bạn!'
  }
];

function getCustomMessage(inputName) {
  const normalized = normalizeName(inputName); // ví dụ: "tran nhung" → "tran nhung"

  for (const rule of customRules) {
    // Kiểm tra: có bất kỳ từ nào trong rule xuất hiện như TỪ RIÊNG không?
    const matched = rule.words.some(word => {
      const cleanWord = normalizeName(word); // "hùng" → "hung"
      return isStandaloneWord(normalized, cleanWord);
    });

    if (matched) {
      return rule.message;
    }
  }

  return null;
}

module.exports = { getCustomMessage };