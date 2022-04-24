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
 * @constructor
 */
export default function Screen(w, h, layout) {
    const self = this

    self.width = w // measured in browser pixels
    self.height = h

    // canvas
    self.canvas = document.createElement('canvas')
    self.canvas.setAttribute('class', 'background')
    self.ctx = self.canvas.getContext('2d')

    // tooltips
    self.tooltips = document.createElement('div')
    self.tooltips.setAttribute('class', 'tooltips')

    // foreground
    self.foreground = document.createElement('canvas')
    self.foreground.setAttribute('class', 'foreground')
    self.fctx = self.foreground.getContext('2d')

    // maps
    self.maps = document.createElement('canvas')
    self.maps.setAttribute('class', 'maps')
    self.mctx = self.maps.getContext('2d')

    const clearDiv = document.createElement('div')

    // wrap
    self.wrap = document.createElement('div')
    self.wrap.setAttribute('class', 'screenWrap')
    self.wrap.appendChild(clearDiv)
    self.wrap.appendChild(self.canvas)
    self.wrap.appendChild(self.tooltips)
    self.wrap.appendChild(self.foreground)

    layout.newElement('screenWrap', self.wrap)
    layout.newElement('maps', self.maps)

    self.noBuffers = false

    // use scaling for high DPI devices instead of multiplying every time inside draw calls
    // https://www.html5rocks.com/en/tutorials/canvas/hidpi/
    self.pixelRatio = getPixelRatio(self.ctx)

    self.canvas.width = w * self.pixelRatio // measured in device pixels
    self.canvas.height = h * self.pixelRatio

    self.canvas.style.width = `${w}px`
    self.canvas.style.height = `${h}px`

    self.wrap.style.width = `${w}px`
    self.wrap.style.height = `${h}px`

    self.tooltips.style.width = `${w}px`
    self.tooltips.style.height = `${h}px`

    self.foreground.width = w * self.pixelRatio // measured in device pixels
    self.foreground.height = h * self.pixelRatio

    self.foreground.style.width = `${w}px`
    self.foreground.style.height = `${h}px`

    self.setMapsHeight = (height) => {
        const h3 = Math.round(height)
        self.maps.heightBrowser = h3
        self.maps.height = h3 * self.pixelRatio // measured in device pixels
        self.maps.style.height = `${h3}px` // measured in browser pixels
        self.mctx.scale(self.pixelRatio, self.pixelRatio)
    }
    self.setMapsHeight((1 / 3) * h)
    self.maps.width = w * self.pixelRatio // measured in device pixels
    self.maps.style.width = `${w}px`

    self.ctx.scale(self.pixelRatio, self.pixelRatio)
    self.fctx.scale(self.pixelRatio, self.pixelRatio)

    self.clear = function () {
        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
    }
    self.clearForeground = function () {
        self.fctx.clearRect(0, 0, self.foreground.width, self.foreground.height)
    }
    self.clearMaps = function () {
        self.mctx.clearRect(0, 0, self.maps.width, self.maps.height)
    }
    self.setCtx = function (c) {
        self.ctx = c
    }
    self.setFCtx = function (c) {
        self.fctx = c
    }
    self.setMCtx = function (c) {
        self.mctx = c
    }
    self.setNoBuffers = function (noBuffers) {
        self.noBuffers = noBuffers
    }
    self.showMaps = () => {
        self.maps.style.display = 'block'
    }
    self.hideMaps = () => {
        self.maps.style.display = 'none'
    }

    self.eventHandlers = new EventHandlers()
    const { handlers } = self.eventHandlers

    self.wrap.onmousedown = (e) => handlers.start(e)
    self.wrap.onmousemove = (e) => handlers.move(e)
    self.wrap.onmouseup = (e) => handlers.end(e)
    self.wrap.addEventListener('touchmove', (e) => handlers.touchmove(e))
    self.wrap.addEventListener('touchstart', (e) => handlers.touchstart(e))
    self.wrap.addEventListener('touchend', (e) => handlers.touchend(e))

    // mouse up outside of canvas
    const current = document.onmouseup
    document.onmouseup = (e) => {
        if (current) current(e)
        self.wrap.onmouseup(e)
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
