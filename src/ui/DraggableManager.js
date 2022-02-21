/** @module */

/**
 * Draggable Manager gives draggable behavior to objects on a canvas.
 * If anything changes, an item is added to the "changes" array.
 * @param {Screen} screen
 * @param {Changes} changes
 */
export default function DraggableManager(screen, changes) {
    const self = this

    // private variables
    let drag = {}
    const draggables = []

    const canvas = screen.foreground

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
    self.clear = () => {
        draggables.splice(0, draggables.length)
    }

    // mouse controls
    // As a sidenote, it is interesting that we don't need to call model.update here
    // because we are using a game loop that will call model.update.
    const start = function (event) {
        const mouse = {}
        mouse.x = event.offsetX
        mouse.y = event.offsetY
        const extra = (event.isTouch) ? 10 : 0
        const nd = draggables.length
        for (let i = 0; i < nd; i++) {
            const d = draggables[i]
            if (hitTest(d, mouse, extra)) {
                if (event.isTouch) {
                    event.preventDefault()
                }
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

    const end = function () {
        if (drag.iDragging !== undefined) {
            const dragging = draggables[drag.iDragging]
            dragging.g.drop()
        }
        drag = {}
    }

    // mouse up outside of canvas
    const current = document.onmouseup
    document.onmouseup = () => {
        if (current) current()
        canvas.onmouseup()
    }

    const move = function (event) {
        const mouse = {}
        mouse.x = event.offsetX
        mouse.y = event.offsetY
        if (drag.isDragging) { // because the mouse is moving
            if (event.isTouch) {
                event.preventDefault()
            }
            const dragging = draggables[drag.iDragging]
            dragging.o.setX(mouse.x + drag.offX) // updates state.config too
            dragging.o.setY(mouse.y + drag.offY)
            changes.add(['draggables'])
        } else {
            // see if we're hovering over something grabbable
            // because we want the user to see if they can grab something
            const nd = draggables.length
            for (let i = 0; i < nd; i++) {
                const d = draggables[i]
                if (hitTest(d, mouse, 0)) {
                    canvas.dataset.cursor = 'grab'
                    return
                }
            }
            canvas.dataset.cursor = '' // nothing to grab
        }
    }
    canvas.onmousedown = start
    canvas.onmousemove = move
    canvas.onmouseup = end
    canvas.addEventListener('touchmove', (e) => {
        const pass = passTouch(e)
        move(pass)
    })
    canvas.addEventListener('touchstart', (e) => {
        const pass = passTouch(e)
        start(pass)
    })
    canvas.addEventListener('touchend', (e) => {
        const pass = passTouch(e)
        end(pass)
    })
    canvas.touchmove = move
    canvas.touchend = canvas.onmouseup

    function passTouch(e) {
        const rect = e.target.getBoundingClientRect()
        const w = e.target.clientWidth
        const h = e.target.clientHeight
        let x = e.changedTouches[0].clientX - rect.left
        let y = e.changedTouches[0].clientY - rect.top
        if (x < 0) x = 0
        if (y < 0) y = 0
        if (x > w) x = w
        if (y > h) y = h
        const pass = { offsetX: x, offsetY: y, isTouch: true }
        Object.assign(e, pass)
        return e
    }

    function hitTest(d, m, extra) {
        // Only drag an object if we're near it.
        const x = d.o.x - m.x
        const y = d.o.y - m.y
        if (d.p.isCircle) {
            const { r } = d.g
            const hit = x * x + y * y < r * r + extra * extra
            return hit
        } if (d.p.isSquare) {
            const { w, h } = d.g
            const hit = Math.abs(x) < 0.5 * w + extra && Math.abs(y) < 0.5 * h + extra
            return hit
        }
        return false
    }
}
