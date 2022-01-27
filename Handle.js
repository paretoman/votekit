import { Tween } from './lib/tween.esm.js'

export default function Handle(x, y, screen, dragm) {
    const self = this

    self.x = x
    self.y = y
    self.handleSize = 10
    self.trueHandleSize = 10

    dragm.newHandle(self, self.handleSize)

    self.pickUp = function () {
        self.tween = new Tween(self)
        self.tween.to({ handleSize: self.trueHandleSize * 2 }, 100)
        self.tween.start()
    }
    self.drop = function () {
        self.tween = new Tween(self)
        self.tween.to({ handleSize: self.trueHandleSize }, 100)
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
        ctx.fillStyle = '#555'
        ctx.arc(self.x, self.y, self.handleSize, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
    }
}
