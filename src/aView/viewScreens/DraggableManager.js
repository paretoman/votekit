/** @module */

/**
 * Draggable Manager keeps a list of draggable objects on a canvas.
 * @constructor
 */
export default function DraggableManager() {
    const self = this

    self.list = [] // intended to be accessed externally

    self.updateNewG = (g) => { self.add(g) }

    // add draggable objects
    self.add = (s) => {
        const d = { }
        if (s.voterShape) {
            d.g = s.graphic.circle
            d.r = s.graphic
            d.o = s.voterShape
            d.p = { isCircle: true }
        } else if (s.candidate) {
            d.g = s.graphic.square
            d.r = s.graphic
            d.o = s.candidate
            d.p = { isSquare: true }
        } else if (s.canDn) {
            d.g = s.graphic.square
            d.r = s.graphic
            d.o = s.canDn
            d.p = { isSquare: true }
        } else {
            d.g = s.graphic.circle
            d.r = s.graphic
            d.o = s.testVoter
            d.p = { isCircle: true }
        }
        self.list.push(d)
    }
}
