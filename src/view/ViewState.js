/** @module */

import ViewStatePublisher from './ViewStatePublisher.js'

/**
 * Need to pass along the pub-sub pattern through view to specific viewModes.
 * The views attach to these view states.
 */
export default function ViewState(pub, simOptions, changes) {
    const self = this

    pub.attach(self)

    self.viewModes = {
        one: new ViewStatePublisher(),
        sample: new ViewStatePublisher(),
    }
    let viewMode = self.viewModes[simOptions.mode]

    self.update = (simData) => {
        // state: check for change, exit, set, enter, update.
        if (changes.check(['mode'])) {
            viewMode.exit()
            viewMode = self.viewModes[simOptions.mode]
            viewMode.enter()
        }
        viewMode.update(simData)
    }

    self.render = () => { viewMode.render() }
    self.renderForeground = () => { viewMode.renderForeground() }
    self.clear = () => { viewMode.clear() }
    self.clearForeground = () => { viewMode.clearForeground() }

    self.rerender = () => {
        self.clear()
        self.clearForeground()
        self.render()
        self.renderForeground()
    }
}
