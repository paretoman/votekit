/** @module */

import { drawStrokedColor } from '../../utilities/graphicsUtilities.js'
import DraggableManager from '../../ui/DraggableManager.js'
import ClickDrag from '../../ui/ClickDrag.js'

/**
 * The super class for each sim. Provides some basic required functionality.
 * @param {Screen} screen
 * @param {Changes} changes
 * @constructor
 */
export default function SimBase(screen, changes, sim) {
    const self = this
    self.dragm = new DraggableManager()
    self.clickDrag = new ClickDrag(self.dragm, screen, changes, sim)
    self.enter = () => {
        screen.eventHandlers.set(self.clickDrag.eventHandlers)
    }
    self.exit = () => {}
    self.update = () => {
        if (changes.checkNone()) return
        screen.clear()
        const [x, y] = [150, 150]
        drawStrokedColor('Not Yet Implemented', x, y, 20, 2, '#222', 1, screen.ctx)
    }
    self.render = () => { }
    self.renderForeground = () => { }
    self.testVoteSim = () => {}
}
