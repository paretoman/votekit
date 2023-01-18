/** @module */

import C2S from '../../lib/snowpack/build/snowpack/pkg/@mithrandirii/canvas2svg.js'

/**
 * Make the svg part of the screen.
 */
export default function ScreenSvg() {
    const self = this

    self.ctx = new C2S()
    self.background = self.ctx.getSvg()
    self.background.setAttribute('class', 'background')

    self.fctx = new C2S()
    self.foreground = self.fctx.getSvg()
    self.foreground.setAttribute('class', 'foreground')

    self.setSize = (w, h) => {
        const wpx = `${w}px`
        const hpx = `${h}px`

        self.ctx.width = w
        self.ctx.height = h
        self.background.style.width = wpx
        self.background.style.height = hpx

        self.fctx.width = w
        self.fctx.height = h
        self.foreground.style.width = wpx
        self.foreground.style.height = hpx
    }

    self.setDisplayStyle = (displayStyle) => {
        self.background.style.display = displayStyle
        self.foreground.style.display = displayStyle
    }
    self.setStrokeStyle = (s) => {
        self.ctx.strokeStyle = s
        self.fctx.strokeStyle = s
    }
}
