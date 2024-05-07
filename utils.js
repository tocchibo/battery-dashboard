// utils.js

// 数値をカンマ区切りの文字列に変換する関数
function numberToLocalizedString(number) {
    return Number(number).toLocaleString();
  }
  
  // カンマを取り除いて数値に変換する関数
  function localizedStringToNumber(localizedString) {
    return Number(localizedString.replace(/,/g, ''));
  }