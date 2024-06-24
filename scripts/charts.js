function createBarTrace(x, y, name, color) {
  const trace = {
    x: x,
    y: y,
    name: name,
    type: 'bar',
  };

  if (color) {
    trace.marker = {
      color: color,
    };
  }

  return trace;
}

function prepareGraphData(primaryUse, secondaryUse) {
  const primaryApplication = inputData.applications.find(
    (app) => app.name === primaryUse
  );
  const secondaryApplication = inputData.applications.find(
    (app) => app.name === secondaryUse
  );

  if (primaryApplication && secondaryApplication) {
    const costs = calculatePrimaryAndSecondaryCosts(
      primaryApplication,
      secondaryApplication,
      inputData
    );

    const primaryTotalCostPerKWh =
      costs.primaryCosts.batteryCostPerKWh +
      costs.primaryCosts.pcsCostPerKWh +
      costs.primaryCosts.constructionCostPerKWh +
      costs.primaryCosts.otherCostPerKWh +
      costs.primaryCosts.monitoringCostPerKWh;
    const secondaryTotalCostPerKWh =
      costs.secondaryCosts.batteryCostPerKWh +
      costs.secondaryCosts.pcsCostPerKWh +
      costs.secondaryCosts.constructionCostPerKWh +
      costs.secondaryCosts.otherCostPerKWh +
      costs.secondaryCosts.monitoringCostPerKWh;

    const reconfigurationCostPerKWh = calculateReconfigurationCostPerKWh(
      primaryApplication,
      secondaryApplication,
      inputData
    );

    const cascadeCostPerKWh =
      costs.primaryCosts.batteryCostPerKWh + reconfigurationCostPerKWh;

    const costAllocationRate = inputData.costAllocationRate;
    const primaryLeaseCostPerKWh =
      cascadeCostPerKWh * costAllocationRate * (1 + inputData.leaseRecoveryRate);
    const secondaryLeaseCostPerKWh =
      cascadeCostPerKWh * (1 - costAllocationRate) * (1 + inputData.leaseRecoveryRate);

    const primaryCascadeBatteryCostPerKWh =
      primaryLeaseCostPerKWh +
      costs.primaryCosts.pcsCostCascadePerKWh +
      costs.primaryCosts.constructionCostPerKWh +
      costs.primaryCosts.otherCostPerKWh +
      costs.primaryCosts.monitoringCostPerKWh;
    const secondaryCascadeBatteryCostPerKWh =
      secondaryLeaseCostPerKWh +
      costs.secondaryCosts.pcsCostCascadePerKWh +
      costs.secondaryCosts.constructionCostPerKWh +
      costs.secondaryCosts.otherCostPerKWh +
      costs.secondaryCosts.monitoringCostPerKWh;

    const primaryGainPerKWh = calculateGainPerKWh(primaryApplication, inputData);
    const secondaryGainPerKWh = calculateGainPerKWh(
      secondaryApplication,
      inputData
    );
    const primaryTotalGainPerKWh =
      primaryGainPerKWh.capex +
      primaryGainPerKWh.opex +
      primaryGainPerKWh.subsidyPerKWh;
    const secondaryTotalGainPerKWh =
      secondaryGainPerKWh.capex +
      secondaryGainPerKWh.opex +
      secondaryGainPerKWh.subsidyPerKWh;

    primarySohDeterioration = calculateSohDeterioration(
      primaryApplication,
      inputData
    );
    secondarySohDeterioration = calculateSohDeterioration(
      secondaryApplication,
      inputData
    );

    economicChartData = [
      createBarTrace(
        [primaryUse, secondaryUse],
        [primaryTotalGainPerKWh, secondaryTotalGainPerKWh],
        '経済利得'
      ),
      createBarTrace(
        [primaryUse, secondaryUse],
        [primaryTotalCostPerKWh, secondaryTotalCostPerKWh],
        '既存電池コスト'
      ),
      createBarTrace(
        [primaryUse, secondaryUse],
        [primaryCascadeBatteryCostPerKWh, secondaryCascadeBatteryCostPerKWh],
        'カスケード電池コスト'
      ),
    ];

    costChartData = [
      createBarTrace(
        [
          '新品 - ' + primaryUse,
          'カスケード - ' + primaryUse,
          '新品 - ' + secondaryUse,
          'カスケード - ' + secondaryUse,
          'カスケード - リース事業者',
        ],
        [
          costs.primaryCosts.cellCostPerKWh,
          0,
          costs.secondaryCosts.cellCostPerKWh,
          0,
          costs.primaryCosts.cellCostPerKWh,
        ],
        'セル',
        '#0055aa'
      ),
      createBarTrace(
        [
          '新品 - ' + primaryUse,
          'カスケード - ' + primaryUse,
          '新品 - ' + secondaryUse,
          'カスケード - ' + secondaryUse,
          'カスケード - リース事業者',
        ],
        [
          costs.primaryCosts.moduleCostPerKWh,
          0,
          costs.secondaryCosts.moduleCostPerKWh,
          0,
          costs.primaryCosts.moduleCostPerKWh,
        ],
        'モジュール',
        '#006ad5'
      ),
      createBarTrace(
        [
          '新品 - ' + primaryUse,
          'カスケード - ' + primaryUse,
          '新品 - ' + secondaryUse,
          'カスケード - ' + secondaryUse,
          'カスケード - リース事業者',
        ],
        [
          costs.primaryCosts.packCostPerKWh,
          0,
          costs.secondaryCosts.packCostPerKWh,
          0,
          costs.primaryCosts.packCostPerKWh,
        ],
        'パック',
        '#0080ff'
      ),
      createBarTrace(
        [
          '新品 - ' + primaryUse,
          'カスケード - ' + primaryUse,
          '新品 - ' + secondaryUse,
          'カスケード - ' + secondaryUse,
          'カスケード - リース事業者',
        ],
        [0, primaryLeaseCostPerKWh, 0, secondaryLeaseCostPerKWh, 0],
        'リース',
        '#00aa55'
      ),
      createBarTrace(
        [
          '新品 - ' + primaryUse,
          'カスケード - ' + primaryUse,
          '新品 - ' + secondaryUse,
          'カスケード - ' + secondaryUse,
          'カスケード - リース事業者',
        ],
        [
          costs.primaryCosts.pcsCostPerKWh,
          costs.primaryCosts.pcsCostCascadePerKWh,
          costs.secondaryCosts.pcsCostPerKWh,
          costs.secondaryCosts.pcsCostCascadePerKWh,
          0,
        ],
        'PCS',
        '#ffaa55'
      ),
      createBarTrace(
        [
          '新品 - ' + primaryUse,
          'カスケード - ' + primaryUse,
          '新品 - ' + secondaryUse,
          'カスケード - ' + secondaryUse,
          'カスケード - リース事業者',
        ],
        [
          costs.primaryCosts.constructionCostPerKWh,
          costs.primaryCosts.constructionCostPerKWh,
          costs.secondaryCosts.constructionCostPerKWh,
          costs.secondaryCosts.constructionCostPerKWh,
          0,
        ],
        '工事',
        '#ffbf80'
      ),
      createBarTrace(
        [
          '新品 - ' + primaryUse,
          'カスケード - ' + primaryUse,
          '新品 - ' + secondaryUse,
          'カスケード - ' + secondaryUse,
          'カスケード - リース事業者',
        ],
        [
          costs.primaryCosts.otherCostPerKWh,
          costs.primaryCosts.otherCostPerKWh,
          costs.secondaryCosts.otherCostPerKWh,
          costs.secondaryCosts.otherCostPerKWh,
          0,
        ],
        'その他',
        '#ffd5aa'
      ),
      createBarTrace(
        [
          '新品 - ' + primaryUse,
          'カスケード - ' + primaryUse,
          '新品 - ' + secondaryUse,
          'カスケード - ' + secondaryUse,
          'カスケード - リース事業者',
        ],
        [
          costs.primaryCosts.monitoringCostPerKWh,
          0,
          costs.secondaryCosts.monitoringCostPerKWh,
          0,
          costs.primaryCosts.monitoringCostPerKWh +
            costs.secondaryCosts.monitoringCostPerKWh,
        ],
        'モニタリング',
        '#ffead5'
      ),
      createBarTrace(
        [
          '新品 - ' + primaryUse,
          'カスケード - ' + primaryUse,
          '新品 - ' + secondaryUse,
          'カスケード - ' + secondaryUse,
          'カスケード - リース事業者',
        ],
        [0, 0, 0, 0, reconfigurationCostPerKWh],
        '転用',
        '#a9a9a9'
      ),
    ];

    return {
      economicChartData,
      costChartData,
    };
  }

  return null;
}

