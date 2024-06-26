const settings = {
  economicChart: {
    graphs: {
      barmode: 'group',
      xaxis: {
        title: 'Application Combinations',
      },
      yaxis: {
        title: 'Cost (JPY)',
        range: [0, 100000],
      }
    }
  },  
  costChart: {
    graphs: {
      barmode: 'group',
      xaxis: {
        title: 'Application Combinations',
      },
      yaxis: {
        title: 'Cost (JPY)',
        range: [0, 100000],
      }
    }
  },  
  sliders: {
    exchangeRate: {
      min: 50,
      max: 300,
      value: 144,
      step: 1,
      label: "為替レート [円/ドル]",
      category: "common",
      dataProperty: "exchangeRate",
      percentage: false
    },
    pricePerKWh: {
      min: 0,
      max: 100000,
      value: 12960,
      step: 10,
      label: "セル価格 [円/kWh]",
      category: "common",
      dataProperty: "cellData.pricePerKWh",
      percentage: false
    },
    gasolinePricePerLiter: {
      min: 50,
      max: 300,
      value: 200,
      step: 1,
      label: "ガソリン価格 [円/L]",
      category: "common",
      dataProperty: "gasolinePricePerLiter",
      percentage: false
    },
    dieselPricePerLiter: {
      min: 50,
      max: 300,
      value: 180,
      step: 1,
      label: "軽油価格 [円/L]",
      category: "common",
      dataProperty: "dieselPricePerLiter",
      percentage: false
    },
    gridAveragePowerPrice: {
      min: 10,
      max: 30,
      value: 12,
      step: 1,
      label: "系統平均電力価格 [円/kWh]",
      category: "common",
      dataProperty: "gridAveragePowerPrice",
      percentage: false
    },
    monitoringCostOpPerYear: {
      min: 0,
      max: 2000,
      value: 801,
      step: 1,
      label: "年間モニタリングコスト原価 [円/年・モニタリング単位]",
      category: "common",
      dataProperty: "monitoringCostOpPerYear",
      percentage: false
    },
    leaseRecoveryRate: {
      min: 0,
      max: 100,
      value: 20,
      step: 1,
      label: "リース回収率 [%]",
      category: "common",
      dataProperty: "leaseRecoveryRate",
      percentage: true
    },
    costAllocationRate: {
      min: 0,
      max: 100,
      value: 50,
      step: 1,
      label: "リース料配分 [%]",
      category: "common",
      dataProperty: "costAllocationRate",
      percentage: true
    },
    CalendarDegradationFactor: {
      min: 0,
      max: 10,
      value: 6,
      step: 0.1,
      label: "SOHのカレンダー劣化係数 [0.001%/days]",
      category: "common",
      dataProperty: "CalendarDegradationFactor",
      percentage: false
    },
    CycleDegradationFactor: {
      min: 0,
      max: 40,
      value: 28,
      step: 0.1,
      label: "SOHのサイクル劣化係数 [0.001%/cycles]",
      category: "common",
      dataProperty: "CycleDegradationFactor",
      percentage: false
    },
    primaryExistingEquipmentCost: {
      min: 0,
      max: 10000000,
      step: 10000,
      label: "既存装置コスト [円/システム]",
      category: "primary",
      dataProperty: "existingEquipmentCost",
      percentage: false
    },
    primaryNewEquipmentCost: {
      min: 0,
      max: 10000000,
      step: 10000,
      label: "新規装置コスト(電池除く) [円/システム]",
      category: "primary",
      dataProperty: "newEquipmentCost",
      percentage: false
    },
    secondaryExistingEquipmentCost: {
      min: 0,
      max: 10000000,
      step: 10000,
      label: "既存装置コスト [円/システム]",
      category: "secondary",
      dataProperty: "existingEquipmentCost",
      percentage: false
    },
    secondaryNewEquipmentCost: {
      min: 0,
      max: 10000000,
      step: 10000,
      label: "新規装置コスト(電池除く) [円/システム]",
      category: "secondary",
      dataProperty: "newEquipmentCost",
      percentage: false
    },
    primaryPcsCostPerKWh: {
      min: 0,
      max: 50000,
      step: 100,
      label: "従来PCSコスト [円/kWh]",
      category: "primary",
      dataProperty: "systemData.pcsCostPerKWh",
      percentage: false
    },
    secondaryPcsCostPerKWh: {
      min: 0,
      max: 50000,
      step: 100,
      label: "従来PCSコスト [円/kWh]",
      category: "secondary",
      dataProperty: "systemData.pcsCostPerKWh",
      percentage: false
    },
    primaryPcsCostCascadePerKWh: {
      min: 0,
      max: 50000,
      step: 100,
      label: "カスケードPCSコスト [円/kWh]",
      category: "primary",
      dataProperty: "systemData.pcsCostCascadePerKWh",
      percentage: false
    },
    secondaryPcsCostCascadePerKWh: {
      min: 0,
      max: 50000,
      step: 100,
      label: "カスケードPCSコスト [円/kWh]",
      category: "secondary",
      dataProperty: "systemData.pcsCostCascadePerKWh",
      percentage: false
    },
    primaryConstructionCostPerKWh: {
      min: 0,
      max: 50000,
      step: 100,
      label: "工事コスト [円/kWh]",
      category: "primary",
      dataProperty: "systemData.constructionCostPerKWh",
      percentage: false
    },
    secondaryConstructionCostPerKWh: {
      min: 0,
      max: 50000,
      step: 100,
      label: "工事コスト [円/kWh]",
      category: "secondary",
      dataProperty: "systemData.constructionCostPerKWh",
      percentage: false
    },
    primaryOtherCostPerKWh: {
      min: 0,
      max: 50000,
      step: 100,
      label: "その他コスト [円/kWh]",
      category: "primary",
      dataProperty: "systemData.otherCostPerKWh",
      percentage: false
    },
    secondaryOtherCostPerKWh: {
      min: 0,
      max: 50000,
      step: 100,
      label: "その他コスト [円/kWh]",
      category: "secondary",
      dataProperty: "systemData.otherCostPerKWh",
      percentage: false
    },
    primarySubsidy: {
      min: 0,
      max: 100000000,
      step: 100,
      label: "補助金 [円/システム]",
      category: "primary",
      dataProperty: "subsidy",
      percentage: false
    },
    secondarySubsidy: {
      min: 0,
      max: 100000000,
      step: 100,
      label: "補助金 [円/システム]",
      category: "secondary",
      dataProperty: "subsidy",
      percentage: false
    },
    primaryYearsOfUse: {
      min: 1,
      max: 20,
      step: 1,
      label: "使用年数 [年]",
      category: "primary",
      dataProperty: "yearsOfUse",
      percentage: false
    },
    secondaryYearsOfUse: {
      min: 1,
      max: 20,
      step: 1,
      label: "使用年数 [年]",
      category: "secondary",
      dataProperty: "yearsOfUse",
      percentage: false
    },
  },
};
