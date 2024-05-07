// sliders.js

const initialValues = {};

// スライダーを作成する関数
function createSlider(key, setting, container) {
  const label = document.createElement('label');
  label.htmlFor = key + '-slider';
  label.textContent = setting.label + ': ';
  container.appendChild(label);

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.id = key + '-slider';
  slider.min = setting.min;
  slider.max = setting.max;
  slider.step = setting.step;
  container.appendChild(slider);

  const input = document.createElement('input');
  input.type = 'text';
  input.id = key + '-input';
  container.appendChild(input);

  const span = document.createElement('span');
  span.id = key + '-value';
  container.appendChild(span);

  return slider;
}

// スライダーの初期値を設定する関数
function initializeSliderValue(key, setting, slider) {
  let selectedApplication = null;
  if (setting.category === 'primary') {
    selectedApplication = inputData.applications.find(app => app.name === document.getElementById('primaryUse').value);
  } else if (setting.category === 'secondary') {
    selectedApplication = inputData.applications.find(app => app.name === document.getElementById('secondaryUse').value);
  }

  if (selectedApplication && setting.dataProperty) {
    const propertyPath = setting.dataProperty.split('.');
    let value = selectedApplication;
    for (let i = 0; i < propertyPath.length; i++) {
      value = value[propertyPath[i]];
    }
    setting.value = value;
  }

  initialValues[key] = setting.value;
  slider.value = setting.value;
  document.getElementById(key + '-input').value = Number(setting.value).toLocaleString();
  updateDifferenceDisplay(key, setting.value, setting.value);
}

// スライダーの入力イベントハンドラ
function handleSliderInput(key, setting) {
  const value = this.value;
  document.getElementById(key + '-input').value = Number(value).toLocaleString();
  updateDifferenceDisplay(key, value, initialValues[key]);
  updateInputDataFromSliders();
  updatePlots();
}

// 入力欄の入力イベントハンドラ
function handleInputChange(key, setting) {
  const value = this.value.replace(/,/g, '');
  if (!isNaN(value) && value >= setting.min && value <= setting.max) {
    document.getElementById(key + '-slider').value = value;
    updateDifferenceDisplay(key, value, initialValues[key]);
    updateInputDataFromSliders();
    updatePlots();
  } else {
    this.value = initialValues[key].toLocaleString();
  }
}

// 差分を計算する関数
function calculateDifference(currentValue, initialValue, percentage) {
  if (percentage) {
    return ((currentValue - initialValue) / initialValue * 100).toFixed(2);
  } else {
    return (currentValue - initialValue).toFixed(2);
  }
}

// 差分の表示を更新する関数
function updateDifferenceDisplay(key, currentValue, initialValue) {
  const setting = settings.sliders[key];
  const difference = calculateDifference(currentValue, initialValue, setting.percentage);
  const formattedDifference = `${Number(difference).toLocaleString()}${setting.percentage ? '%' : ''}`;
  const valueSpan = document.getElementById(key + '-value');
  valueSpan.textContent = difference !== '0.00' ? formattedDifference : '';
  valueSpan.style.color = difference > 0 ? 'blue' : (difference < 0 ? 'red' : 'inherit');
}

// スライダーを作成する関数
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
    let container;

    switch (setting.category) {
      case 'common':
        container = commonSlidersContainer;
        break;
      case 'primary':
        container = primarySlidersContainer;
        break;
      case 'secondary':
        container = secondarySlidersContainer;
        break;
      default:
        console.warn(`Unknown category for slider: ${key}`);
        return;
    }

    const slider = createSlider(key, setting, container);
    initializeSliderValue(key, setting, slider);

    slider.oninput = handleSliderInput.bind(slider, key, setting);
    document.getElementById(key + '-input').oninput = handleInputChange.bind(document.getElementById(key + '-input'), key, setting);
  });
}