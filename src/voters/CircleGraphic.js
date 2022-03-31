/** @module */

import { Tween } from '../../lib/tween.esm.js'

/**
 */

/**
 * Shows a circle at the parent object xy coordinates.
 * Animates the circle when picking up and dropping.
 * @param {(Candidate|CandidateDistribution|VoterCircle|SampleVoterCircle)} parent
 *  - something with x and y attributes.
 * @param {Number} r - radius of graphic
 * @param {String} color - color code
 * @param {Screen} screen - something with .ctx to draw to.
 * @constructor
 */
export default function CircleGraphic(parent, r, color, screen) {
    const self = this

    self.r = r
    self.trueR = r

    self.pickUp = function () {
        self.tween = new Tween(self)
        self.tween.to({ r: self.trueR * 2 }, 100)
        self.tween.start()
    }
    self.drop = function () {
        self.tween = new Tween(self)
        self.tween.to({ r: self.trueR }, 100)
        self.tween.start()
    }

    // Graphics component
    self.render = function () {
        const { fctx } = screen

        fctx.save()

        if (self.tween) {
            self.tween.update()
        }

        // handle

        if (parent.exists === 0) {
            fctx.globalAlpha = 0.2
        }
        fctx.beginPath()
        fctx.fillStyle = color
        fctx.arc(parent.x, parent.y, self.r, 0, 2 * Math.PI)
        fctx.fill()
        fctx.stroke()

        fctx.restore()
    }
}
