/**
 * The super class for each sim. Provides some basic required functionality.
 * @param {DraggableManager} dragm
 */
export default function SimBase(dragm) {
    const self = this
    self.enter = () => {
        dragm.setEventHandlers()
    }
    self.exit = () => {}
    self.update = () => {}
    self.render = () => { }
    self.renderForeground = () => { }
}
