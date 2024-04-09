// sliders.js

const initialValues = {};

// スライダーを作成する関数
function createSliders() {
  // 共通設定のスライダーコンテナを取得
  const commonSlidersContainer = document.getElementById('common-sliders');
  // 1次利用のスライダーコンテナを取得
  const primarySlidersContainer = document.getElementById('primary-sliders');
  // 2次利用のスライダーコンテナを取得
  const secondarySlidersContainer = document.getElementById('secondary-sliders');

  // スライダーコンテナを初期化
  commonSlidersContainer.innerHTML = '';
  primarySlidersContainer.innerHTML = '';
  secondarySlidersContainer.innerHTML = '';

  // スライダーの設定を取得
  const sliderSettings = settings.sliders;

  // 各スライダーの設定について
  Object.keys(sliderSettings).forEach(key => {
    const setting = sliderSettings[key];
    // スライダーのコンテナを作成
    const container = document.createElement('div');

    let selectedApplication = null;
    if (setting.category === 'primary') {
      // 1次利用のアプリケーションを取得
      selectedApplication = inputData.applications.find(app => app.name === document.getElementById('primaryUse').value);
    } else if (setting.category === 'secondary') {
      // 2次利用のアプリケーションを取得
      selectedApplication = inputData.applications.find(app => app.name === document.getElementById('secondaryUse').value);
    }

    if (selectedApplication && setting.dataProperty) {
      // データプロパティのパスを分割
      const propertyPath = setting.dataProperty.split('.');
      let value = selectedApplication;
      // パスに沿ってデータの値を取得
      for (let i = 0; i < propertyPath.length; i++) {
        value = value[propertyPath[i]];
      }
      // 設定の値を更新
      setting.value = value;
    }

    // スライダーの初期値を保存
    initialValues[key] = setting.value;
    
    // スライダーのラベルを作成
    const label = document.createElement('label');
    label.htmlFor = key + '-slider';
    label.textContent = setting.label + ': ';
    container.appendChild(label);

    // スライダーを作成
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = key + '-slider';
    slider.min = setting.min;
    slider.max = setting.max;
    slider.value = setting.value;
    slider.step = setting.step;
    container.appendChild(slider);

    // 入力欄を作成
    const input = document.createElement('input');
    input.type = 'text';
    input.id = key + '-input';
    input.value = Number(setting.value).toLocaleString();
    container.appendChild(input);

    // 値の表示要素を作成
    const span = document.createElement('span');
    span.id = key + '-value';
    const initialValue = initialValues[key];
    const currentValue = Number(slider.value);
    const diff = setting.percentage ? ((currentValue - initialValue) / initialValue * 100).toFixed(2) : (currentValue - initialValue).toFixed(2);
    const formattedDiff = `${Number(diff).toLocaleString()}${setting.percentage ? '%' : ''}`;
    span.textContent = diff !== '0.00' ? formattedDiff : '';
    span.style.color = diff > 0 ? 'blue' : (diff < 0 ? 'red' : 'inherit');
    container.appendChild(span);

    // カテゴリに応じてスライダーを追加
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

    // スライダーの入力イベントを設定
    slider.oninput = function() {
      const value = this.value;
      const initialValue = initialValues[key];
      const diff = setting.percentage ? ((value - initialValue) / initialValue * 100).toFixed(2) : (value - initialValue).toFixed(2);
      const formattedDiff = `${Number(diff).toLocaleString()}${setting.percentage ? '%' : ''}`;
      const valueSpan = document.getElementById(key + '-value');
      valueSpan.textContent = diff !== '0.00' ? formattedDiff : '';
      valueSpan.style.color = diff > 0 ? 'blue' : (diff < 0 ? 'red' : 'inherit');
      document.getElementById(key + '-input').value = Number(value).toLocaleString();
      updateInputDataFromSliders();
      updatePlots();
    };

    // 入力欄の入力イベントを設定
    input.oninput = function() {
      const value = this.value.replace(/,/g, '');
      if (!isNaN(value) && value >= setting.min && value <= setting.max) {
        const initialValue = initialValues[key];
        const diff = setting.percentage ? ((value - initialValue) / initialValue * 100).toFixed(2) : (value - initialValue).toFixed(2);
        const formattedDiff = `${Number(diff).toLocaleString()}${setting.percentage ? '%' : ''}`;
        const valueSpan = document.getElementById(key + '-value');
        valueSpan.textContent = diff !== '0.00' ? formattedDiff : '';
        valueSpan.style.color = diff > 0 ? 'blue' : (diff < 0 ? 'red' : 'inherit');
        document.getElementById(key + '-slider').value = value;
        updateInputDataFromSliders();
        updatePlots();
      } else {
        this.value = initialValues[key].toLocaleString();
      }
    };
  });
}