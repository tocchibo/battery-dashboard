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

function updateSliders() {
  const primaryUse = document.getElementById('primaryUse').value;
  const secondaryUse = document.getElementById('secondaryUse').value;

  const inputData = loadData();
  const primaryApplication = inputData.applications.find(app => app.name === primaryUse);
  const secondaryApplication = inputData.applications.find(app => app.name === secondaryUse);

  document.getElementById('primaryPcsCostCascadePerKWh-slider').value = primaryApplication.systemData.pcsCostCascadePerKWh;
  document.getElementById('secondaryPcsCostCascadePerKWh-slider').value = secondaryApplication.systemData.pcsCostCascadePerKWh;
}

function init() {
  populateDropdowns();
  createSliders();
  updatePlots();

  document.getElementById('primaryUse').addEventListener('change', updateSliders);
  document.getElementById('secondaryUse').addEventListener('change', updateSliders);

}

init();