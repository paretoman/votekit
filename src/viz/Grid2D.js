import colorBlend from '../election/colorBlend.js'
import { toRGBA } from '../lib/colorBlendScript.js'

/**
 * Draw grid cells to show votes.
 * @param {Screen} screen
 * @constructor
 */
export default function Grid2D(gridData, candidateSimList, screen) {
    const self = this

    const cans = candidateSimList.getCandidates()
    const { grid, voteSet, voterGeom } = gridData

    const { x, y, w } = voterGeom

    const canvases = []
    let singleCanvas
    // TODO: set up canvases ahead of time

    const nCans = cans.length
    const nHeight = Math.floor((nCans - 1) / 3) + 1
    screen.setMapsHeight(nHeight * (1 / 3) * screen.height)

    fillDataSeparate()
    fillDataBlend()

    function fillDataSeparate() {
    // make image data
        const { nx, ny, weight } = grid
        for (let i = 0; i < cans.length; i++) {
            const canvas = document.createElement('canvas')
            canvas.width = nx
            canvas.height = ny
            const offCtx = canvas.getContext('2d')
            const imageData = offCtx.createImageData(nx, ny)

            const { data } = imageData

            const { color } = cans[i]
            const [r, g, b] = toRGBA(color)

            let k = 0
            for (let yp = 0; yp < ny; yp++) {
                for (let xp = 0; xp < nx; xp++) {
                    const support = voteSet[k].tallyFractions[i]
                    const a = support * weight[k] * 255

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
        const colorSet = cans.map((can) => can.color)

        const canvas = document.createElement('canvas')
        canvas.width = nx
        canvas.height = ny
        const offCtx = canvas.getContext('2d')
        const imageData = offCtx.createImageData(nx, ny)

        const { data } = imageData

        let k = 0
        const isGauss = voterGeom.densityProfile === 'gaussian'
        for (let yp = 0; yp < ny; yp++) {
            for (let xp = 0; xp < nx; xp++) {
                const { tallyFractions } = voteSet[k]
                const color = colorBlend(tallyFractions, colorSet)
                const [r, g, b] = toRGBA(color)

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

    self.render = function () {
        const { ctx, mctx } = screen

        drawBlend()

        drawSeparate()

        function drawSeparate() {
            // draw each can separately
            for (let i = 0; i < nCans; i++) {
            // draw image data
            // overlap images for now
            // transform is t
                mctx.save()
                // mctx.globalAlpha = 0.7
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
                mctx.beginPath()
                mctx.arc(sh.x, sh.y, sh.r, 0, 2 * Math.PI)
                mctx.clip()

                mctx.beginPath()
                mctx.rect(t.x, t.y, 100, 100)
                mctx.clip()

                const canvas = canvases[i]
                const im = {
                    x: x * t.w - w * t.w * 0.5 + t.x,
                    y: y * t.w - w * t.w * 0.5 + t.y,
                    w: w * t.w,
                    h: w * t.h,
                }
                mctx.drawImage(canvas, im.x, im.y, im.w, im.h)

                // draw outline of shape
                mctx.beginPath()
                mctx.arc(sh.x, sh.y, sh.r, 0, 2 * Math.PI)
                mctx.stroke()
                mctx.restore()
            }
        }

        function drawBlend() {
            ctx.save()
            // ctx.globalAlpha = 0.7

            // clip outline of shape
            ctx.beginPath()
            ctx.arc(x, y, w * 0.5, 0, 2 * Math.PI)
            ctx.clip()

            // draw image data
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
