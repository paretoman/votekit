/** @module */

import ViewModePublisher from './ViewModePublisher.js'

/**
 * Need to pass along the pub-sub pattern through view to specific viewModes.
 * The views attach to these view states.
 */
export default function ViewMode(pub, simOptions, changes) {
    const self = this

    pub.attach(self)

    self.viewModes = {
        one: new ViewModePublisher(),
        sample: new ViewModePublisher(),
    }
    let viewModeState = self.viewModes[simOptions.mode]

    self.update = (simData) => {
        // state: check for change, exit, set, enter, update.
        if (changes.check(['mode'])) {
            viewModeState.exit()
            viewModeState = self.viewModes[simOptions.mode]
            viewModeState.enter()
        }
        viewModeState.update(simData)
    }

    self.render = () => { viewModeState.render() }
    self.renderForeground = () => { viewModeState.renderForeground() }
    self.clear = () => { viewModeState.clear() }
    self.clearForeground = () => { viewModeState.clearForeground() }

    self.rerender = () => {
        self.clear()
        self.clearForeground()
        self.render()
        self.renderForeground()
    }
}
