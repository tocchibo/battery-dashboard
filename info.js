function updateInfo(primarySohDeterioration, secondarySohDeterioration) {

  document.getElementById('info').innerHTML = `
    <strong>SOH減少</strong> 1次利用: ${primarySohDeterioration.toLocaleString()}%、2次利用: ${secondarySohDeterioration.toLocaleString()}%、トータル: ${(primarySohDeterioration + secondarySohDeterioration).toLocaleString()}%
  `;
}