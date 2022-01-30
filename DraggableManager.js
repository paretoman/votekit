export default function DraggableManager(screen, changes) {
    // Draggable Manager gives draggable behavior to objects on a canvas.
    // If anything changes, an item is added to the "changes" array.
    const self = this

    // private variables
    let drag = {}
    const draggables = []

    const { canvas } = screen

    // add draggable objects
    self.newSquareHandle = function (o, g) {
        // set properties here so that we don't set properties on the actual object
        const p = { isSquare: true }
        draggables.push({ o, g, p })
    }
    self.newCircleHandle = function (o, g) { // object, graphic
        const p = { isCircle: true }
        draggables.push({ o, g, p })
    }

    // mouse controls
    // As a sidenote, it is interesting that we don't need to call model.update here
    // because we are using a game loop that will call model.update.
    canvas.onmousedown = function (event) {
        const mouse = {}
        mouse.x = event.offsetX
        mouse.y = event.offsetY
        const nd = draggables.length
        for (let i = 0; i < nd; i++) {
            const d = draggables[i]
            if (hitTest(d, mouse)) {
                drag.iDragging = i
                drag.isDragging = true
                drag.offX = d.o.x - mouse.x
                drag.offY = d.o.y - mouse.y
                d.g.pickUp()
                canvas.dataset.cursor = 'grabbing' // CSS data attribute
                break // exit after picking one object
            }
        }
    }

    canvas.onmouseup = function () {
        if (drag.iDragging !== undefined) {
            const dragging = draggables[drag.iDragging]
            dragging.g.drop()
        }
        drag = {}
    }

    canvas.onmousemove = function (event) {
        const mouse = {}
        mouse.x = event.offsetX
        mouse.y = event.offsetY
        if (drag.isDragging) { // because the mouse is moving
            const dragging = draggables[drag.iDragging]
            dragging.o.setX(mouse.x + drag.offX) // updates state.config too
            dragging.o.setY(mouse.y + drag.offY)
            changes.push('draggables')
        } else {
            // see if we're hovering over something grabbable
            // because we want the user to see if they can grab something
            const nd = draggables.length
            for (let i = 0; i < nd; i++) {
                const d = draggables[i]
                if (hitTest(d, mouse)) {
                    canvas.dataset.cursor = 'grab'
                    return
                }
            }
            canvas.dataset.cursor = '' // nothing to grab
        }
    }

    function hitTest(d, m) {
        // Only drag an object if we're near it.
        const x = d.o.x - m.x
        const y = d.o.y - m.y
        if (d.p.isCircle) {
            const { r } = d.g
            const hit = x * x + y * y < r * r
            return hit
        } if (d.p.isSquare) {
            const { w, h } = d.g
            const hit = Math.abs(x) < 0.5 * w && Math.abs(y) < 0.5 * h
            return hit
        }
        return false
    }
}
