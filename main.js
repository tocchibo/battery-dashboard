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