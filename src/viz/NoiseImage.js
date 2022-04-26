/** @module */

/**
 * Draws an image of noise, or anything really.
 * @param {Number} nx - Width in pixels
 * @param {Number} ny - Height in pixels
 * @param {Screen} screen - Draw here.
 * @constructor
 */
export default function NoiseImage(nx, ny, screen) {
    const self = this

    /*
        Makes your pixel manip on an off-screen canvas
        Returns the off-screen canvas
        */

    const canvas = document.createElement('canvas')
    canvas.width = nx
    canvas.height = ny
    const offCtx = canvas.getContext('2d')
    const imageData = offCtx.createImageData(nx, ny)

    // not used anymore
    self.load = (sn) => {
        const { data } = imageData

        for (let x = 0; x < nx; x++) {
            for (let y = 0; y < ny; y++) {
                const r = sn[x][y][0] + 0.5
                const g = sn[x][y][1] + 0.5
                data[(x + y * nx) * 4 + 0] = r * 255
                data[(x + y * nx) * 4 + 1] = (r + g) * 200
                data[(x + y * nx) * 4 + 2] = g * 200
                data[(x + y * nx) * 4 + 3] = 255
            }
        }

        offCtx.putImageData(imageData, 0, 0)
    }

    self.loadColors = (colors) => {
        const { data } = imageData

        for (let y = 0; y < ny; y++) {
            for (let x = 0; x < nx; x++) {
                const color = colors[x][y]
                const [r, g, b] = color
                data[(x + y * nx) * 4 + 0] = r
                data[(x + y * nx) * 4 + 1] = g
                data[(x + y * nx) * 4 + 2] = b
                data[(x + y * nx) * 4 + 3] = 255
            }
        }

        offCtx.putImageData(imageData, 0, 0)
    }

    self.render = (renderWidth, renderHeight) => {
        const { mctx } = screen
        mctx.save()
        mctx.imageSmoothingEnabled = false
        mctx.drawImage(canvas, 0, 0, renderWidth, renderHeight)
        mctx.restore()
    }
    // Draw simplex noise
    // https://codepen.io/jwagner/pen/BNmpdm/?editors=0010
    // Scale image
    // https://stackoverflow.com/a/48858621
}
