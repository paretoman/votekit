export default function DraggableManager(screen, changes) {
    // Draggable Manager gives draggable behavior to objects on a canvas.
    // If anything changes, an item is added to the "changes" array.
    const self = this

    // private variables
    let drag = {}
    const draggables = []

    const { canvas } = screen

    // add draggable objects
    self.newSquare = function (o) {
        // set properties here so that we don't set properties on the actual object
        const p = { isSquare: true }
        draggables.push({ o, p })
    }
    self.newHandle = function (o, handleRadius) {
        const p = { isHandle: true, handleRadius }
        draggables.push({ o, p })
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
                d.o.pickUp()
                canvas.dataset.cursor = 'grabbing' // CSS data attribute
                break // exit after picking one object
            }
        }
    }

    canvas.onmouseup = function () {
        if (drag.iDragging !== undefined) {
            const dragging = draggables[drag.iDragging]
            dragging.o.drop()
        }
        drag = {}
    }

    canvas.onmousemove = function (event) {
        const mouse = {}
        mouse.x = event.offsetX
        mouse.y = event.offsetY
        if (drag.isDragging) { // because the mouse is moving
            const dragging = draggables[drag.iDragging]
            dragging.o.x = mouse.x + drag.offX // updates state.config too
            dragging.o.y = mouse.y + drag.offY
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
            const { r } = d.o
            const hit = x * x + y * y < r * r
            return hit
        } if (d.p.isSquare) {
            const hit = Math.abs(x) < 0.5 * d.o.w && Math.abs(y) < 0.5 * d.o.h
            return hit
        } if (d.p.isHandle) {
            const r = d.p.handleRadius
            const hit = x * x + y * y < r * r
            return hit
        }
        return false
    }
}
