function loadData() {
    return {
      exchangeRate: 144,
      monitoringCostOpPerYear: 801,
      monitoringCostMargin: 0.1,
      costAllocationRate: 0.5,
      leaseRecoveryRate: 0.2,
      gasolinePricePerLiter: 200,
      dieselPricePerLiter: 180,
      sunnyDaysRatio: 0.6,
      gridAveragePowerPrice: 12,
      gridMaxPowerPrice: 25,
      gridMinPowerPrice: 5,
      retailPowerPrice: 30,
      CalendarDegradationFactor: 6,
      CycleDegradationFactor: 28,
      cellData: {
        pricePerKWh: 12960,
        voltage: 3.2,
        capacityAh: 52,
        weightCapacity: 150,
        volume: 0.5,
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
          name: "PV発電所併設(EV共通モジュール)",
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
            cellsPerModule: 15,
            cellsInSeries: 15,
          },
          packData: {
            modulesPerPack: 60,
            modulesInSeries: 30,
          },
          systemData: {
            packsPerSystem: 30,
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
          name: "基地局PV併設",
          yearsOfUse: 5,  // 電池利用年数
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
            requiredOutput: 3,  // 要求定格出力[kW]
            requiredVoltage: 48,  // 要求電圧[V]
            requiredCapacity: 50,  // 要求容量[kWh]
          },
          moduleData: {
            cellsPerModule: 15,
            cellsInSeries: 3,
          },
          packData: {
            modulesPerPack: 6,
            modulesInSeries: 1,
          },
          systemData: {
            packsPerSystem: 5,
            packsInSeries: 5,
            coolingSystem: "空冷",
            ptcHeaterPower: 0,
            monitoringUnit: "パック",
            pcsCostPerKWh: 1600,
            pcsCostCascadePerKWh: 1600,
            constructionCostPerKWh: 37000,
            otherCostPerKWh: 38000,
          },
        },
        {
          name: "基地局PV併設(GSM共通パック)",
          yearsOfUse: 5,  // 電池利用年数
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
            requiredOutput: 3,  // 要求定格出力[kW]
            requiredVoltage: 48,  // 要求電圧[V]
            requiredCapacity: 50,  // 要求容量[kWh]
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
            packsPerSystem: 5,
            packsInSeries: 1,
            coolingSystem: "空冷",
            ptcHeaterPower: 0,
            monitoringUnit: "パック",
            pcsCostPerKWh: 1600,
            pcsCostCascadePerKWh: 1600,
            constructionCostPerKWh: 37000,
            otherCostPerKWh: 38000,
          },
        },
        {
          name: "EV(建設機械)",
          yearsOfUse: 5,  // 電池利用年数
          existingEquipmentCost: 3000000, // 既存装置コスト[円]
          newEquipmentCost: 4900000, // 新規装置コスト[円]
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
            modulesPerPack: 4,
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
  }

let inputData;

function initializeInputData() {
inputData = loadData();
}

function updateInputDataFromSliders() {
    if (inputData) {
      Object.keys(settings.sliders).forEach((key) => {
        const setting = settings.sliders[key];
        if (setting.dataProperty) {
          const value = parseFloat(
            document.getElementById(key + '-slider').value
          );
          const propertyPath = setting.dataProperty.split('.');
          let obj;
  
          if (setting.category === 'primary') {
            obj = inputData.applications.find(
              (app) => app.name === document.getElementById('primaryUse').value
            );
          } else if (setting.category === 'secondary') {
            obj = inputData.applications.find(
              (app) => app.name === document.getElementById('secondaryUse').value
            );
          } else {
            obj = inputData;
          }
  
          if (propertyPath.length === 1) {
            obj[propertyPath[0]] = setting.percentage ? value / 100 : value;
          } else {
            let targetObj = obj;
            for (let i = 0; i < propertyPath.length - 1; i++) {
              targetObj = targetObj[propertyPath[i]];
            }
            targetObj[propertyPath[propertyPath.length - 1]] = setting.percentage
              ? value / 100
              : value;
          }
        }
      });
    }
  }