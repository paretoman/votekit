import { Tween } from '../lib/tween.esm.js'

export default function CircleGraphic(parent, r, color, screen) {
    // shows a circle at the parent object xy coordinates
    // animates the circle when picking up and dropping
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
        const { ctx } = screen

        if (self.tween) {
            self.tween.update()
        }

        // handle

        ctx.beginPath()
        ctx.fillStyle = color
        ctx.arc(parent.x, parent.y, self.r, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
    }
}
