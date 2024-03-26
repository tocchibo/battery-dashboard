function populateDropdowns() {
  const inputData = loadData();
  const applications = inputData.applications.map((app) => app.name);

  const primaryUseDropdown = document.getElementById('primaryUse');
  const secondaryUseDropdown = document.getElementById('secondaryUse');

  applications.forEach((app) => {
    const option1 = document.createElement('option');
    option1.value = app;
    option1.text = app;
    primaryUseDropdown.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = app;
    option2.text = app;
    secondaryUseDropdown.appendChild(option2);
  });

  primaryUseDropdown.value = applications[0];
  secondaryUseDropdown.value = applications[1];
}

function init() {
  populateDropdowns();
  createSliders();
  updatePlots();

  document.getElementById('primaryUse').addEventListener('change', updatePlots);
  document.getElementById('secondaryUse').addEventListener('change', updatePlots);
}

init();