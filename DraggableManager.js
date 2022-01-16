
export default function DraggableManager (canvas,changes) {
    // Draggable Manager gives draggable behavior to objects on a canvas. If anything changes, an item is added to the "changes" array.
    let self = this

    // private variables
    let drag = {}
    let draggables = []

    // add draggable objects
    self.newSquare = function (s) {
        s.isSquare = true
        draggables.push(s)
    }

    // mouse controls
    // As a sidenote, it is interesting that we don't need to call model.update here because we are using a game loop that will call model.update.
    canvas.onmousedown = function (event) {
        let mouse = {}
        mouse.x = event.offsetX
        mouse.y = event.offsetY
        for( const [i,d] of draggables.entries()) {
            if (hitTest( d , mouse )) {
                drag.iDragging = i
                drag.isDragging = true
                drag.offX = d.x - mouse.x
                drag.offY = d.y - mouse.y
            }
        }
    }
    
    canvas.onmouseup = function (event) {
        drag = {}
    }

    canvas.onmousemove = function (event) {
        if (drag.isDragging) { // because the mouse is moving
            let mouse = {}
            mouse.x = event.offsetX
            mouse.y = event.offsetY
            let dragging = draggables[drag.iDragging]
            dragging.x = mouse.x + drag.offX // updates state.config too
            dragging.y = mouse.y + drag.offY
            changes.push("draggables")
        }
    }

    function hitTest (d,m) {
        // Only drag an object if we're near it.
        const x = d.x - m.x
        const y = d.y - m.y
        if (d.isCircle) {
            const r = d.r
            const hit = x * x + y * y < r * r
            return hit
        } else if (d.isSquare) {
            const hit = Math.abs(x) < .5 * d.w && Math.abs(y) < .5 * d.h
            return hit
        }
    }
}