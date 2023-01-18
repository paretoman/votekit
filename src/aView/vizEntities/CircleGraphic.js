/** @module */

import { Tween } from '../../lib/snowpack/build/snowpack/pkg/@tweenjs/tweenjs.js'

/**
 */

/**
 * Shows a circle at the parent object xy coordinates.
 * Animates the circle when picking up and dropping.
 * @param {(Candidate|CandidateDn|VoterShape)} parent
 *  - something with x and y attributes.
 * @param {Number} r - radius of graphic
 * @param {String} color - color code
 * @param {Screen} screen - something with .ctx to draw to.
 * @constructor
 */
export default function CircleGraphic(parent, entity, r, screen) {
    const self = this

    self.r = r
    self.trueR = r

    self.pickUp = function () {
        self.tween = new Tween(self, screen.tweenGroup)
        self.tween.to({ r: self.trueR * 2 }, 100)
        self.tween.start()
    }
    self.drop = function () {
        self.tween = new Tween(self, screen.tweenGroup)
        self.tween.to({ r: self.trueR }, 100)
        self.tween.start()
    }

    // Graphics component
    self.render = function () {
        const { fctx } = screen
        const { darkMode } = screen.common
        const { color } = entity

        fctx.save()

        if (self.tween) {
            self.tween.update()
        }

        // handle

        if (entity.exists === 0) {
            fctx.globalAlpha = 0.2
        }
        fctx.beginPath()
        fctx.fillStyle = color
        if (darkMode) fctx.strokeStyle = 'white'
        fctx.arc(parent.x, parent.y, self.r, 0, 2 * Math.PI)
        fctx.fill()
        fctx.stroke()

        fctx.restore()
    }
}
