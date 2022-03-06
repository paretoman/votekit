/**
 * Set event handlers for a screen.foreground.
 * We want to set the handlers once for the canvas,
 * and use this class to change the functions that the handlers call.
 * Then allow sims to set the functions called by the handlers.
 */
export default function EventHandlers() {
    const self = this

    // Event Handlers - well, at least they handle the event handlers//
    self.handlers = {
        start: () => {},
        move: () => {},
        end: () => {},
        touchmove: () => {},
        touchstart: () => {},
        touchend: () => {},
    }

    // overwrite event handlers
    self.set = (eHandlers) => {
        Object.assign(self.handlers, eHandlers)
    }
}
