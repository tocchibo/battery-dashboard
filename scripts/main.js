function populateDropdowns() {
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
    initializeInputData(); // 入力データを初期化
    populateDropdowns();
    createSliders();
    updatePlots();
    updateInfo();

    document.getElementById('resetPrimaryButton').addEventListener('click', () => resetSliders('primary'));
    document.getElementById('resetSecondaryButton').addEventListener('click', () => resetSliders('secondary'));
    document.getElementById('resetCommonButton').addEventListener('click', () => resetSliders('common'));
    window.addEventListener('resize', updateSliderRanges);
  }
  
  init();
  