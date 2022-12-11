/** @module */

import { clamp, copyObjectShallow, minIndex } from '../utilities/jsHelpers.js'

/**
 * ClickDrag gives draggable behavior to objects on a canvas.
 * If anything changes, an item is added to the "changes" array.
 * Calling screen.setEventHandlers(clickDrag.eventHandlers) sets the eventhandlers on the screen.
 * @param {Screen} screen
 * @param {Changes} changes
 * @constructor
 */
export default function ClickDrag(dragm, viewEntities, screen, changes, view) {
    const self = this

    // private variables
    let drag = {}
    const draggables = dragm.list

    const grabCanvas = screen.tooltips

    // Mouse Listeners
    // As a sidenote, it is interesting that we don't need to call model.update here
    // because we are using a game loop that will call model.update.
    const start = function (event) {
        // don't interact with stuff underneath a tooltip
        if (event.target.closest('.tooltipBox') !== null) {
            return
        }

        const mouse = getMouse(event)
        const extra = (event.isTouch) ? 10 : 0
        const nd = draggables.length
        // We are in the hitboxes of these draggables.
        const hitList = []
        for (let i = 0; i < nd; i++) {
            const d = draggables[i]
            if ((d.o.exists || view.showGhosts) && hitTest(d, mouse, extra)) {
                hitList.push(i)
            }
        }
        if (hitList.length > 0) {
            const distances2 = hitList.map((i) => {
                const d = draggables[i]
                const offX = d.r.x - mouse.x
                const offY = d.r.y - mouse.y
                return offX ** 2 + offY ** 2
            })
            // pick up
            const iHitListClosest = minIndex(distances2)
            const iDraggableClosest = hitList[iHitListClosest]

            const d = draggables[iDraggableClosest]
            drag.iDragging = iDraggableClosest
            drag.isDragging = true
            drag.offX = d.r.x - mouse.x
            drag.offY = d.r.y - mouse.y
            d.g.pickUp()
            grabCanvas.dataset.cursor = 'grabbing' // CSS data attribute
        }
        startClickDetect(mouse)
    }

    const move = function (event) {
        const mouse = getMouse(event)
        if (drag.isDragging) { // because the mouse is moving
            if (event.isTouch) {
                event.preventDefault()
                event.stopPropagation()
            }
            const dragging = draggables[drag.iDragging]

            const w = screen.width
            const h = screen.height
            dragging.r.setXYView({
                x: clamp(mouse.x + drag.offX, 0, w),
                y: clamp(mouse.y + drag.offY, 0, h),
            })
            changes.add(['draggables'])
        } else {
            // see if we're hovering over something grabbable
            // because we want the user to see if they can grab something
            const nd = draggables.length
            for (let i = 0; i < nd; i++) {
                const d = draggables[i]
                if ((view.showGhosts || d.o.exists) && hitTest(d, mouse, 0)) {
                    grabCanvas.dataset.cursor = 'grab'
                    return
                }
            }
            grabCanvas.dataset.cursor = '' // nothing to grab
        }
        moveClickDetect(mouse)
    }

    const end = function () {
        endClickDetect()
        if (drag.iDragging !== undefined) {
            const dragging = draggables[drag.iDragging]
            dragging.g.drop()
        }
        drag = {}
    }

    // Touch Listeners
    const touchmove = (e) => {
        const pass = passTouch(e)
        move(pass)
    }
    const touchstart = (e) => {
        const pass = passTouch(e)
        start(pass)
    }
    const touchend = (e) => {
        const pass = passTouch(e)
        move(pass)
        end(pass)

        // prevent mousedown from firing unless we're on a tooltip
        if (e.target.closest('.tooltipBox') === null) {
            e.preventDefault()
        }
    }

    self.eventHandlers = {
        start, move, end, touchmove, touchstart, touchend,
    }

    /**
     * Make a touch event look like a mouse event, with a flag.
     * @param {Event} e - The event from the DOM
     * @returns {Event} - The same event it received, plus some added properties.
     */
    function passTouch(e) {
        e.isTouch = true
        return e
    }

    /** Fix position relative to parent
     *  https://stackoverflow.com/questions/2614461/javascript-get-mouse-position-relative-to-parent-element
     */
    function getMouse(e) {
        const rect = screen.canvas.getBoundingClientRect()
        const c = (e.isTouch) ? e.changedTouches[0] : e
        const x = c.clientX - rect.left
        const y = c.clientY - rect.top
        const mouse = { x, y }
        return mouse
    }

    /**
     * Check whether m, e.g. a mouse, hits d, a draggable object.
     * @param {Object} d - An entry in the draggables array.
     * @param {Object} m - An object with properties x and y, e.g. a mouse.
     * @param {Number} extra - Extra slack to catch touches outside of the hitbox.
     * @returns {Boolean} - Whether m hits d.
     */
    function hitTest(d, m, extra) {
        // Only drag an object if we're near it.
        const x = d.r.x - m.x
        const y = d.r.y - m.y
        if (d.p.isCircle) {
            const { r } = d.g
            const hit = x * x + y * y < (r + extra) * (r + extra)
            return hit
        } if (d.p.isSquare) {
            const { w, h } = d.g
            const hit = Math.abs(x) < 0.5 * w + extra && Math.abs(y) < 0.5 * h + extra
            return hit
        }
        return false
    }

    // click detection //

    let couldBeClick
    let startPos
    function startClickDetect(mouse) {
        couldBeClick = true
        startPos = copyObjectShallow(mouse)
    }
    function moveClickDetect(mouse) {
        if (couldBeClick) {
            const xDist = Math.abs(startPos.x - mouse.x)
            const yDist = Math.abs(startPos.y - mouse.y)
            if (xDist > 5) couldBeClick = false
            if (yDist > 5) couldBeClick = false
        }
    }
    function endClickDetect() {
        if (couldBeClick) {
            couldBeClick = false
            if (drag.isDragging) { // because the mouse is moving
                const dragging = draggables[drag.iDragging]
                dragging.r.click()
            } else {
                // We are not dragging anything, and we clicked,
                // and we're inside the screen because this could be a click,
                // so let's do the click action for blank space.
                viewEntities.clickEmpty(startPos)
            }
        }
    }
}
