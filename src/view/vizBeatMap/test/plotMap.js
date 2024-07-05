export default function plotMap(bm) {
    let cn = bm.x.length
    let pn = bm.x[0].length
    let dataset = []
    
    const TESTER = document.getElementById('tester');
    for(let k = 0; k < cn; k++){
        for (let j = 0; j < pn; j++) {

            let data = {
                x: bm.x[k][j],
                y: bm.y[k][j],
                mode: 'lines',
                type: 'scatter'}
            dataset.push(data)
            
        }
    }
    Plotly.newPlot( TESTER, dataset, {margin: { t: 0 } } );
}
