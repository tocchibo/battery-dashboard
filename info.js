function updateInfo() {

  const primaryUse = document.getElementById('primaryUse').value;
  const secondaryUse = document.getElementById('secondaryUse').value
  const primaryApplication = inputData.applications.find((app) => app.name === primaryUse);
  const secondaryApplication = inputData.applications.find((app) => app.name === secondaryUse);

  const primarySohDeterioration = calculateSohDeterioration(primaryApplication, inputData)
  const secondarySohDeterioration = calculateSohDeterioration(secondaryApplication, inputData)
  document.getElementById('info').innerHTML = `
    <strong>SOH減少</strong> 1次利用: ${primarySohDeterioration.toLocaleString()}%、2次利用: ${secondarySohDeterioration.toLocaleString()}%、トータル: ${(primarySohDeterioration + secondarySohDeterioration).toLocaleString()}%
  `;
}
