/** @module */

import { drawStrokedColor } from '../../util/graphicsUtilities.js'
import DraggableManager from './DraggableManager.js'
import ClickDrag from './ClickDrag.js'

/**
 * The super class for each view state. Provides some basic required functionality.
 * @param {Screen} screen
 * @param {Changes} changes
 * @param {ViewSettings} viewSettings
 * @constructor
 */
export default function ViewBase(screen, changes, viewSettings) {
    const self = this
    self.dragm = new DraggableManager()
    self.clickDrag = new ClickDrag(self.dragm, self, screen, changes, viewSettings)
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
    self.testVoteView = () => null
}
