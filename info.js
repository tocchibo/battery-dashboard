function updateInfo(primaryUse, secondaryUse, graphData) {
  const primaryCascadeBatteryCostPerKWh = graphData[2].y[0];
  const secondaryCascadeBatteryCostPerKWh = graphData[2].y[1];

  document.getElementById('info').innerHTML = `
    <strong>1次利用 (${primaryUse}):</strong> ${primaryCascadeBatteryCostPerKWh.toLocaleString()}円/kWh<br>
    <strong>2次利用 (${secondaryUse}):</strong> ${secondaryCascadeBatteryCostPerKWh.toLocaleString()}円/kWh
  `;
}