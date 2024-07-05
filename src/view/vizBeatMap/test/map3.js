import bMap from "../bMap.js"
import plotMap from "./plotMap.js"

// let dw = ["step","gaussian","gaussian"]
// let dw = ["gaussian","gaussian","gaussian"]

// let x = [0 , Math.sqrt(3)/2 , -Math.sqrt(3)/2 ]
// let y = [-1 , 1/2 ,  1/2 ]
// let w = [.1,.2,.3]
// let w = [.1,.1,.1]
// let m = [.1,.1,.1]

// let m = [1,2,3]
// let cx = [1,-1,0]
// let cy = [0,0,1]
// let q = [.1,.2,.3,.4,.5,.6,.7,.8]


let dw = ["step"]
let x = [0]
let y = [0]
let w = [1]
let m = [1]
let q = [.5]
let cx = [0.001]
let cy = [0]


let transD = {"step":1,"gaussian":2}
let d = dw.map((w)=>transD[w])

let bm = bMap(x,y,d,w,m,cx,cy,q)
plotMap(bm)

