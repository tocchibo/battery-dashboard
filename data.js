function loadData(theme) {
  const inputData = {
    exchangeRate: 140,
    monitoringCostOpPerYear: 801,
    monitoringCostMargin: 0.1,
    costAllocationRate: 0.5,
    leaseRecoveryRate: 0.2,
    gasolinePricePerLiter: 200, // ガソリン価格(円/L)
    dieselPricePerLiter: 180, // 軽油価格(円/L)
    sunnyDaysRatio: 0.8, // 晴天の割合
    cellData: {
      pricePerKWh: 12960,
      voltage: 3.2,
      capacity: 52,
      weightCapacity: 150,
      volume: 0.5,
    },
    applications: [
      {
        name: "EV(乗用車)",
        economicGain: 7277,
        yearsOfUse: 5,
        existingEquipmentCost: 5000000, // 既存装置コスト[円]
        newEquipmentCost: 2500000, // 新規装置コスト[円]
        subsidy: 600000, // 補助金[円]
        capexScenario: "既存装置との価格差", // CAPEXのシナリオ
        opexScenario: "電気代と既存エネルギー代の価格差", // OPEXのシナリオ
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
        yearsOfUse: 5,
        economicGain: 17520,
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
        economicGain: 466113,
        yearsOfUse: 5,
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
        economicGain: 110769,
        yearsOfUse: 5,
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