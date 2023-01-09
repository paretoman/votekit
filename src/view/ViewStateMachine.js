/** @module */

import ViewState from './ViewState.js'

/**
 * Need to pass along the pub-sub pattern through view to specific views.
 * The views attach to these view states.
 * @param {Sim} simMachine
 */
export default function ViewStateMachine(simMachine) {
    const self = this

    self.views = {
        one: new ViewState(simMachine.sims.one),
        sample: new ViewState(simMachine.sims.sample),
    }

    self.render = () => { self.views[simMachine.state].render() }
    self.renderForeground = () => { self.views[simMachine.state].renderForeground() }
    self.clear = () => { self.views[simMachine.state].clear() }
    self.clearForeground = () => { self.views[simMachine.state].clearForeground() }

    self.rerender = () => {
        self.clear()
        self.clearForeground()
        self.render()
        self.renderForeground()
    }
}
