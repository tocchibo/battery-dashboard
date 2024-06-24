const initialValues = {};

// スライダーを作成する関数
function createSlider(key, setting, container) {
  const label = document.createElement('label');
  label.htmlFor = key + '-slider';
  label.textContent = setting.label + ': ';
  container.appendChild(label);

  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('slider-container');

  const rangeContainer = document.createElement('div');
  rangeContainer.classList.add('range_container');

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.id = key + '-slider';
  slider.min = setting.min;
  slider.max = setting.max;
  slider.step = setting.step;
  slider.value = setting.value;
  slider.classList.add('percent_range');
  rangeContainer.appendChild(slider);

  const rangeActive = document.createElement('div');
  rangeActive.classList.add('range_active');
  rangeContainer.appendChild(rangeActive);

  sliderContainer.appendChild(rangeContainer);

  const input = document.createElement('input');
  input.type = 'text';
  input.id = key + '-input';
  sliderContainer.appendChild(input);

  const span = document.createElement('span');
  span.id = key + '-value';
  span.classList.add('slider-value');
  sliderContainer.appendChild(span);

  container.appendChild(sliderContainer);

  return slider;
}

// スライダーの初期値を設定する関数
function initializeSliderValue(key, setting, slider) {
  let selectedApplication = null;
  if (setting.category === 'primary') {
    selectedApplication = inputData.applications.find(
      (app) => app.name === document.getElementById('primaryUse').value
    );
  } else if (setting.category === 'secondary') {
    selectedApplication = inputData.applications.find(
      (app) => app.name === document.getElementById('secondaryUse').value
    );
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
  document.getElementById(key + '-input').value = numberToLocalizedString(
    setting.value
  );
  updateDifferenceDisplay(key, setting.value, setting.value);

  const initialValue = parseFloat(slider.value);
  const thumbWidth = $(slider).css('--thumb-width')
    ? parseFloat($(slider).css('--thumb-width'))
    : 20;
  const sliderWidth = slider.offsetWidth;
  const sliderRange = slider.max - slider.min;
  const valueRange = initialValue - slider.min;
  const thumbPosition = (valueRange / sliderRange) * (sliderWidth - thumbWidth);
  const initialPosition = thumbPosition + thumbWidth / 2;

  $(slider).next('.range_active').css({
    left: initialPosition + 'px',
    width: 0,
  });

  $(slider).on('input', function () {
    const rangePercent = parseFloat($(this).val());
    const valueRange = rangePercent - slider.min;
    const thumbPosition = (valueRange / sliderRange) * (sliderWidth - thumbWidth);
    const currentPosition = thumbPosition + thumbWidth / 2;

    if (rangePercent > initialValue) {
      $(this).next('.range_active').css({
        left: initialPosition + 'px',
        width: currentPosition - initialPosition + 'px',
      });
    } else if (rangePercent < initialValue) {
      $(this).next('.range_active').css({
        left: currentPosition + 'px',
        width: initialPosition - currentPosition + 'px',
      });
    } else {
      $(this).next('.range_active').css({
        width: 0,
      });
    }
    document.getElementById(key + '-input').value = numberToLocalizedString(
      rangePercent
    );
    updateDifferenceDisplay(key, rangePercent, initialValues[key]);
    updateInputDataFromSliders();
    updatePlots();
  });
}

// スライダーの入力イベントハンドラ
function handleSliderInput(key, setting) {
  const value = this.value;
  document.getElementById(key + '-input').value = numberToLocalizedString(value);
  updateDifferenceDisplay(key, value, initialValues[key]);
  updateInputDataFromSliders();
  updatePlots();
  updateSliderRanges();
}

// 入力欄の入力イベントハンドラ
function handleInputChange(key, setting) {
  const value = localizedStringToNumber(this.value);
  if (!isNaN(value) && value >= setting.min && value <= setting.max) {
    document.getElementById(key + '-slider').value = value;
    updateDifferenceDisplay(key, value, initialValues[key]);
    updateInputDataFromSliders();
    updatePlots();
  } else {
    this.value = numberToLocalizedString(initialValues[key]);
  }
}

// 差分の表示を更新する関数
function updateDifferenceDisplay(key, currentValue, initialValue) {
  const setting = settings.sliders[key];
  const difference = (currentValue - initialValue).toFixed(2);
  const formattedDifference = `${numberToLocalizedString(difference)}${
    setting.percentage ? '%' : ''
  }`;

  const valueSpan = document.getElementById(key + '-value');
  valueSpan.textContent = difference !== '0.00' ? formattedDifference : '';
  valueSpan.style.color =
    parseFloat(difference) > 0
      ? 'blue'
      : parseFloat(difference) < 0
      ? 'red'
      : 'inherit';
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

  Object.keys(sliderSettings).forEach((key) => {
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
    document.getElementById(key + '-input').oninput = handleInputChange.bind(
      document.getElementById(key + '-input'),
      key,
      setting
    );
  });

  updateSliderRanges();

}

function resetSliders(category) {
  Object.keys(settings.sliders).forEach((key) => {
    const setting = settings.sliders[key];
    if (setting.category === category || category === 'common') {
      const slider = document.getElementById(key + '-slider');
      const input = document.getElementById(key + '-input');
      
      if (slider && input) {
        slider.value = setting.value;
        input.value = numberToLocalizedString(setting.value);
        updateDifferenceDisplay(key, setting.value, initialValues[key]);
        
        // レンジアクティブの位置をリセット
        const rangeActive = slider.nextElementSibling;
        if (rangeActive && rangeActive.classList.contains('range_active')) {
          rangeActive.style.width = '0px';
          rangeActive.style.left = slider.offsetWidth / 2 + 'px';
        }
      }
    }
  });
  
  updateInputDataFromSliders();
  updatePlots();
  updateInfo();
}

function updateSliderRanges() {
  Object.keys(settings.sliders).forEach((key) => {
    const slider = document.getElementById(key + '-slider');
    if (slider) {
      const value = parseFloat(slider.value);
      const initialValue = initialValues[key];
      const thumbWidth = parseFloat(getComputedStyle(slider).getPropertyValue('--thumb-width')) || 20;
      const sliderWidth = slider.offsetWidth;
      const sliderRange = slider.max - slider.min;
      
      const valueRange = value - slider.min;
      const initialValueRange = initialValue - slider.min;
      
      const thumbPosition = (valueRange / sliderRange) * (sliderWidth - thumbWidth);
      const initialPosition = (initialValueRange / sliderRange) * (sliderWidth - thumbWidth);
      
      const currentPosition = thumbPosition + thumbWidth / 2;
      const initialThumbPosition = initialPosition + thumbWidth / 2;

      const rangeActive = slider.nextElementSibling;
      if (rangeActive && rangeActive.classList.contains('range_active')) {
        if (value > initialValue) {
          rangeActive.style.left = initialThumbPosition + 'px';
          rangeActive.style.width = (currentPosition - initialThumbPosition) + 'px';
        } else if (value < initialValue) {
          rangeActive.style.left = currentPosition + 'px';
          rangeActive.style.width = (initialThumbPosition - currentPosition) + 'px';
        } else {
          rangeActive.style.width = '0px';
          rangeActive.style.left = currentPosition + 'px';
        }
      }
    }
  });
}