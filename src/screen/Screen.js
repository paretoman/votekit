/** @module */

import * as TWEEN from '../lib/snowpack/build/snowpack/pkg/@tweenjs/tweenjs.js'
import EventHandlers from './EventHandlers.js'

import ScreenCanvas from './ScreenCanvas.js'
import ScreenDownload from './ScreenDownload.js'
import ScreenSvg from './ScreenSvg.js'

/**
 * @param {Layout} layout
 * @constructor
 */
export default function Screen(screenCommon, viewMode, layout, layoutName) {
    const self = this

    // Components //

    self.common = screenCommon
    self.common.attach(self)

    self.canvas = new ScreenCanvas()
    self.svg = new ScreenSvg()
    self.download = new ScreenDownload(self, viewMode)
    self.setShowDownloadScreenLink = self.download.setShowDownloadScreenLink

    self.tweenGroup = new TWEEN.Group()

    // Divs //

    self.tooltips = document.createElement('div')
    self.tooltips.setAttribute('class', 'tooltips')

    const clearDiv = document.createElement('div')

    self.wrap = document.createElement('div')
    self.wrap.setAttribute('class', 'screenWrap')
    self.wrap.appendChild(clearDiv)
    self.wrap.appendChild(self.canvas.background)
    self.wrap.appendChild(self.canvas.foreground)
    self.wrap.appendChild(self.svg.background)
    self.wrap.appendChild(self.svg.foreground)
    self.wrap.appendChild(self.tooltips)

    self.outer = document.createElement('div')
    self.outer.appendChild(self.wrap)
    self.outer.appendChild(self.download.div)

    layout.newElement(layoutName, self.outer)

    self.setSize = (w, h) => {
        const wpx = `${w}px`
        const hpx = `${h}px`

        self.width = w // measured in browser pixels
        self.height = h
        self.tooltips.style.width = wpx
        self.tooltips.style.height = hpx
        self.wrap.style.width = wpx
        self.wrap.style.height = hpx

        self.svg.setSize(w, h)
        self.canvas.setSize(w, h)
    }
    self.setWidth = (w) => {
        self.setSize(w, self.height)
    }
    self.setHeight = (h) => {
        self.setSize(self.width, h)
    }
    const { width, height } = screenCommon
    self.setSize(width, height)

    self.setFCtx = (f) => {
        self.fctx = f
    }

    // Clear Screen //

    self.clear = function () {
        self.ctx.clearRect(0, 0, self.width, self.height)

        if (self.common.darkMode && self.noBuffers) {
            self.ctx.fillStyle = '#222'
            self.ctx.fillRect(0, 0, self.width, self.height)

            self.ctx.fillStyle = 'white'
        }
    }
    self.clearForeground = function () {
        self.fctx.clearRect(0, 0, self.width, self.height)
    }

    // Screen Modes //

    self.switchToSVG = () => {
        self.ctx = self.svg.ctx
        self.fctx = self.svg.fctx
        self.canvas.setDisplayStyle('none')
        self.svg.setDisplayStyle('block')
        self.noBuffers = true
    }
    self.switchToCanvas = () => {
        self.ctx = self.canvas.ctx
        self.fctx = self.canvas.fctx
        self.canvas.setDisplayStyle('block')
        self.svg.setDisplayStyle('none')
        self.noBuffers = false
    }
    self.setSvgMode = (val) => {
        if (val) {
            self.switchToSVG()
        } else {
            self.switchToCanvas()
        }
    }
    self.setSvgMode(false)

    self.show = () => {
        self.outer.style.display = 'block'
    }
    self.hide = () => {
        self.outer.style.display = 'none'
    }

    self.setDarkMode = (doDarkMode) => {
        const lightStroke = '#ddd'
        const darkStroke = '#222'
        const s = (doDarkMode) ? lightStroke : darkStroke
        self.canvas.setStrokeStyle(s)
        self.svg.setStrokeStyle(s)
    }
    self.setDarkMode(screenCommon.darkMode)

    // Events //

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
