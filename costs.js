// 入力データからシステムの仕様を計算する
function calculateSystemSpecs(application, inputData) {
    const { moduleData, packData, systemData } = application;
    const { cellData } = inputData;
  
    // セル容量(Wh)
    const cellCapacityWh = cellData.voltage * cellData.capacityAh;
    // セル重量(kg)
    const cellWeight = cellCapacityWh / cellData.weightCapacity;
    // モジュール電圧(V)
    const moduleVoltage = cellData.voltage * moduleData.cellsInSeries;
    // モジュール容量(kWh)
    const moduleCapacity = (cellCapacityWh * moduleData.cellsPerModule) / 1000;
    // モジュール重量(kg) (セル重量×セル個数の1.3倍)
    const moduleWeight = cellWeight * moduleData.cellsPerModule * 1.3;
    // モジュール体積(L) (セル体積×セル個数の1.3倍)
    const moduleVolume = cellData.volume * moduleData.cellsPerModule * 1.3;
    // パック電圧(V)
    const packVoltage = moduleVoltage * packData.modulesInSeries;
    // パック容量(kWh)
    const packCapacity = moduleCapacity * packData.modulesPerPack;
    // システム体積(L) (モジュール体積の合計×1.7倍)
    const systemVolume = moduleVolume * packData.modulesPerPack * systemData.packsPerSystem * 1.7;
    // システム電圧(V)
    const systemVoltage = packVoltage * systemData.packsInSeries;
    // システム容量(kWh)
    const systemCapacity = packCapacity * systemData.packsPerSystem;
  
    return {
      cellCapacityWh,
      cellWeight,
      moduleVoltage,
      moduleCapacity,
      moduleWeight,
      moduleVolume,
      packVoltage,
      packCapacity,
      systemVolume,
      systemVoltage,
      systemCapacity,
    };
  }
  
  // システムの仕様からコストを計算する
  function calculateBatteryCosts(application, systemSpecs, inputData) {
    const { systemData } = application;
    const { moduleVolume } = systemSpecs;
  
    // モジュールコスト[ドル/モジュール]
    const socController = 2.5 + 0.01 * systemSpecs.moduleCapacity;
    const moduleTerminal = 0.75 + 0.5 * moduleVolume;
    const otherComponents = 1 + 0.3 * moduleVolume;
    const gasValve = 1.5;
    const interconnection = 1 + 0.5 * moduleVolume;
    const processingCostModule = 229 / inputData.exchangeRate;
  
    const moduleCost =
      (socController +
       moduleTerminal +
       otherComponents +
       gasValve +
       interconnection +
       processingCostModule) * inputData.exchangeRate;
  
    // パックコスト[ドル/パック]
    const currentVoltageSensing = 100;
    const temperatureControlSystem = 120;
    const batteryTerminal = 15 + 0.5 * moduleVolume;
    const busBarsPerModuleRow = 20;
    const batteryJacket = 2 * moduleVolume;
    const moduleControl = 20;
    const automaticBatteryDisconnect = 200;
    const manualBatteryDisconnect = 15;
    const parallelModulesPacks = 100;
    const acSystemAddition = systemData.ptcHeaterPower * 40;
    const cellHeaterSystem = systemData.ptcHeaterPower * 20;
    const processingCostPack = 1339.5 / inputData.exchangeRate;
  
    const packCost =
      (currentVoltageSensing +
       temperatureControlSystem +
       batteryTerminal +
       busBarsPerModuleRow +
       batteryJacket +
       moduleControl +
       automaticBatteryDisconnect +
       manualBatteryDisconnect +
       parallelModulesPacks +
       acSystemAddition +
       cellHeaterSystem +
       processingCostPack) * inputData.exchangeRate;
  
    return {
      moduleCost, // [円/モジュール]
      packCost,  // [円/パック]
    };
  }
  
  // モニタリングコストを計算する
  function calculateMonitoringCost(application, systemSpecs, inputData) {
    const { yearsOfUse, moduleData, packData, systemData } = application;
    const { monitoringCostOpPerYear, monitoringCostMargin } = inputData;
    const { systemCapacity } = systemSpecs;
  
    let monitoringUnitCount;
    switch (systemData.monitoringUnit) {
      case "セル":
        monitoringUnitCount =
          moduleData.cellsPerModule *
          packData.modulesPerPack *
          systemData.packsPerSystem;
        break;
      case "モジュール":
        monitoringUnitCount =
          packData.modulesPerPack * systemData.packsPerSystem;
        break;
      case "パック":
        monitoringUnitCount = systemData.packsPerSystem;
        break;
      case "システム":
        monitoringUnitCount = 1;
        break;
      default:
        throw new Error("Invalid monitoring unit.");
    }
  
    const monitoringCostPerKWh =
      (monitoringUnitCount * monitoringCostOpPerYear) * yearsOfUse /
      systemCapacity /
      monitoringCostMargin;
  
    return monitoringCostPerKWh; // [円/(kWh)]
  }
  
  // kWhあたりの各コストを計算する
  function calculateTotalCostPerKWh(application, inputData) {
    const systemSpecs = calculateSystemSpecs(application, inputData);
    const { systemData, packData } = application;
    const { systemCapacity } = systemSpecs;
  
    const BatteryCosts = calculateBatteryCosts(application, systemSpecs, inputData);
    const monitoringCostPerKWh = calculateMonitoringCost(application, systemSpecs, inputData);
  
    // セルコスト
    const cellCostPerKWh = inputData.cellData.pricePerKWh;
    // モジュール製造コスト
    const moduleCostPerKWh = BatteryCosts.moduleCost * systemData.packsPerSystem * packData.modulesPerPack / systemCapacity;
    // パック製造コスト
    const packCostPerKWh = BatteryCosts.packCost * systemData.packsPerSystem / systemCapacity;
    // PCSコスト
    const pcsCostPerKWh = systemData.pcsCostPerKWh;  // 新品
    const pcsCostCascadePerKWh = systemData.pcsCostCascadePerKWh;  // カスケード（量産効果が出ずコスト増を想定）
    // 工事費
    const constructionCostPerKWh = systemData.constructionCostPerKWh;
    // その他コスト
    const otherCostPerKWh = systemData.otherCostPerKWh;
  
    return {
      cellCostPerKWh,
      moduleCostPerKWh,
      packCostPerKWh,
      pcsCostPerKWh,
      pcsCostCascadePerKWh,
      constructionCostPerKWh,
      otherCostPerKWh,
      monitoringCostPerKWh,
    };
  }
  
  // 再構成コストを計算する
  function calculateReconfigurationCostPerKWh(primaryApplication, secondaryApplication, inputData) {
    const { moduleData: primaryModuleData, packData: primaryPackData, systemData: primarySystemData } = primaryApplication;
    const { moduleData: secondaryModuleData, packData: secondaryPackData, systemData: secondarySystemData } = secondaryApplication;
    const secondarySystemSpecs = calculateSystemSpecs(secondaryApplication, inputData);
  
    let reconfigurationCost = 0;
  
    if (
      primaryModuleData.cellsPerModule === secondaryModuleData.cellsPerModule &&
      primaryModuleData.cellsInSeries === secondaryModuleData.cellsInSeries &&
      primaryPackData.modulesPerPack === secondaryPackData.modulesPerPack &&
      primaryPackData.modulesInSeries === secondaryPackData.modulesInSeries
    ) {
      reconfigurationCost = 0;
    } else if (
      primaryModuleData.cellsPerModule === secondaryModuleData.cellsPerModule &&
      primaryModuleData.cellsInSeries === secondaryModuleData.cellsInSeries
    ) {
      reconfigurationCost = calculateBatteryCosts(secondaryApplication, secondarySystemSpecs, inputData).packCost * secondarySystemData.packsPerSystem;
    } else {
      reconfigurationCost = calculateBatteryCosts(secondaryApplication, secondarySystemSpecs, inputData).packCost * secondarySystemData.packsPerSystem +
                            calculateBatteryCosts(secondaryApplication, secondarySystemSpecs, inputData).moduleCost * secondarySystemData.packsPerSystem * secondaryPackData.modulesPerPack;
    }
  
    const reconfigurationCostPerKWh = reconfigurationCost / secondarySystemSpecs.systemCapacity;
  
    return reconfigurationCostPerKWh;
  }

  // 1次利用・2次利用それぞれのコストを計算する
  function calculatePrimaryAndSecondaryCosts(primaryApplication, secondaryApplication, inputData) {

  // 蓄電池コスト
    const primaryCosts = calculateTotalCostPerKWh(primaryApplication, inputData);
    const secondaryCosts = calculateTotalCostPerKWh(secondaryApplication, inputData);
      
    primaryCosts.batteryCostPerKWh = primaryCosts.cellCostPerKWh + primaryCosts.moduleCostPerKWh + primaryCosts.packCostPerKWh;
    secondaryCosts.batteryCostPerKWh = secondaryCosts.cellCostPerKWh + secondaryCosts.moduleCostPerKWh + secondaryCosts.packCostPerKWh;
  
    return {primaryCosts, secondaryCosts};
  }