import { cos, evaluate, matrix, min, pi, sin, sqrt, transpose, zeros } from "mathjs"
// import { Plots } from "plotly.js"

let t = transpose

// let c = t(matrix([[1, 0]]))
// let c = t(matrix([[0, 0]]))
let c = evaluate(`[1,0]'`)
let v = evaluate(`[0, -1 ; sqrt(3)/2, 1/2 ; -sqrt(3)/2, 1/2 ]'`)
// let v = t(matrix([[0, -1] , [sqrt(3)/2, 1/2] , [-sqrt(3)/2, 1/2] ]))
let blist = beatMap(c,v)

let xb = evaluate(`blist[1,:]`,{blist}).toArray()[0]
let yb = evaluate(`blist[2,:]`,{blist}).toArray()[0]



const TESTER = document.getElementById('tester');
Plotly.newPlot( TESTER, [{
x: xb,
y: yb,
mode: 'lines',
type: 'scatter'}], {
margin: { t: 0 } } );

function beatMap(c,v) {
    let N = 1000
    let blist = zeros(2,N)
    for (let i = 0; i < N; i++) {
        const angle = i / N * pi
        const d = t(matrix([[ cos(angle), sin(angle)]])) // direction
        // const vp = multiply(t(d),v) // voter projection
        // const mp = median(vp) // median projection
        
        // const ap = multiply(t(d),c)
        // const mpap = subtract(mp , ap) // vector from a to m, in projected space
        // const bap = multiply(mpap , 2) // vector to b from a, in projected space
        // const ba = t(kron(d,bap)) // vector to b from a
        // const b = add(c, ba)
        let b = evaluate(`c + 2 * d * (quantileSeq(d' * v,.5) - d' * c)`,{c,d,d,v,d,c})
        // let b = evaluate(`c + 2 * d * min(0, quantileSeq(d' * v,.5) - d' * c)`,{c,d,d,v,d,c})
        
        // let b = evaluate(`c + 2 * d * (median(d' * v) - d' * c)`,{c,d,d,v,d,c})
        let j = i + 1
        evaluate(`blist[:,j] = b`,{blist,j,b})
    }
    return matrix( blist)
}

// https://mathjs.org/docs/reference/functions/quantileSeq.html