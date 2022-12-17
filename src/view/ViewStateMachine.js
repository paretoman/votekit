/** @module */

import ViewState from './ViewState.js'

/**
 * Need to pass along the pub-sub pattern through view to specific views.
 * The views attach to these view states.
 * @param {Sim} sim
 */
export default function ViewStateMachine(sim) {
    const self = this

    self.views = {
        one: new ViewState(sim.sims.one),
        sample: new ViewState(sim.sims.sample),
    }

    self.render = () => { self.views[sim.state].render() }
    self.renderForeground = () => { self.views[sim.state].renderForeground() }
    self.clear = () => { self.views[sim.state].clear() }
    self.clearForeground = () => { self.views[sim.state].clearForeground() }
}
