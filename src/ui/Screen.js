/** @module */

import EventHandlers from './EventHandlers.js'

/**
 * Set up a screen to view some objects.
 * A detail here is that we have browser pixels and device pixels.
 * Broswer pixels feel about the same size on any device (visual arc length).
 * Device pixels can be much smaller for high-dpi devices.
 * @param {Number} w - width in browser pixels of the canvas.
 * @param {Number} h - height in browser pixels of the canvas.
 * @param {Layout} layout
 */
export default function Screen(w, h, layout) {
    const self = this

    self.width = w // measured in browser pixels
    self.height = h

    // canvas
    self.canvas = document.createElement('canvas')
    self.canvas.setAttribute('class', 'background')
    self.ctx = self.canvas.getContext('2d')

    // foreground
    self.foreground = document.createElement('canvas')
    self.foreground.setAttribute('class', 'foreground')
    self.fctx = self.foreground.getContext('2d')

    // geoMaps
    self.geoMaps = document.createElement('canvas')
    self.geoMaps.setAttribute('class', 'geoMaps')
    self.gctx = self.geoMaps.getContext('2d')

    const clearDiv = document.createElement('div')
    layout.newElement('clearDiv', clearDiv)
    layout.newElement('screen', self.canvas)
    layout.newElement('foreground', self.foreground)
    layout.newElement('geoMaps', self.geoMaps)

    self.noBuffers = false

    // use scaling for high DPI devices instead of multiplying every time inside draw calls
    // https://www.html5rocks.com/en/tutorials/canvas/hidpi/
    self.pixelRatio = getPixelRatio(self.ctx)

    self.canvas.width = w * self.pixelRatio // measured in device pixels
    self.canvas.height = h * self.pixelRatio

    self.canvas.style.width = `${w}px`
    self.canvas.style.height = `${h}px`

    self.foreground.width = w * self.pixelRatio // measured in device pixels
    self.foreground.height = h * self.pixelRatio

    self.foreground.style.width = `${w}px`
    self.foreground.style.height = `${h}px`

    const h3 = Math.round(h / 3)
    self.geoMaps.width = w * self.pixelRatio // measured in device pixels
    self.geoMaps.height = h3 * self.pixelRatio

    self.geoMaps.style.width = `${w}px`
    self.geoMaps.style.height = `${h3}px`

    self.ctx.scale(self.pixelRatio, self.pixelRatio)
    self.fctx.scale(self.pixelRatio, self.pixelRatio)
    self.gctx.scale(self.pixelRatio, self.pixelRatio)

    self.clear = function () {
        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
    }
    self.clearForeground = function () {
        self.fctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
    }
    self.setCtx = function (c) {
        self.ctx = c
    }
    self.setFCtx = function (c) {
        self.fctx = c
    }
    self.setGCtx = function (c) {
        self.gctx = c
    }
    self.setNoBuffers = function (noBuffers) {
        self.noBuffers = noBuffers
    }
    self.showGeoMaps = () => {
        self.geoMaps.style.display = 'block'
    }
    self.hideGeoMaps = () => {
        self.geoMaps.style.display = 'none'
    }

    self.eventHandlers = new EventHandlers(self.foreground)
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
