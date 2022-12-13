function initialize(){
let dataArray =[]

function initBoth(){

    let array = Array.from({length: Math.floor(Math.random() * (1000 - 500 + 1) + 500)});
    let prices = array.map(() => Math.floor(Math.random() * (1000 - 500 + 1) + 500));
    let cost =  Math.floor(Math.random() * (500 - 100 + 1) + 100)
    prices[0] = 0
    let length = prices.length -1;
    




// Function to solve the cut-rod with fixed cut cost problem using recursive memorization
function cutRod(p, n, c, memo) {
    // If the length of the rod is 0 or the price array is empty, return 0
    if (n === 0 || p.length === 0) return 0;
  
    // If the memo array already has a value for the current length of the rod, return it
    if (memo[n] !== undefined) return memo[n];

    let cuts = new Array();
  
    // Initialize the maximum revenue to the revenue from not cutting the rod
    let maxRevenue = p[n];
  
    // Loop through all possible cuts of the rod
    for (let i = 1; i < n; i++) {
      // Calculate the revenue from cutting the rod at the current point, taking into account the fixed cost of making a cut
      let revenue = cutRod(p, i, c, memo) + cutRod(p, n - i, c, memo) - c;
      // Update the maximum revenue if the current revenue is greater
      if (maxRevenue < revenue) {
        maxRevenue = revenue
        cuts.push(i);
      }
    }
  
    // Store the maximum revenue in the memo array and return it
    return {maxValue: memo[n] = maxRevenue,
            optSol: defineCut(cuts,n),
    };
  }
  
 


  // Example usage
  let memo = new Array(length + 1);
  let startTime = performance.now();
  
  let maxRevenue = cutRod(prices, length, cost, memo);
  console.log(maxRevenue)


  let endTime = performance.now();
  let recursiveTime = endTime - startTime;
  console.log(`Tempo Passado com recursividade: ${recursiveTime / 1000} segundos`); // Prints the number of seconds


// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------

function cutRodInteraction(length, prices, cost) {
    // Create an array to store the maximum profit for each length of rod
    let maxProfits = new Array(length + 1).fill(0);
    let cuts = new Array(length);
  
    // Loop through each possible length of rod
    for (let i = 1; i <= length; i++) {
      // Set the maximum profit for the current length to the profit of the first cut
      let maxProfit = prices[i];
  
      // Loop through each possible first cut
      for (let j = 1; j < i; j++) {
        // Calculate the maximum profit by making a first cut at j and then cutting the remaining piece optimally
        let profit = maxProfits[j] + prices[i - j] - cost;
  
        // Update the maximum profit if the current profit is higher
        if (profit > maxProfit) {
          maxProfit = profit;
          cuts[j] = i-j;
        }
      }
  
      // Store the maximum profit for the current length
      maxProfits[i] = maxProfit;
    }
  
    // Return the maximum profit for the given length of rod
   
  
    return {maxValue: maxProfits[length],
          optSol: maxRevenue.optSol
  };
  }
    
    function defineCut(cuts, n){
      cuts = cuts.filter((item)=> item!== undefined)
      let num = cuts.reduce(function(acumulador, valorAtual) {
           return acumulador + valorAtual;
         }, 0);
       return num < n ?   [...cuts,n-num] : cuts
     }
   
   
  
  
  let TempoInicial = performance.now();
  
  let valorMax = cutRodInteraction(length, prices, cost);
  console.log(valorMax)
  valorMax.optSol = maxRevenue.optSol
  let tempoFinal = performance.now();
  let interativeTime = tempoFinal - TempoInicial;
  console.log(`Tempo Passado interativo: ${interativeTime/1000} segundos`);  // Prints the number of seconds


  dataArray = [...dataArray ,[
    {
        tipoAlgoritmo:'Recursivo com memorizacao',
        tamanhoEntrada: prices.length,
        SolucaoOtima: maxRevenue.optSol,
        valorMaximo: maxRevenue.maxValue,
        tempoDemorado: recursiveTime/1000
    },
    {
        tipoAlgoritmo:'Iterativo',
        tamanhoEntrada: prices.length,
        SolucaoOtima: valorMax.optSol,
        valorMaximo: valorMax.maxValue,
        tempoDemorado: interativeTime/1000
    }]
]


}



for (let i = 0; i < 100; i++) {
    initBoth()
}

const Tamanhos = dataArray.map(item => [item[0].tamanhoEntrada, item[1].tamanhoEntrada])
const TamanhosRecursivos = Tamanhos.map((item)=> item[0]).sort()
const TamanhosIterativos = Tamanhos.map((item)=> item[1]).sort()

const Tempo = dataArray.map(item => [item[0].tempoDemorado, item[1].tempoDemorado])
const TempoRecursivos = Tempo.map((item)=> item[0])
const TempoIterativos = Tempo.map((item)=> item[1])

const ctx = document.getElementById('myChart');



  const DATA_COUNT = 500;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const labels = [...Tamanhos].sort();
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Iterativos',
      data: [...TempoIterativos],
      borderColor:'#E13B3BA8',
      backgroundColor: '#E13B3BA8',
      
    },
    {
        label: 'Recursivos',
        data: [...TempoRecursivos],
        borderColor:'blue',
        backgroundColor: 'blue',
      },
      
  ]
};

const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    },
  };
  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
  });


}
initialize()

const btn = document.querySelector('button')
btn.addEventListener('click', ()=> location.reload() )








// var _gerarCsv = function(){
     
//     let csv = 'tipoAlgoritmo, tamanhoEntrada, SolucaoOtima, valorMaximo, tempoDemorado\n';
 
//     data.forEach(function(row) {
//             csv += row.tipoAlgoritmo;
//             csv += ','+ row.tamanhoEntrada;
//             csv += ','+ row.SolucaoOtima;
//             csv += ','+ row.valorMaximo;
//             csv += ','+ row.tempoDemorado;
//             csv += '\n';
//     });
  
//     var hiddenElement = document.createElement('a');
//     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
//     hiddenElement.target = '_blank';
//     hiddenElement.download = 'produtos.csv';
//     hiddenElement.click();
// };
// _gerarCsv(); 