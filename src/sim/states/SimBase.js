/** @module */

import DraggableManager from '../DraggableManager.js'

/**
 * The super class for each sim. Provides some basic required functionality.
 * @param {Screen} screen
 * @param {Changes} changes
 * @constructor
 */
export default function SimBase(screen, changes, sim) {
    const self = this
    self.dragm = new DraggableManager(screen, changes, sim)
    self.enter = () => {
        screen.eventHandlers.set(self.dragm.eventHandlers)
    }
    self.exit = () => {}
    self.update = () => {}
    self.render = () => { }
    self.renderForeground = () => { }
    self.testVote = () => {}
}
