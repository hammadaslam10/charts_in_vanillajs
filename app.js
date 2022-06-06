// ================================================================== //
// Chart I: Type: Bar & Line
// ================================================================== //
var DataLP = {
    datasets: [
        {
          type: 'line',
           borderColor: cssColors['second-font-color'],
          fill: false,
          borderWidth: '1',
          data: totalsAccGroupedByDate  
        } ,
        {
            backgroundColor: bgC.green,
             data: incomeGroupedByDate
        },
        {
            backgroundColor: bgC.red,
             data: costGroupedByDate
        }]
};

var optionsLP = {
    title: { display: true, text: 'Liquidity Planning', fontSize: '24', fontFamily: "'Roboto', sans-serif"},
    legend: { display: false},
    scales: {
        xAxes: [{
            type: 'time', time: {unit: 'day'}, gridLines: {display: false}
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true, userCallback: function(value) {
                    value = value.toString();
                    return '€' + value;
                }
            }
        }]
    }
};

var Mixed = document.getElementById('LiquidityPlanning').getContext('2d');
var MixedChart = new Chart(Mixed, {type: 'bar', data: DataLP, options: optionsLP});

// costGroupedByDate.forEach(e => {console.log(`Data structure: x=${e.x} || y=${e.y}`);});

document.getElementById('card-1').style.display = 'none';
// ================================================================== //
// Chart II: Type: Pie / Doughnut
// ================================================================== //
function updateStreamEC() {
    cashStreamEC = document.getElementById('cashstreamEC').value;
    
    let newDataEC = (cashStreamEC == "Income") ? incomeGroupedByCategory : costGroupedByCategory;
    PieChart.data = setDataEC(newDataEC);
    PieChart.update();
}

function setDataEC(ByStream) {
    return {
    datasets: [{
        backgroundColor: backgroundColorCategory,
        data: ByStream.amount,
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: '1'
    }]
         ,
        labels: ByStream.category,
    };
}

var DataEC = setDataEC(costGroupedByCategory);

// console.log(costGroupedByCategory.category);
// console.log(costGroupedByCategory.amount);

var optionsEC = {
    title: { display: true, text: 'Expenses per Category', fontSize: '24', fontFamily: "'Roboto', sans-serif"},
    legend: { display: true, position: 'right', align: 'center'},
    cutoutPercentage: 50
}

var Pie = document.getElementById('ExpensesByCategory').getContext('2d');
PieChart = new Chart(Pie, { type: 'doughnut', data: DataEC, options: optionsEC});

document.getElementById('card-2').style.display = 'none';
// ================================================================== //
// Chart III: Type: Polar
// ================================================================== //
var DataEPM = {
    datasets: [{
      label: 'Payment Method',
      borderColor: 'rgb(1,206,145)',
      backgroundColor: 'rgba(1,206,145, 0.2)',
      borderWidth: '2',
      data: costGroupedByPaymentMethod.amount
    }],
    labels: costGroupedByPaymentMethod.category
}

var optionsEPM = {
    title: { display: true, text: 'Expense per Payment Method [in %]', fontSize: '24', fontFamily: "'Roboto', sans-serif"},
    legend: { display: false},
    scale: { 
        gridLines: {color: 'white'},
        ticks: {max: 40, min: 0, stepSize: 10},
        pointLabels: { fontSize: '16'}
    }
}

var Polar = document.getElementById('ExpensesByPaymentMethod').getContext('2d');
var PolarChart = new Chart(Polar, { type: 'radar', data: DataEPM, options: optionsEPM});
document.getElementById('card-3').style.display = 'none';

// ================================================================== //
// Chart IV: Type: Bubble
// ================================================================== //

var DataECB = {datasets: costGroupedByCategoryBenchmark};
var optionsECB = {};

var Scatter = document.getElementById('ExpensesByCategoryBenchmark').getContext('2d');
var ScatterChart = new Chart(Scatter, { type: 'bubble', data: DataECB, options: optionsECB});

/*costGroupedByCategoryBenchmark.forEach( e => {
    console.log(`Background color: ${e.backgroundColor}`);
    console.log(`label: ${e.label}`);
    console.log(`data: x=${e.data[0].x}, y=${e.data[0].y}, r=${e.data[0].r}`);
    console.log(`============================`);
})*/