function updatePlots() {
  const primaryUse = document.getElementById('primaryUse').value;
  const secondaryUse = document.getElementById('secondaryUse').value;

  const graphData = prepareGraphData(primaryUse, secondaryUse);

  if (graphData.economicChartData) {
    const layout = {
      title: 'カスケード利用の経済性比較',
      barmode: 'group',
      xaxis: {
        title: '用途',
      },
      yaxis: {
        title: '金額（円/kWh）',
        range: settings['economicChart'].graphs.yaxis.range,
      },
      autosize: true,
      responsive: true
    };

    Plotly.newPlot('economicChart', graphData.economicChartData, layout);
    updateInfo();
  }
  if (graphData.costChartData) {
    const layout = {
      title: 'コスト内訳',
      barmode: 'stack',
      xaxis: {
        title: '用途',
      },
      yaxis: {
        title: '金額（円/kWh）',
        range: settings['costChart'].graphs.yaxis.range,
      },
      autosize: true,
      responsive: true
    };

    Plotly.newPlot('costChart', graphData.costChartData, layout);
  }
  resizeGraphs();
}

function resizeGraphs() {
  const economicChart = document.getElementById('economicChart');
  const costChart = document.getElementById('costChart');

  if (economicChart) {
    Plotly.relayout(economicChart, {
      width: economicChart.offsetWidth,
      height: economicChart.offsetHeight
    });
  }

  if (costChart) {
    Plotly.relayout(costChart, {
      width: costChart.offsetWidth,
      height: costChart.offsetHeight
    });
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
