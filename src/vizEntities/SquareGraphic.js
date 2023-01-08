/** @module */

import { Tween } from '../lib/snowpack/build/snowpack/pkg/@tweenjs/tweenjs.js'
/**
 * Square is a graphic.
 * It displays itself on a parent object.
 * Its parent object stores its x and y.
 * It shows a square at the parent object xy coordinates.
 * It animates the square when picking up and dropping.
 * @param {Object} parent
 * @param {Number} parent.x
 * @param {Number} parent.y
 * @param {Number} w - width of square to draw.
 * @param {Number} h - height of square to draw.
 * @param {Screen} screen
 * @constructor
 */
export default function SquareGraphic(parent, entity, w, h, screen) {
    const self = this
    self.w = w // display width, because we're going to make animations with it
    self.h = h
    self.trueW = w // true width, because we want to return to this width after animating.
    self.trueH = h
    self.angleFraction = 0

    self.pickUp = function () {
        self.tweenSq = new Tween(self, screen.tweenGroup)
        self.tweenSq.to({ w: self.trueW + 10, h: self.trueH + 10 }, 100)
        self.tweenSq.start()
    }
    self.drop = function () {
        self.tweenSq = new Tween(self, screen.tweenGroup)
        self.tweenSq.to({ w: self.trueW, h: self.trueH }, 100)
        self.tweenSq.start()
    }
    self.win = function () {
        self.tweenSq = new Tween(self, screen.tweenGroup)
        self.tweenSq.to({ angleFraction: 0.25 }, 300)
        self.tweenSq.start()
    }
    self.lose = function () {
        self.tweenSq = new Tween(self, screen.tweenGroup)
        self.tweenSq.to({ angleFraction: -0.25 }, 300)
        self.tweenSq.start()
    }

    // Graphics component
    self.render = function () {
        const { fctx } = screen
        const { darkMode } = screen.common

        fctx.save()

        if (self.tweenSq) {
            self.tweenSq.update()
        }

        if (entity.exists === 0) { fctx.globalAlpha = 0.2 }

        if (self.angleFraction !== 0) {
            fctx.translate(parent.x, parent.y)
            fctx.rotate(self.angleFraction * Math.PI * 2)
            fctx.translate(-parent.x, -parent.y)
        }

        fctx.beginPath()
        fctx.fillStyle = entity.color
        if (darkMode && entity.darkModeColor) fctx.fillStyle = entity.darkModeColor
        if (darkMode) fctx.strokeStyle = 'white'
        fctx.rect(
            (parent.x - 0.5 * self.w) - 0.5,
            (parent.y - 0.5 * self.h) - 0.5,
            self.w + 1,
            self.h + 1,
        )
        fctx.fill()
        fctx.stroke()

        fctx.restore()
    }
}
