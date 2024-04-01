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
    pricePerKWh: {
      min: 0,
      max: 100000,
      value: 12960,
      step: 10,
      label: "セル価格 [円/kWh]",
      category: "common"
    },
    costAllocationRate: {
      min: 0,
      max: 100,
      value: 50,
      step: 1,
      label: "リース料配分 [%]",
      category: "common"
    },
    primaryPcsCostCascadePerKWh: {
      min: 0,
      max: 100000,
      step: 100,
      label: "1次利用PCSコスト [円/kWh]",
      category: "primary",
      dataProperty: "systemData.pcsCostCascadePerKWh"
    },
    secondaryPcsCostCascadePerKWh: {
      min: 0,
      max: 100000,
      step: 100,
      label: "2次利用PCSコスト [円/kWh]",
      category: "secondary",
      dataProperty: "systemData.pcsCostCascadePerKWh"
    },
  },
};
