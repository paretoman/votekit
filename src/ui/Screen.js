/** @module */

/**
 * Set up a screen to view some objects.
 * A detail here is that we have browser pixels and device pixels.
 * Broswer pixels feel about the same size on any device (visual arc length).
 * Device pixels can be much smaller for high-dpi devices.
 * @param {Number} w - width in browser pixels of the canvas.
 * @param {Number} h - height in browser pixels of the canvas.
 */
export default function Screen(w, h) {
    const self = this

    self.width = w // measured in browser pixels
    self.height = h

    // attach canvas
    self.canvas = document.createElement('canvas')
    self.canvas.setAttribute('class', 'interactive')

    self.ctx = self.canvas.getContext('2d')
    self.noBuffers = false

    // use scaling for high DPI devices instead of multiplying every time inside draw calls
    // https://www.html5rocks.com/en/tutorials/canvas/hidpi/
    self.pixelRatio = getPixelRatio(self.ctx)

    self.canvas.width = w * self.pixelRatio // measured in device pixels
    self.canvas.height = h * self.pixelRatio

    self.canvas.style.width = `${w}px`
    self.canvas.style.height = `${h}px`

    self.ctx.scale(self.pixelRatio, self.pixelRatio)
    self.clear = function () {
        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
    }
    self.setCtx = function (c) {
        self.ctx = c
    }
    self.setNoBuffers = function (noBuffers) {
        self.noBuffers = noBuffers
    }
}

function getPixelRatio(context) {
    const backingStore = context.backingStorePixelRatio
          || context.webkitBackingStorePixelRatio
          || context.mozBackingStorePixelRatio
          || context.msBackingStorePixelRatio
          || context.oBackingStorePixelRatio
          || context.backingStorePixelRatio || 1

    return (window.devicePixelRatio || 1) / backingStore
}
