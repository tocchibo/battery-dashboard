function numberToLocalizedString(number) {
    return Number(number).toLocaleString();
  }
  
  function localizedStringToNumber(localizedString) {
    return Number(localizedString.replace(/,/g, ''));
  }
  