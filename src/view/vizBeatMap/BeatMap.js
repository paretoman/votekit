/** @module */

import { rgbToString } from '../viz/colorBlender.js'
import bMap from './bMap.js'

/**
 * Draw beat maps.
 * @constructor
 */
export default function BeatMap() {
    const self = this

    let beatMap
    let colorStrings
    const p = [.1,.2,.3,.4,.5,.6,.7,.8,.9]
    // const p = [.5]

    self.update = function (phaseResults, canList) {
        colorStrings = canList.map((can) => rgbToString(can.colorRGBA))

        const cx = canList.map((can) => can.shape2.x)
        const cy = canList.map((can) => can.shape2.y)
        const {voterGeoms} = phaseResults.geometry
        const x = voterGeoms.map((v) => v.x)
        const y = voterGeoms.map((v) => v.y)
        const w = voterGeoms.map((v) => v.w)
        const densityDecoder = {"step":1,"gaussian":2}
        const d = voterGeoms.map((v) => densityDecoder[v.densityProfile])
        const m = voterGeoms.map((v) => v.densityMax)
        // console.log({x,y,d,w,m,cx,cy,p})
        beatMap = bMap(x,y,d,w,m,cx,cy,p)

    }

    self.render = function (ctx) {

        const cn = beatMap.x.length

        ctx.save()
        ctx.fillStyle = `rgb(0 0 0)`
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)
        ctx.restore()

        for (let j = 0; j < p.length; j++) {
            ctx.save()
            ctx.lineWidth = 1
            const shade = Math.round(p[j] * 255)
            ctx.fillStyle = `rgb(${shade} ${shade} ${shade})`
            for(let k = 0; k < cn; k++){
                
                const x = beatMap.x[k][j]
                const y = beatMap.y[k][j]
                const bc = new Path2D()
                
                bc.moveTo(x[0],y[0])
                for (let i=1; i < x.length; i++) {
                    bc.lineTo(x[i],y[i])
                }    
				bc.closePath()
				ctx.clip(bc)
            }
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)
            ctx.restore()
        }
    }
}
