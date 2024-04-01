// グラフ描画用のデータを作成する
function createBarTrace(x, y, name, color) {
  const trace = {
    x: x,
    y: y,
    name: name,
    type: 'bar'
  };

  if (color) {
    trace.marker = {
      color: color
    };
  }

  return trace;
}

// グラフ描画用のデータを準備する
function prepareGraphData(primaryUse, secondaryUse, inputData) {
  // 選択された用途の情報を取得
  const primaryApplication = inputData.applications.find((app) => app.name === primaryUse);
  const secondaryApplication = inputData.applications.find((app) => app.name === secondaryUse);

  if (primaryApplication && secondaryApplication) {

    // 各種コスト計算
    const costs = calculatePrimaryAndSecondaryCosts(primaryApplication, secondaryApplication, inputData);

    // 新品蓄電池コスト
    const primaryTotalCostPerKWh = costs.primaryCosts.batteryCostPerKWh +
                                   costs.primaryCosts.pcsCostPerKWh +
                                   costs.primaryCosts.constructionCostPerKWh +
                                   costs.primaryCosts.otherCostPerKWh +
                                   costs.primaryCosts.monitoringCostPerKWh;
    const secondaryTotalCostPerKWh = costs.secondaryCosts.batteryCostPerKWh +
                                     costs.secondaryCosts.pcsCostPerKWh+
                                     costs.secondaryCosts.constructionCostPerKWh +
                                     costs.secondaryCosts.otherCostPerKWh +
                                     costs.secondaryCosts.monitoringCostPerKWh;

    // カスケードに必要な再構成コスト
    const reconfigurationCostPerKWh = calculateReconfigurationCostPerKWh(primaryApplication, secondaryApplication, inputData);

    // カスケードでリース会社が負担するコスト
    const cascadeCostPerKWh = primaryTotalCostPerKWh +
                              reconfigurationCostPerKWh;

    // リース回収率と按分比率を考慮して決定するリース料
    const costAllocationRate = inputData.costAllocationRate;
    const primaryLeaseCostPerKWh = cascadeCostPerKWh * costAllocationRate * (1 + inputData.leaseRecoveryRate);
    const secondaryLeaseCostPerKWh = cascadeCostPerKWh * (1 - costAllocationRate) * (1 + inputData.leaseRecoveryRate);

    // カスケードでユーザーが負担するコスト
    const primaryCascadeBatteryCostPerKWh = primaryLeaseCostPerKWh +
                                            costs.primaryCosts.pcsCostCascadePerKWh +
                                            costs.primaryCosts.constructionCostPerKWh +
                                            costs.primaryCosts.otherCostPerKWh +
                                            costs.primaryCosts.monitoringCostPerKWh;                                            
    const secondaryCascadeBatteryCostPerKWh = secondaryLeaseCostPerKWh +
                                              costs.secondaryCosts.pcsCostCascadePerKWh  +
                                              costs.secondaryCosts.constructionCostPerKWh +
                                              costs.secondaryCosts.otherCostPerKWh +
                                              costs.secondaryCosts.monitoringCostPerKWh;

    // 経済利得
    const primaryGainPerKWh = calculateGainPerKWh(primaryApplication, inputData);
    const secondaryGainPerKWh = calculateGainPerKWh(secondaryApplication, inputData);
    const primaryTotalGainPerKWh = primaryGainPerKWh.capex + primaryGainPerKWh.opex + primaryGainPerKWh.subsidyPerKWh;
    const secondaryTotalGainPerKWh = secondaryGainPerKWh.capex + secondaryGainPerKWh.opex + secondaryGainPerKWh.subsidyPerKWh;


    economicChartData = [
      createBarTrace([primaryUse, secondaryUse], [primaryTotalGainPerKWh, secondaryTotalGainPerKWh], '経済利得'),
      createBarTrace([primaryUse, secondaryUse], [primaryTotalCostPerKWh, secondaryTotalCostPerKWh], '既存電池コスト'),
      createBarTrace([primaryUse, secondaryUse], [primaryCascadeBatteryCostPerKWh, secondaryCascadeBatteryCostPerKWh], 'カスケード電池コスト')
    ];

    costChartData = [
      createBarTrace(['新品 - ' + primaryUse, 'カスケード - ' + primaryUse, '新品 - ' + secondaryUse, 'カスケード - ' + secondaryUse, 'カスケード - リース事業者'],
                     [costs.primaryCosts.cellCostPerKWh, 0, costs.secondaryCosts.cellCostPerKWh, 0, costs.primaryCosts.cellCostPerKWh],
                     'セル', '#0055aa'),
      createBarTrace(['新品 - ' + primaryUse, 'カスケード - ' + primaryUse, '新品 - ' + secondaryUse, 'カスケード - ' + secondaryUse, 'カスケード - リース事業者'],
                     [costs.primaryCosts.moduleCostPerKWh, 0, costs.secondaryCosts.moduleCostPerKWh, 0, costs.primaryCosts.moduleCostPerKWh],
                     'モジュール', '#006ad5'),
      createBarTrace(['新品 - ' + primaryUse, 'カスケード - ' + primaryUse, '新品 - ' + secondaryUse, 'カスケード - ' + secondaryUse, 'カスケード - リース事業者'],
                     [costs.primaryCosts.packCostPerKWh, 0, costs.secondaryCosts.packCostPerKWh, 0, costs.primaryCosts.packCostPerKWh],
                     'パック', '#0080ff'),
      createBarTrace(['新品 - ' + primaryUse, 'カスケード - ' + primaryUse, '新品 - ' + secondaryUse, 'カスケード - ' + secondaryUse, 'カスケード - リース事業者'],
                     [0, primaryLeaseCostPerKWh, 0, secondaryLeaseCostPerKWh, 0],
                     'リース', '#00aa55'),
      createBarTrace(['新品 - ' + primaryUse, 'カスケード - ' + primaryUse, '新品 - ' + secondaryUse, 'カスケード - ' + secondaryUse, 'カスケード - リース事業者'],
                     [costs.primaryCosts.pcsCostPerKWh, costs.primaryCosts.pcsCostCascadePerKWh, costs.secondaryCosts.pcsCostPerKWh, costs.secondaryCosts.pcsCostCascadePerKWh, 0],
                     'PCS', '#ffaa55'),
      createBarTrace(['新品 - ' + primaryUse, 'カスケード - ' + primaryUse, '新品 - ' + secondaryUse, 'カスケード - ' + secondaryUse, 'カスケード - リース事業者'],
                     [costs.primaryCosts.constructionCostPerKWh, costs.primaryCosts.constructionCostPerKWh, costs.secondaryCosts.constructionCostPerKWh, costs.secondaryCosts.constructionCostPerKWh, 0],
                     '工事', '#ffbf80'),
      createBarTrace(['新品 - ' + primaryUse, 'カスケード - ' + primaryUse, '新品 - ' + secondaryUse, 'カスケード - ' + secondaryUse, 'カスケード - リース事業者'],
                     [costs.primaryCosts.otherCostPerKWh, costs.primaryCosts.otherCostPerKWh, costs.secondaryCosts.otherCostPerKWh, costs.secondaryCosts.otherCostPerKWh, 0],
                     'その他', '#ffd5aa'),
      createBarTrace(['新品 - ' + primaryUse, 'カスケード - ' + primaryUse, '新品 - ' + secondaryUse, 'カスケード - ' + secondaryUse, 'カスケード - リース事業者'],
                     [costs.primaryCosts.monitoringCostPerKWh, costs.primaryCosts.monitoringCostPerKWh, costs.secondaryCosts.monitoringCostPerKWh, costs.secondaryCosts.monitoringCostPerKWh, 0],
                     'モニタリング', '#ffead5'),
      createBarTrace(['新品 - ' + primaryUse, 'カスケード - ' + primaryUse, '新品 - ' + secondaryUse, 'カスケード - ' + secondaryUse, 'カスケード - リース事業者'],
                     [0, 0, 0, 0, reconfigurationCostPerKWh],
                     '転用', '#a9a9a9')
    ];


    return {
      economicChartData,
      costChartData,
    }
  }

  return null;
}

// グラフを更新する
function updatePlots() {
  const primaryUse = document.getElementById('primaryUse').value;
  const secondaryUse = document.getElementById('secondaryUse').value;

  const graphData = prepareGraphData(primaryUse, secondaryUse, inputData);

  if (graphData.economicChartData) {
    const layout = {
      title: 'カスケード利用の経済性比較',
      barmode: 'group',
      xaxis: {
        title: '用途'
      },
      yaxis: {
        title: '金額（円/kWh）',
        range: settings['economicChart'].graphs.yaxis.range, // 縦軸の範囲を設定
      }
    };

    Plotly.newPlot('economicChart', graphData.economicChartData, layout);
    // updateInfo(primaryUse, secondaryUse, graphData.economicChartData);
  }
  if (graphData.costChartData) {
    const layout = {
      title: 'コスト内訳',
      barmode: 'stack',
      xaxis: {
        title: '用途'
      },
      yaxis: {
        title: '金額（円/kWh）',
        range: settings['costChart'].graphs.yaxis.range, // 縦軸の範囲を設定
      }
    };

    Plotly.newPlot('costChart', graphData.costChartData, layout);
  }

}