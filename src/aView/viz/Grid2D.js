/** @module */
import colorBlender from './colorBlender.js'

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

    let gridData
    let canList
    let singleCanvas
    const canvases = []
    // TODO: set up canvases before update?

    self.update = (gridData0) => {
        gridData = gridData0
        canList = candidateList.getCandidates()

        const { grid, voteSet, voterGeom } = gridData

        const nCans = canList.length
        const nHeight = Math.floor((nCans - 1) / 3) + 1
        screenMini.setHeight(nHeight * (1 / 3) * screenMini.common.height)

        const isGauss = voterGeom.densityProfile === 'gaussian'

        fillDataSeparate()
        fillDataBlend()

        function fillDataSeparate() {
            // make image data
            const { nx, ny, weight } = grid
            canvases.splice(0)
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
                        const support = voteSet[k].tallyFractions[i]
                        const a = support * ((isGauss) ? weight[k] : 1) * 255

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
            const { nx, ny, weight } = grid
            const colorSet = canList.map((can) => can.colorRGBA)

            const canvas = document.createElement('canvas')
            canvas.width = nx
            canvas.height = ny
            const offCtx = canvas.getContext('2d')
            const imageData = offCtx.createImageData(nx, ny)

            const { data } = imageData

            let k = 0
            for (let yp = 0; yp < ny; yp++) {
                for (let xp = 0; xp < nx; xp++) {
                    const { tallyFractions } = voteSet[k]
                    const [r, g, b] = colorBlender(tallyFractions, colorSet)

                    const a = ((isGauss) ? weight[k] : 1) * 255

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
        const { x, y, w } = gridData.voterGeom

        drawBlend()

        drawSeparate()

        function drawSeparate() {
            const { ctx } = screenMini
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

                // clip outline of shape
                ctx.beginPath()
                ctx.arc(sh.x, sh.y, sh.r, 0, 2 * Math.PI)
                ctx.clip()

                ctx.beginPath()
                ctx.rect(t.x, t.y, 100, 100)
                ctx.clip()

                const canvas = canvases[i]
                const im = {
                    x: x * t.w - w * t.w * 0.5 + t.x,
                    y: y * t.w - w * t.w * 0.5 + t.y,
                    w: w * t.w,
                    h: w * t.h,
                }
                ctx.drawImage(canvas, im.x, im.y, im.w, im.h)

                // draw outline of shape
                ctx.beginPath()
                ctx.arc(sh.x, sh.y, sh.r, 0, 2 * Math.PI)
                ctx.stroke()
                ctx.restore()
            }
        }

        function drawBlend() {
            const { ctx } = screenMain
            ctx.save()
            // ctx.globalAlpha = 0.7

            // clip outline of shape
            ctx.beginPath()
            ctx.arc(x, y, w * 0.5, 0, 2 * Math.PI)
            ctx.clip()

            // draw image
            // transform is t
            const t = {
                w: 1, h: 1, x: 0, y: 0,
            }
            const canvas = singleCanvas
            ctx.imageSmoothingEnabled = false
            const ov = {
                x: x - w * 0.5 + t.x,
                y: y - w * 0.5 + t.y,
                w: w * t.w,
                h: w * t.h,
            }
            ctx.drawImage(canvas, ov.x, ov.y, ov.w, ov.h)

            // draw outline of shape
            ctx.beginPath()
            ctx.arc(x, y, w * 0.5, 0, 2 * Math.PI)
            ctx.stroke()

            ctx.restore()
        }
    }
}
