/** @module */

import EventHandlers from './EventHandlers.js'
import getPixelRatio from './getPixelRatio.js'

/**
 * @param {Layout} layout
 * @constructor
 */
export default function Screen(screenCommon, layout, layoutName) {
    const self = this

    self.common = screenCommon

    // Set up Canvasses //

    self.canvas = document.createElement('canvas')
    self.canvas.setAttribute('class', 'background')
    self.ctx = self.canvas.getContext('2d')

    self.foreground = document.createElement('canvas')
    self.foreground.setAttribute('class', 'foreground')
    self.fctx = self.foreground.getContext('2d')

    self.tooltips = document.createElement('div')
    self.tooltips.setAttribute('class', 'tooltips')

    const clearDiv = document.createElement('div')

    self.wrap = document.createElement('div')
    self.wrap.setAttribute('class', 'screenWrap')
    self.wrap.appendChild(clearDiv)
    self.wrap.appendChild(self.canvas)
    self.wrap.appendChild(self.tooltips)
    self.wrap.appendChild(self.foreground)

    layout.newElement(layoutName, self.wrap)

    self.pixelRatio = getPixelRatio(self.ctx)

    self.setSize = (w, h) => {
        const wpx = `${w}px`
        const hpx = `${h}px`
        const r = self.pixelRatio
        const wd = w * r // measured in device pixels
        const hd = h * r

        self.width = w // measured in browser pixels
        self.height = h
        self.canvas.width = wd
        self.canvas.height = hd
        self.canvas.style.width = wpx
        self.canvas.style.height = hpx
        self.foreground.width = wd
        self.foreground.height = hd
        self.foreground.style.width = wpx
        self.foreground.style.height = hpx
        self.tooltips.style.width = wpx
        self.tooltips.style.height = hpx
        self.wrap.style.width = wpx
        self.wrap.style.height = hpx

        self.ctx.scale(r, r)
        self.fctx.scale(r, r)
    }
    self.setWidth = (w) => {
        self.setSize(w, self.height)
    }
    self.setHeight = (h) => {
        self.setSize(self.width, h)
    }
    const { width, height } = screenCommon
    self.setSize(width, height)

    // Act on Canvasses //

    self.clear = function () {
        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)

        if (self.common.darkMode && self.noBuffers) {
            self.ctx.fillStyle = '#222'
            self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height)

            self.ctx.fillStyle = 'white'
        }
    }
    self.clearForeground = function () {
        self.fctx.clearRect(0, 0, self.foreground.width, self.foreground.height)
        if (self.common.darkMode && self.noBuffers) {
            self.fctx.fillStyle = '#222'
            self.fctx.fillRect(0, 0, self.foreground.width, self.foreground.height)

            self.fctx.fillStyle = 'white'
        }
    }

    self.setCtx = function (c) {
        self.ctx = c
    }
    self.setFCtx = function (c) {
        self.fctx = c
    }
    self.setNoBuffers = function (noBuffers) {
        self.noBuffers = noBuffers
    }
    self.noBuffers = false

    self.setDisplayStyle = (displayStyle) => {
        self.canvas.style.display = displayStyle
        self.foreground.style.display = displayStyle
        self.tooltips.style.display = displayStyle
        self.wrap.style.display = displayStyle
    }
    self.show = () => {
        self.setDisplayStyle('block')
    }
    self.hide = () => {
        self.setDisplayStyle('none')
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
