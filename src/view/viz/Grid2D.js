/** @module */
import colorBlender from './colorBlender.js'
import getTallyFractionsNameForVote from './getTallyFractionsNameForVote.js'

/**
 * Draw grid cells to show votes.
 * Basically, we have a rectangular grid of voter support.
 * Even if the voterGeom is a circle.
 * Later, when we draw, we make a clip in the shape of the voterGeom,
 * and draw the grid inside the clip.
 * @param {Screen} screen
 * @constructor
 */
export default function Grid2D(candidateList, screenMain, screenMini) {
    const self = this

    let votesForGeom
    let canList
    let singleCanvas
    const canvases = []
    // TODO: set up canvases before update?

    self.update = (votesForGeom0) => {
        votesForGeom = votesForGeom0
        canList = candidateList.getEntities()

        const { grid, voteSet } = votesForGeom
        const { densityProfile } = grid.voterGeom

        const nCans = canList.length
        const nHeight = Math.floor((nCans - 1) / 3) + 1
        screenMini.setHeight(nHeight * (1 / 3) * screenMini.common.height)

        const isGauss = densityProfile === 'gaussian'

        fillDataSeparate()
        fillDataBlend()

        function fillDataSeparate() {
            // make image data
            const { nx, ny, density } = grid
            canvases.splice(0)
            const tallyName = getTallyFractionsNameForVote(voteSet[0])
            for (let i = 0; i < canList.length; i++) {
                const canvas = document.createElement('canvas')
                canvas.width = nx
                canvas.height = ny
                const offCtx = canvas.getContext('2d')
                const imageData = offCtx.createImageData(nx, ny)

                const { data } = imageData

                const { colorRGBA } = canList[i]
                const [r, g, b] = colorRGBA

                let k = 0
                for (let yp = 0; yp < ny; yp++) {
                    for (let xp = 0; xp < nx; xp++) {
                        const support = voteSet[k][tallyName][i]
                        const a = support * ((isGauss) ? density[k] : 1) * 255

                        data[(xp + yp * nx) * 4 + 0] = r
                        data[(xp + yp * nx) * 4 + 1] = g
                        data[(xp + yp * nx) * 4 + 2] = b
                        data[(xp + yp * nx) * 4 + 3] = a
                        k += 1
                    }
                }
                canvases.push(canvas)
                offCtx.putImageData(imageData, 0, 0)
            }
        }

        function fillDataBlend() {
        // make image data
            const { nx, ny, density } = grid
            const colorSet = canList.map((can) => can.colorRGBA)

            const canvas = document.createElement('canvas')
            canvas.width = nx
            canvas.height = ny
            const offCtx = canvas.getContext('2d')
            const imageData = offCtx.createImageData(nx, ny)

            const { data } = imageData

            const tallyName = getTallyFractionsNameForVote(voteSet[0])

            let k = 0
            for (let yp = 0; yp < ny; yp++) {
                for (let xp = 0; xp < nx; xp++) {
                    const tallyFractions = voteSet[k][tallyName]
                    const [r, g, b] = colorBlender(tallyFractions, colorSet)

                    const a = ((isGauss) ? density[k] : 1) * 255

                    data[(xp + yp * nx) * 4 + 0] = r
                    data[(xp + yp * nx) * 4 + 1] = g
                    data[(xp + yp * nx) * 4 + 2] = b
                    data[(xp + yp * nx) * 4 + 3] = a
                    k += 1
                }
            }
            singleCanvas = canvas
            offCtx.putImageData(imageData, 0, 0)
        }
    }

    self.render = function () {
        const { width, voterGeom } = votesForGeom.grid
        const { x, y, w, densityProfile } = voterGeom

        drawBlend()

        drawSeparate()

        function drawSeparate() {
            const { ctx } = screenMini
            const { darkMode } = screenMini.common
            // draw each can separately
            const nCans = canList.length
            for (let i = 0; i < nCans; i++) {
                // draw image
                // transform is t
                ctx.save()
                // ctx.globalAlpha = 0.7
                const t = {
                    w: 1 / 3, h: 1 / 3, x: (i % 3) * 100, y: Math.floor(i / 3) * 100,
                }

                // shape
                const sh = {
                    x: x * t.w + t.x,
                    y: y * t.h + t.y,
                    r: w * t.w * 0.5,
                }
                const clipShape = {
                    x: x * t.w + t.x,
                    y: y * t.h + t.y,
                    r: width * t.w * 0.5,
                }

                // clip outline of shape
                ctx.beginPath()
                ctx.arc(clipShape.x, clipShape.y, clipShape.r, 0, 2 * Math.PI)
                ctx.clip()

                ctx.beginPath()
                ctx.rect(t.x, t.y, 100, 100)
                ctx.clip()

                const canvas = canvases[i]
                const im = {
                    x: x * t.w - width * t.w * 0.5 + t.x,
                    y: y * t.w - width * t.w * 0.5 + t.y,
                    w: width * t.w,
                    h: width * t.h,
                }
                ctx.drawImage(canvas, im.x, im.y, im.w, im.h)

                // draw outline of shape
                if (densityProfile === 'gaussian') {
                    ctx.setLineDash([1 / 3, 9 / 3])
                    ctx.lineWidth = 5 / 3
                }
                ctx.strokeStyle = '#555'
                if (darkMode) ctx.strokeStyle = '#ddd'
                ctx.beginPath()
                ctx.arc(sh.x, sh.y, sh.r, 0, 2 * Math.PI)
                ctx.stroke()
                ctx.restore()
            }
        }

        function drawBlend() {
            const { ctx } = screenMain
            const { darkMode } = screenMain.common
            ctx.save()
            // ctx.globalAlpha = 0.7

            // clip outline of shape
            ctx.beginPath()
            ctx.arc(x, y, width * 0.5, 0, 2 * Math.PI)
            ctx.clip()

            // draw image
            // transform is t
            const t = {
                w: 1, h: 1, x: 0, y: 0,
            }
            const canvas = singleCanvas
            ctx.imageSmoothingEnabled = false
            const ov = {
                x: x - width * 0.5 + t.x,
                y: y - width * 0.5 + t.y,
                w: width * t.w,
                h: width * t.h,
            }
            ctx.drawImage(canvas, ov.x, ov.y, ov.w, ov.h)

            // draw outline of shape
            if (densityProfile === 'gaussian') {
                ctx.setLineDash([1, 9])
                ctx.lineWidth = 5
            }
            ctx.strokeStyle = '#555'
            if (darkMode) ctx.strokeStyle = '#ddd'
            ctx.beginPath()
            ctx.arc(x, y, w * 0.5, 0, 2 * Math.PI)
            ctx.stroke()

            ctx.restore()
        }
    }
}
