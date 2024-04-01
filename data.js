let inputData;

function updateInputDataFromSliders() {
  if (inputData) {
    inputData.cellData.pricePerKWh = parseFloat(document.getElementById('pricePerKWh-slider').value);
    
    // 他のスライダについても同様に更新
    inputData.costAllocationRate = parseFloat(document.getElementById('costAllocationRate-slider').value) / 100;
    
    // 1次利用と2次利用のアプリケーションを取得
    const primaryApplication = inputData.applications.find(app => app.name === document.getElementById('primaryUse').value);
    const secondaryApplication = inputData.applications.find(app => app.name === document.getElementById('secondaryUse').value);
    
    // 1次利用と2次利用のPCSコストを更新
    primaryApplication.systemData.pcsCostCascadePerKWh = parseFloat(document.getElementById('primaryPcsCostCascadePerKWh-slider').value);
    secondaryApplication.systemData.pcsCostCascadePerKWh = parseFloat(document.getElementById('secondaryPcsCostCascadePerKWh-slider').value);
    
    updatePlots(); // スライダの値が変更されたときにグラフを更新
  }
}

function loadData(theme) {
  const inputData = {
    exchangeRate: 144,  // 為替レート[円/ドル]
    monitoringCostOpPerYear: 801,  // 年間モニタリングコスト原価[円/年]
    monitoringCostMargin: 0.1,  // モニタリングコスト原価率
    costAllocationRate: 0.5,  // リースコストの1次利用への配分率
    leaseRecoveryRate: 0.2,  // リース回収率
    gasolinePricePerLiter: 200, // ガソリン価格(円/L)
    dieselPricePerLiter: 180, // 軽油価格(円/L)
    sunnyDaysRatio: 0.6, // 晴天の割合
    gridAveragePowerPrice: 12,  // 系統平均電力価格(円/kWh)
    gridMaxPowerPrice: 25,  // 系統最高電力価格(円/kWh)
    gridMinPowerPrice: 5,  // 系統最低電力価格(円/kWh)
    retailPowerPrice: 30,  // 小売電力価格(円/kWh)
    cellData: {
      pricePerKWh: 12960,  // セル価格[円/kWh]
      voltage: 3.2,  // セル電圧[V]
      capacityAh: 52,  // セル容量[Ah]
      weightCapacity: 150,  // セル1kg当たり容量[Wh/kg]
      volume: 0.5,  // セル体積[L]
    },
    applications: [
      {
        name: "EV(乗用車)",
        yearsOfUse: 5,  // 電池利用年数
        existingEquipmentCost: 5000000, // 既存装置コスト[円]
        newEquipmentCost: 2500000, // 新規装置コスト[円]
        subsidy: 600000, // 補助金[円]
        capexScenario: "既存装置との価格差", // CAPEXのシナリオ
        opexScenario: "電気代と既存エネルギー代の価格差", // OPEXのシナリオ
        fuelType: 'gasoline',  // 燃料の種類
        fuelEfficiency: 15,  // 燃費[km/L]
        electricEfficiency: 6.5,  // 電費[km/kWh]
        annualMileage: 10000,  // 走行距離[km/year]
        requiredPerformance: {
          requiredOutput: 85,  // 要求定格出力[kW]
          requiredVoltage: 400,  // 要求電圧[V]
          requiredCapacity: 50,  // 要求容量[kWh]
        },
        moduleData: {
          cellsPerModule: 15,
          cellsInSeries: 15,
        },
        packData: {
          modulesPerPack: 6,
          modulesInSeries: 2,
        },
        systemData: {
          packsPerSystem: 4,
          packsInSeries: 4,
          coolingSystem: "空冷",
          ptcHeaterPower: 5,
          monitoringUnit: "パック",
          pcsCostPerKWh: 0,
          pcsCostCascadePerKWh: 0,
          constructionCostPerKWh: 0,
          otherCostPerKWh: 0,
        },
      },
      {
        name: "PV発電所併設",
        yearsOfUse: 15,  // 電池利用年数
        existingEquipmentCost: 0, // 既存装置コスト[円]
        newEquipmentCost: 0, // 新規装置コスト[円]
        subsidy: 0, // 補助金[円]
        capexScenario: null, // CAPEXのシナリオ
        opexScenario: "余剰電力と日中最高電力価格との価格差", // OPEXのシナリオ
        fuelPricePerLiter: null,  // 燃料代[円/L]
        fuelEfficiency: null,  // 燃費[km/L]
        electricEfficiency: null,  // 電費[km/kWh]
        annualMileage: null,  // 走行距離[km/year]
        averageEquivalentCyclesPerDay: 0.6,  // 一日当たり放電サイクル[等価サイクル数]
        requiredPerformance: {
          requiredOutput: 1400,  // 要求定格出力[kW]
          requiredVoltage: 1400,  // 要求電圧[V]
          requiredCapacity: 4200,  // 要求容量[kWh]
        },
        moduleData: {
          cellsPerModule: 30,
          cellsInSeries: 30,
        },
        packData: {
          modulesPerPack: 15,
          modulesInSeries: 15,
        },
        systemData: {
          packsPerSystem: 60,
          packsInSeries: 1,
          coolingSystem: "空冷",
          ptcHeaterPower: 0,
          monitoringUnit: "パック",
          pcsCostPerKWh: 8000,
          pcsCostCascadePerKWh: 30000,
          constructionCostPerKWh: 5000,
          otherCostPerKWh: 11000,
        },
      },
      {
        name: "EV(建設機械)",
        yearsOfUse: 5,  // 電池利用年数
        existingEquipmentCost: 0, // 既存装置コスト[円]
        newEquipmentCost: 0, // 新規装置コスト[円]
        subsidy: 0, // 補助金[円]
        capexScenario: "既存装置との価格差", // CAPEXのシナリオ
        opexScenario: "電気代と既存エネルギー代の価格差", // OPEXのシナリオ
        fuelType: 'diesel',  // 燃料の種類
        fuelEfficiency: 15,  // 燃費[km/L]
        electricEfficiency: 6.5,  // 電費[km/kWh]
        annualMileage: 6059.4625,  // 走行距離[km/year]
        requiredPerformance: {
          requiredOutput: 17.9,  // 要求定格出力[kW]
          requiredVoltage: 200,  // 要求電圧[V]
          requiredCapacity: 36.4,  // 要求容量[kWh]
        },
        moduleData: {
          cellsPerModule: 15,
          cellsInSeries: 15,
        },
        packData: {
          modulesPerPack: 6,
          modulesInSeries: 2,
        },
        systemData: {
          packsPerSystem: 4,
          packsInSeries: 2,
          coolingSystem: "空冷",
          ptcHeaterPower: 5,
          monitoringUnit: "パック",
          pcsCostPerKWh: 0,
          pcsCostCascadePerKWh: 0,
          constructionCostPerKWh: 0,
          otherCostPerKWh: 0,
        },
      },
      {
        name: "グリーンスローモビリティ",
        yearsOfUse: 5,  // 電池利用年数
        existingEquipmentCost: 0, // 既存装置コスト[円]
        newEquipmentCost: 0, // 新規装置コスト[円]
        subsidy: 0, // 補助金[円]
        capexScenario: "既存装置との価格差", // CAPEXのシナリオ
        opexScenario: "電気代と既存エネルギー代の価格差", // OPEXのシナリオ
        fuelType: 'diesel',  // 燃料の種類
        fuelEfficiency: 15,  // 燃費[km/L]
        electricEfficiency: 6.5,  // 電費[km/kWh]
        annualMileage: 3000,  // 走行距離[km/year]
        requiredPerformance: {
          requiredOutput: 12.5,  // 要求定格出力[kW]
          requiredVoltage: 50,  // 要求電圧[V]
          requiredCapacity: 10,  // 要求容量[kWh]
        },
        moduleData: {
          cellsPerModule: 15,
          cellsInSeries: 15,
        },
        packData: {
          modulesPerPack: 6,
          modulesInSeries: 1,
        },
        systemData: {
          packsPerSystem: 1,
          packsInSeries: 1,
          coolingSystem: "空冷",
          ptcHeaterPower: 5,
          monitoringUnit: "パック",
          pcsCostPerKWh: 0,
          pcsCostCascadePerKWh: 0,
          constructionCostPerKWh: 0,
          otherCostPerKWh: 0,
        },
      },
    ],
  };

  return inputData;
}