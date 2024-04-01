function createSliders() {
  const commonSlidersContainer = document.getElementById('common-sliders');
  const primarySlidersContainer = document.getElementById('primary-sliders');
  const secondarySlidersContainer = document.getElementById('secondary-sliders');

  commonSlidersContainer.innerHTML = '';
  primarySlidersContainer.innerHTML = '';
  secondarySlidersContainer.innerHTML = '';

  const sliderSettings = settings.sliders;

  Object.keys(sliderSettings).forEach(key => {
    const setting = sliderSettings[key];
    const container = document.createElement('div');

    if (key === 'primaryPcsCostCascadePerKWh' || key === 'secondaryPcsCostCascadePerKWh') {
      const selectedApplication = document.getElementById(key.startsWith('primary') ? 'primaryUse' : 'secondaryUse').value;
      const application = loadData().applications.find(app => app.name === selectedApplication);
      setting.value = application.systemData.pcsCostCascadePerKWh;
    }
    
    const label = document.createElement('label');
    label.htmlFor = key + '-slider';
    label.textContent = setting.label + ': ';
    container.appendChild(label);

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = key + '-slider';
    slider.min = setting.min;
    slider.max = setting.max;
    slider.value = setting.value;
    slider.step = setting.step;
    container.appendChild(slider);

    const input = document.createElement('input');
    input.type = 'number';
    input.id = key + '-input';
    input.value = setting.value;
    input.min = setting.min;
    input.max = setting.max;
    input.step = setting.step;
    container.appendChild(input);

    const span = document.createElement('span');
    span.id = key + '-value';
    span.textContent = slider.value;
    container.appendChild(span);

    switch (setting.category) {
      case 'common':
        commonSlidersContainer.appendChild(container);
        break;
      case 'primary':
        primarySlidersContainer.appendChild(container);
        break;
      case 'secondary':
        secondarySlidersContainer.appendChild(container);
        break;
      default:
        console.warn(`Unknown category for slider: ${key}`);
    }

    slider.oninput = function() {
      const value = this.value;
      document.getElementById(key + '-value').textContent = Number(value).toLocaleString();
      document.getElementById(key + '-input').value = value;
      updateInputDataFromSliders();
    };

    input.oninput = function() {
      const value = this.value;
      document.getElementById(key + '-value').textContent = Number(value).toLocaleString();
      document.getElementById(key + '-slider').value = value;
      updateInputDataFromSliders();
    };
  });
}