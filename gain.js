// // 入力データからCAPEXに関する経済利得を計算する
// function calculateCapexReductionGain(application, inputData) {

//     const capexReductionGain = 0;

//     if (
//         application.capexScenario === "既存装置との価格差"
//     ) {
//         capexReductionGain = application.existingEquipmentCost - application.newEquipmentCost;
//     }
    
//     return capexReductionGain;
// }

// // 入力データからOPEXに関する経済利得を計算する
// function calculateOperationGain(application, inputData) {

//     const gain = 0;
//     const unit = null;

//     if ( application.opexScenario === "電気代と既存エネルギー代の価格差" ) {
//         const { retailPowerPrice } = inputData;
//         const { yearsOfUse, fuelType, fuelEfficiency, electricEfficiency, annualMileage } = application;

//         const annualFuelConsumption = annualMileage / fuelEfficiency;
//         const electricityConsumption = annualMileage / electricEfficiency;
//         const fuelPricePerLiter = inputData[fuelType + 'PricePerLiter']

//         gain = (fuelPricePerLiter * annualFuelConsumption - retailPowerPrice * electricityConsumption) * yearsOfUse;
//         unit = '円/システム';
//     } else if ( application.opexScenario === "余剰電力と日中最高電力価格との価格差" ) {
//         gain = inputData.sunnyDaysRatio * 
//                application.averageEquivalentCyclesPerDay * 365 * 
//                inputData.gridAveragePowerPrice *
//                application.yearsOfUse;
//         unit = '円/kWh';
//     }
    
//     return { gain, unit };
// }

// 入力データから経済利得を計算する
function calculateGainPerKWh(application, inputData) {

    const { moduleData, packData, systemData } = application;
    const { cellData } = inputData;
    // セル容量(Wh)
    const cellCapacityWh = cellData.voltage * cellData.capacityAh;
    // モジュール容量(kWh)
    const moduleCapacity = (cellCapacityWh * moduleData.cellsPerModule) / 1000;
    // パック容量(kWh)
    const packCapacity = moduleCapacity * packData.modulesPerPack;
    // システム容量(kWh)
    const systemCapacity = packCapacity * systemData.packsPerSystem;
  
    // CAPEX由来の利得
    let capexReductionGainPerKWh = 0;
  
    if (
        application.capexScenario === "既存装置との価格差"
    ) {
        capexReductionGainPerKWh = (application.existingEquipmentCost - application.newEquipmentCost) / systemCapacity;
    }
    
    // OPEX由来の利得
    let operationGainPerKWh = 0;
  
    if ( application.opexScenario === "電気代と既存エネルギー代の価格差" ) {
        const { retailPowerPrice } = inputData;
        const { yearsOfUse, fuelType, fuelEfficiency, electricEfficiency, annualMileage } = application;
  
        const annualFuelConsumption = annualMileage / fuelEfficiency;
        const electricityConsumption = annualMileage / electricEfficiency;
        const fuelPricePerLiter = inputData[fuelType + 'PricePerLiter']
  
        operationGainPerKWh = (fuelPricePerLiter * annualFuelConsumption - retailPowerPrice * electricityConsumption) * yearsOfUse / systemCapacity;
    } else if ( application.opexScenario === "余剰電力と日中最高電力価格との価格差" ) {
        operationGainPerKWh = inputData.sunnyDaysRatio * 
               application.averageEquivalentCyclesPerDay * 365 * 
               inputData.gridAveragePowerPrice *
               application.yearsOfUse;  // 系統電力価格がkWhあたりの値段なので、gainの単位も[円/kWh]
    }
    
    const subsidyPerKWh = application.subsidy / systemCapacity
  
    return {
        capex: capexReductionGainPerKWh,
        opex: operationGainPerKWh,
        subsidyPerKWh: subsidyPerKWh
    };
  }