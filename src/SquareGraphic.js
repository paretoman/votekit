import { Tween } from '../lib/tween.esm.js'

export default function SquareGraphic(parent, w, h, color, screen) {
    // square is a graphic
    // it displays itself on a parent object
    // its parent object stores its x and y
    // shows a square at the parent object xy coordinates
    // animates the square when picking up and dropping
    //

    const self = this
    self.w = w // display width, because we're going to make animations with it
    self.h = h
    self.trueW = w // true width, because we want to return to this width after animating.
    self.trueH = h
    self.color = color

    self.pickUp = function () {
        self.tweenSq = new Tween(self)
        self.tweenSq.to({ w: self.trueW + 10, h: self.trueH + 10 }, 100)
        self.tweenSq.start()
    }
    self.drop = function () {
        self.tweenSq = new Tween(self)
        self.tweenSq.to({ w: self.trueW, h: self.trueH }, 100)
        self.tweenSq.start()
    }

    // Graphics component
    self.render = function () {
        const { ctx } = screen

        if (self.tweenSq) {
            self.tweenSq.update()
        }
        ctx.beginPath()
        ctx.fillStyle = self.color
        ctx.rect(
            (parent.x - 0.5 * self.w) - 0.5,
            (parent.y - 0.5 * self.h) - 0.5,
            self.w + 1,
            self.h + 1,
        )
        ctx.fill()
        ctx.stroke()
    }
}
