/**
 * The super class for each sim. Provides some basic required functionality.
 * @param {DraggableManager} dragm
 */
export default function SimBase(dragm, screen) {
    const self = this
    self.enter = () => {
        screen.eventHandlers.set(dragm.eventHandlers)
    }
    self.exit = () => {}
    self.update = () => {}
    self.render = () => { }
    self.renderForeground = () => { }
}
