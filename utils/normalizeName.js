// utils/normalizeName.js
const removeDiacritics = require('remove-diacritics');

function normalizeName(name) {
  return removeDiacritics(name.trim().toLowerCase());
}

module.exports = { normalizeName };