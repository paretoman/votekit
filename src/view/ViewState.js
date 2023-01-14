/** @module */

import ViewStatePublisher from './ViewStatePublisher.js'

/**
 * Need to pass along the pub-sub pattern through view to specific viewStates.
 * The views attach to these view states.
 */
export default function ViewState(pub, simMode, simOptions, changes) {
    const self = this

    pub.attach(self)

    self.viewStates = {
        one: new ViewStatePublisher(),
        sample: new ViewStatePublisher(),
    }
    let viewState = self.viewStates[simOptions.mode]

    self.update = (simData) => {
        // state: check for change, exit, set, enter, update.
        if (changes.check(['useDistricts', 'dimensions', 'mode', 'electionMethod'])) {
            viewState.exit()
            viewState = self.viewStates[simOptions.mode]
            viewState.enter()
        }
        viewState.update(simData)
    }

    self.render = () => { viewState.render() }
    self.renderForeground = () => { viewState.renderForeground() }
    self.clear = () => { viewState.clear() }
    self.clearForeground = () => { viewState.clearForeground() }

    self.rerender = () => {
        self.clear()
        self.clearForeground()
        self.render()
        self.renderForeground()
    }
}
