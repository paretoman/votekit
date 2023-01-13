/** @module */

import ViewState from './ViewState.js'

/**
 * Need to pass along the pub-sub pattern through view to specific views.
 * The views attach to these view states.
 * @param {Sim} simMode
 */
export default function ViewStateMachine(pub, simMode, simOptions, changes) {
    const self = this

    pub.attach(self)

    self.views = {
        one: new ViewState(),
        sample: new ViewState(),
    }
    self.state = 'one'

    self.update = (simData) => {
        // state: check for change, exit, set, enter, update.
        if (changes.check(['useDistricts', 'dimensions', 'mode', 'electionMethod'])) {
            Object.keys(self.views).forEach((k) => self.views[k].exit())
            self.state = simOptions.mode
            self.views[self.state].enter()
        }
        self.views[self.state].update(simData)
    }

    self.render = () => { self.views[self.state].render() }
    self.renderForeground = () => { self.views[self.state].renderForeground() }
    self.clear = () => { self.views[self.state].clear() }
    self.clearForeground = () => { self.views[self.state].clearForeground() }

    self.rerender = () => {
        self.clear()
        self.clearForeground()
        self.render()
        self.renderForeground()
    }
}
