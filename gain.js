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

    console.log('CAPEX由来の利得:', capexReductionGainPerKWh);
    console.log('OPEX由来の利得:', operationGainPerKWh);
    console.log('補助金:', subsidyPerKWh);

    return {
        capex: capexReductionGainPerKWh,
        opex: operationGainPerKWh,
        subsidyPerKWh: subsidyPerKWh
    };
}

// 入力データからGHG削減量を計算する
// function calculateGhgReductionPerKWh(application, inputData) {

//     const { moduleData, packData, systemData } = application;
//     const { cellData } = inputData;
//     // セル容量(Wh)
//     const cellCapacityWh = cellData.voltage * cellData.capacityAh;
//     // モジュール容量(kWh)
//     const moduleCapacity = (cellCapacityWh * moduleData.cellsPerModule) / 1000;
//     // パック容量(kWh)
//     const packCapacity = moduleCapacity * packData.modulesPerPack;
//     // システム容量(kWh)
//     const systemCapacity = packCapacity * systemData.packsPerSystem;

//     // OPEX由来の利得
//     let operationGainPerKWh = 0;

//     if ( application.opexScenario === "電気代と既存エネルギー代の価格差" ) {
//         const { retailPowerPrice } = inputData;
//         const { yearsOfUse, fuelType, fuelEfficiency, electricEfficiency, annualMileage } = application;

//         const annualFuelConsumption = annualMileage / fuelEfficiency;
//         const electricityConsumption = annualMileage / electricEfficiency;
//         const fuelPricePerLiter = inputData[fuelType + 'PricePerLiter']

//         operationGainPerKWh = (fuelPricePerLiter * annualFuelConsumption - retailPowerPrice * electricityConsumption) * yearsOfUse / systemCapacity;
//     } else if ( application.opexScenario === "余剰電力と日中最高電力価格との価格差" ) {
//         operationGainPerKWh = inputData.sunnyDaysRatio * 
//                 application.averageEquivalentCyclesPerDay * 365 * 
//                 inputData.gridAveragePowerPrice *
//                 application.yearsOfUse;  // 系統電力価格がkWhあたりの値段なので、gainの単位も[円/kWh]
//     }

//     return {
//         capex: capexReductionGainPerKWh,
//         opex: operationGainPerKWh,
//         subsidyPerKWh: subsidyPerKWh
//     };
// }

// 蓄電池劣化計算
function calculateSohDeterioration(application) {

    const { yearsOfUse, moduleData, packData, systemData } = application;
    const { cellData } = inputData;
    // セル容量(Wh)
    const cellCapacityWh = cellData.voltage * cellData.capacityAh;
    // モジュール容量(kWh)
    const moduleCapacity = (cellCapacityWh * moduleData.cellsPerModule) / 1000;
    // パック容量(kWh)
    const packCapacity = moduleCapacity * packData.modulesPerPack;
    // システム容量(kWh)
    const systemCapacity = packCapacity * systemData.packsPerSystem;

    const days = yearsOfUse * 365;
    let equivalentCycles = 0;

    // SOHの劣化率 [%]
    if ( application.opexScenario === "電気代と既存エネルギー代の価格差" ) {
        const annualElectricityConsumption = application.annualMileage / application.electricEfficiency;
        equivalentCycles = annualElectricityConsumption * yearsOfUse / systemCapacity

    } else if ( application.opexScenario === "余剰電力と日中最高電力価格との価格差" ) {
        equivalentCycles = application.averageEquivalentCyclesPerDay * days
    }
    
    const sohDeterioration = (inputData.CalendarDegradationFactor * days + inputData.CycleDegradationFactor * equivalentCycles) * 0.001  // 係数を1000倍しているので割り戻す

    return sohDeterioration;
}

