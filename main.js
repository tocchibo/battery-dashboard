// main.js

// ドロップダウンメニューに選択肢を追加する関数
function populateDropdowns() {
  // 入力データを読み込む
  const inputData = loadData();
  // アプリケーションの名前を取得
  const applications = inputData.applications.map((app) => app.name);

  // 1次利用のドロップダウンメニューを取得
  const primaryUseDropdown = document.getElementById('primaryUse');
  // 2次利用のドロップダウンメニューを取得
  const secondaryUseDropdown = document.getElementById('secondaryUse');

  // 各アプリケーションについて
  applications.forEach((app) => {
    // 1次利用のオプションを作成
    const option1 = document.createElement('option');
    option1.value = app;
    option1.text = app;
    primaryUseDropdown.appendChild(option1);

    // 2次利用のオプションを作成
    const option2 = document.createElement('option');
    option2.value = app;
    option2.text = app;
    secondaryUseDropdown.appendChild(option2);
  });

  // 1次利用と2次利用のデフォルト値を設定
  primaryUseDropdown.value = applications[0];
  secondaryUseDropdown.value = applications[1];
}

// スライダーを更新する関数
function updateSliders(category) {
  // 入力データを読み込む
  const inputData = loadData();

  // 各スライダーについて
  Object.keys(settings.sliders).forEach(key => {
    const setting = settings.sliders[key];
    if (setting.dataProperty && setting.category === category) {
      // スライダーに対応するデータの値を取得
      let application;
      if (category === 'primary') {
        const primaryUse = document.getElementById('primaryUse').value;
        application = inputData.applications.find(app => app.name === primaryUse);
      } else if (category === 'secondary') {
        const secondaryUse = document.getElementById('secondaryUse').value;
        application = inputData.applications.find(app => app.name === secondaryUse);
      } else {
        application = inputData;
      }
      const value = getNestedValue(application, setting.dataProperty);

      // スライダーの値を更新
      document.getElementById(key + '-slider').value = setting.percentage ? value * 100 : value;
      // 入力欄の値を更新
      document.getElementById(key + '-input').value = setting.percentage ? value * 100 : value;
      // 表示値を更新
      document.getElementById(key + '-value').textContent = setting.percentage ? value * 100 : value;
    }
  });

  // 入力データを更新
  updateInputDataFromSliders();
  // グラフを更新
  updatePlots();
  // 追加情報を更新
  updateInfo();
}

// スライダーの値を初期値にリセットする関数
function resetSliders(category) {
  // 入力データを読み込む
  const inputData = loadData();

  // 各スライダーについて
  Object.keys(settings.sliders).forEach(key => {
    const setting = settings.sliders[key];
    if (setting.dataProperty && setting.category === category) {
      // スライダーの初期値を取得
      let initialValue;
      if (category === 'primary') {
        const primaryUse = document.getElementById('primaryUse').value;
        const application = inputData.applications.find(app => app.name === primaryUse);
        initialValue = getNestedValue(application, setting.dataProperty);
      } else if (category === 'secondary') {
        const secondaryUse = document.getElementById('secondaryUse').value;
        const application = inputData.applications.find(app => app.name === secondaryUse);
        initialValue = getNestedValue(application, setting.dataProperty);
      } else {
        initialValue = getNestedValue(inputData, setting.dataProperty);
      }

      // スライダーの値を初期値に設定
      document.getElementById(key + '-slider').value = setting.percentage ? initialValue * 100 : initialValue;
      // 入力欄の値を初期値に設定
      document.getElementById(key + '-input').value = setting.percentage ? initialValue * 100 : initialValue;
      // 表示値を初期値に設定
      document.getElementById(key + '-value').textContent = setting.percentage ? initialValue * 100 : initialValue;
    }
  });

  // 入力データを更新
  updateInputDataFromSliders();
  // グラフを更新
  updatePlots();
  // 追加情報を更新
  updateInfo();
}

// ネストされたデータの値を取得する関数
function getNestedValue(obj, propertyPath) {
  return propertyPath.split('.').reduce((currentObj, property) => currentObj[property], obj);
}

// アプリケーションを初期化する関数
function init() {
  // ドロップダウンメニューに選択肢を追加
  populateDropdowns();
  // 入力データを初期化
  initializeInputData();
  // スライダーを作成
  createSliders();
  // グラフを更新
  updatePlots();
  // 追加情報を更新
  updateInfo();
  // 1次利用のドロップダウンメニューの変更イベントにスライダーの更新を紐付け
  document.getElementById('primaryUse').addEventListener('change', () => updateSliders('primary'));
  // 2次利用のドロップダウンメニューの変更イベントにスライダーの更新を紐付け
  document.getElementById('secondaryUse').addEventListener('change', () => updateSliders('secondary'));
  // リセットボタンにクリックイベントリスナーを追加
  document.getElementById('resetPrimaryButton').addEventListener('click', () => resetSliders('primary'));
  document.getElementById('resetSecondaryButton').addEventListener('click', () => resetSliders('secondary'));
  document.getElementById('resetCommonButton').addEventListener('click', () => resetSliders('common'));
}
// アプリケーションを初期化
init();