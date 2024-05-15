function updateInfo() {
    const primaryUse = document.getElementById('primaryUse').value;
    const secondaryUse = document.getElementById('secondaryUse').value;
    const primaryApplication = inputData.applications.find(
      (app) => app.name === primaryUse
    );
    const secondaryApplication = inputData.applications.find(
      (app) => app.name === secondaryUse
    );
  
    updateInputDataFromSliders();
    const primarySohDeterioration = calculateSohDeterioration(primaryApplication);
    const secondarySohDeterioration = calculateSohDeterioration(
      secondaryApplication
    );
    document.getElementById('info').innerHTML = `
      <strong>SOH減少</strong> 1次利用: ${primarySohDeterioration.toLocaleString()}%、2次利用: ${secondarySohDeterioration.toLocaleString()}%、トータル: ${(primarySohDeterioration + secondarySohDeterioration).toLocaleString()}%
    `;
  }
  