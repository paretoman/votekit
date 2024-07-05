// import Plotly from 'plotly.js-dist-min'
const TESTER = document.getElementById('tester');
Plotly.newPlot( TESTER, [{
x: [1, 2, 3, 4, 2],
y: [1, 2, 4, 8, 16] ,
mode: 'lines',
type: 'scatter'}], {
margin: { t: 0 } } );