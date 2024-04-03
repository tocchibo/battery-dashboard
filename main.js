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

  Object.keys(settings.sliders).forEach(key => {
    const setting = settings.sliders[key];
    if (setting.dataProperty) {
      const value = key.startsWith('primary')
        ? getNestedValue(primaryApplication, setting.dataProperty)
        : key.startsWith('secondary')
        ? getNestedValue(secondaryApplication, setting.dataProperty)
        : getNestedValue(inputData, setting.dataProperty);
      document.getElementById(key + '-slider').value = value;
      document.getElementById(key + '-input').value = value;
      document.getElementById(key + '-value').textContent = value;
    }
  });

  updatePlots();
}

function getNestedValue(obj, propertyPath) {
  return propertyPath.split('.').reduce((currentObj, property) => currentObj[property], obj);
}

function init() {
  populateDropdowns();
  inputData = loadData();
  createSliders();
  updatePlots();

  document.getElementById('primaryUse').addEventListener('change', updateSliders);
  document.getElementById('secondaryUse').addEventListener('change', updateSliders);
}
init();