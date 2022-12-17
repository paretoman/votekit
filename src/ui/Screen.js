/** @module */

import EventHandlers from './EventHandlers.js'
import getPixelRatio from './getPixelRatio.js'

import C2S from '../lib/snowpack/build/snowpack/pkg/@mithrandirii/canvas2svg.js'

/**
 * @param {Layout} layout
 * @constructor
 */
export default function Screen(screenCommon, layout, layoutName) {
    const self = this

    self.common = screenCommon
    self.common.attach(self)

    // Set up Canvasses //

    self.canvas = document.createElement('canvas')
    self.canvas.setAttribute('class', 'background')
    self.canvasCtx = self.canvas.getContext('2d')

    self.svgCtx = new C2S()
    self.svgBackground = self.svgCtx.getSvg()
    self.svgBackground.setAttribute('class', 'background')

    self.foreground = document.createElement('canvas')
    self.foreground.setAttribute('class', 'foreground')
    self.canvasFCtx = self.foreground.getContext('2d')

    self.svgFCtx = new C2S()
    self.svgForeground = self.svgFCtx.getSvg()
    self.svgForeground.setAttribute('class', 'foreground')

    self.tooltips = document.createElement('div')
    self.tooltips.setAttribute('class', 'tooltips')

    const makeSvgButton = document.createElement('button')
    makeSvgButton.className = 'button2'
    makeSvgButton.innerText = 'Make SVG'
    makeSvgButton.onclick = makeSVG

    const downloadLink = document.createElement('a')
    downloadLink.innerText = 'Background'
    downloadLink.download = 'vote.svg'
    downloadLink.style.margin = '4px'

    const downloadLinkF = document.createElement('a')
    downloadLinkF.innerText = 'Foreground'
    downloadLinkF.download = 'vote.svg'
    downloadLinkF.style.margin = '4px'

    const clearDiv = document.createElement('div')

    self.wrap = document.createElement('div')
    self.wrap.setAttribute('class', 'screenWrap')
    self.wrap.appendChild(clearDiv)
    self.wrap.appendChild(self.canvas)
    self.wrap.appendChild(self.foreground)
    self.wrap.appendChild(self.svgBackground)
    self.wrap.appendChild(self.svgForeground)
    self.wrap.appendChild(self.tooltips)

    self.outer = document.createElement('div')
    self.outer.appendChild(self.wrap)
    self.outer.append(makeSvgButton)
    self.outer.appendChild(downloadLink)
    self.outer.appendChild(downloadLinkF)

    layout.newElement(layoutName, self.outer)

    self.pixelRatio = getPixelRatio(self.canvasCtx)

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

        self.canvasCtx.scale(r, r)
        self.canvasFCtx.scale(r, r)

        self.svgCtx.width = w
        self.svgCtx.height = h
        self.svgBackground.style.width = wpx
        self.svgBackground.style.height = hpx
        self.svgFCtx.width = w
        self.svgFCtx.height = h
        self.svgForeground.style.width = wpx
        self.svgForeground.style.height = hpx
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
    }

    self.setDisplayCanvas = (displayStyle) => {
        self.canvas.style.display = displayStyle
        self.foreground.style.display = displayStyle
    }

    self.setDisplaySvg = (displayStyle) => {
        self.svgBackground.style.display = displayStyle
        self.svgForeground.style.display = displayStyle
    }

    self.switchToSVG = () => {
        self.ctx = self.svgCtx
        self.fctx = self.svgFCtx
        self.setDisplayCanvas('none')
        self.setDisplaySvg('block')
        self.noBuffers = true
    }

    self.switchToCanvas = () => {
        self.ctx = self.canvasCtx
        self.fctx = self.canvasFCtx
        self.setDisplayCanvas('block')
        self.setDisplaySvg('none')
        self.noBuffers = false
    }
    self.switchToCanvas()

    self.setSvgMode = (val) => {
        if (val) {
            self.switchToSVG()
        } else {
            self.switchToCanvas()
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
        self.svgBackground.style.display = displayStyle
        self.svgForeground.style.display = displayStyle
        self.tooltips.style.display = displayStyle
        self.wrap.style.display = displayStyle
        self.outer.style.display = displayStyle
    }
    self.show = () => {
        self.setDisplayStyle('block')
    }
    self.hide = () => {
        self.setDisplayStyle('none')
    }

    self.setDarkMode = (doDarkMode) => {
        const lightStroke = '#ddd'
        const darkStroke = '#222'
        const s = (doDarkMode) ? lightStroke : darkStroke
        self.canvasCtx.strokeStyle = s
        self.canvasFCtx.strokeStyle = s
        self.svgCtx.strokeStyle = s
        self.svgFCtx.strokeStyle = s
    }
    self.setDarkMode(screenCommon.darkMode)

    self.setShowDownloadScreenLink = (show) => {
        if (show) {
            makeSvgButton.hidden = false
            downloadLink.hidden = false
            downloadLinkF.hidden = false
        } else {
            makeSvgButton.hidden = true
            downloadLink.hidden = true
            downloadLinkF.hidden = true
        }
    }
    self.setShowDownloadScreenLink(screenCommon.showDownloadScreenLink)

    function makeSVG() {
        const svg = self.svgCtx.getSerializedSvg(true)
        const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
        downloadLink.href = url

        const svgF = self.svgFCtx.getSerializedSvg(true)
        const urlF = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgF)}`
        downloadLinkF.href = urlF
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
