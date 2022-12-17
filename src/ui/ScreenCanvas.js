/** @module */

import getPixelRatio from './getPixelRatio.js'

/**
 * Make the canvas part of the screen.
 */
export default function ScreenCanvas() {
    const self = this

    self.background = document.createElement('canvas')
    self.background.setAttribute('class', 'background')
    self.ctx = self.background.getContext('2d')

    self.foreground = document.createElement('canvas')
    self.foreground.setAttribute('class', 'foreground')
    self.fctx = self.foreground.getContext('2d')

    self.setSize = (w, h) => {
        const wpx = `${w}px`
        const hpx = `${h}px`
        const r = self.pixelRatio
        const wd = w * r // measured in device pixels
        const hd = h * r

        self.background.width = wd
        self.background.height = hd
        self.background.style.width = wpx
        self.background.style.height = hpx
        self.foreground.width = wd
        self.foreground.height = hd
        self.foreground.style.width = wpx
        self.foreground.style.height = hpx

        self.ctx.scale(r, r)
        self.fctx.scale(r, r)
    }

    self.setDisplayStyle = (displayStyle) => {
        self.background.style.display = displayStyle
        self.foreground.style.display = displayStyle
    }

    self.setStrokeStyle = (s) => {
        self.ctx.strokeStyle = s
        self.fctx.strokeStyle = s
    }

    self.pixelRatio = getPixelRatio(self.ctx)
}
