/* eslint-disable no-param-reassign */

/**
 * Set event handlers for a screen.foreground.
 * We want to set the handlers once for the canvas.
 * Then allow sims to set the functions called by the handlers.
 * @param {Canvas} foreground - The canvas
 */
export default function EventHandlers(foreground) {
    const self = this

    // Event Handlers - well, at least they handle the event handlers//
    const handlers = {
        start: () => {},
        move: () => {},
        end: () => {},
        touchmove: () => {},
        touchstart: () => {},
        touchend: () => {},
    }

    foreground.onmousedown = (e) => handlers.start(e)
    foreground.onmousemove = (e) => handlers.move(e)
    foreground.onmouseup = (e) => handlers.end(e)
    foreground.addEventListener('touchmove', (e) => handlers.touchmove(e))
    foreground.addEventListener('touchstart', (e) => handlers.touchstart(e))
    foreground.addEventListener('touchend', (e) => handlers.touchend(e))

    // mouse up outside of canvas
    const current = document.onmouseup
    document.onmouseup = () => {
        if (current) current()
        foreground.onmouseup()
    }
    // overwrite event handlers
    self.set = (eHandlers) => {
        Object.assign(handlers, eHandlers)
    }
}
