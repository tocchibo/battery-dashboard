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
function updateSliders() {
  // 1次利用の選択値を取得
  const primaryUse = document.getElementById('primaryUse').value;
  // 2次利用の選択値を取得
  const secondaryUse = document.getElementById('secondaryUse').value;

  // 入力データを読み込む
  const inputData = loadData();
  // 選択された1次利用のアプリケーションを取得
  const primaryApplication = inputData.applications.find(app => app.name === primaryUse);
  // 選択された2次利用のアプリケーションを取得
  const secondaryApplication = inputData.applications.find(app => app.name === secondaryUse);

  // 各スライダーについて
  Object.keys(settings.sliders).forEach(key => {
    const setting = settings.sliders[key];
    if (setting.dataProperty) {
      // スライダーに対応するデータの値を取得
      const value = key.startsWith('primary')
        ? getNestedValue(primaryApplication, setting.dataProperty)
        : key.startsWith('secondary')
        ? getNestedValue(secondaryApplication, setting.dataProperty)
        : getNestedValue(inputData, setting.dataProperty);
      // スライダーの値を更新
      document.getElementById(key + '-slider').value = setting.percentage ? value * 100 : value;
      // 入力欄の値を更新
      document.getElementById(key + '-input').value = setting.percentage ? value * 100 : value;
      // 表示値を更新
      document.getElementById(key + '-value').textContent = setting.percentage ? value * 100 : value;
    }
  });

  // 入力データを更新
  updateInputData();
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
  // 入力データを更新
  updateInputData();
  // スライダーを作成
  createSliders();
  // グラフを更新
  updatePlots();
  // 追加情報を更新
  updateInfo();
  // 1次利用のドロップダウンメニューの変更イベントにスライダーの更新を紐付け
  document.getElementById('primaryUse').addEventListener('change', updateSliders);
  // 2次利用のドロップダウンメニューの変更イベントにスライダーの更新を紐付け
  document.getElementById('secondaryUse').addEventListener('change', updateSliders);
}
// アプリケーションを初期化
init();