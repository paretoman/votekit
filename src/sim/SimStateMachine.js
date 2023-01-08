/** @module */

import SimSample from './states/SimSample.js'
import SimOne from './states/SimOne.js'

/**
 * Simulation is the main task we're trying to accomplish in this program.
 * There are multiple states that the sim can be in.
 * Each state simulates something different.
 * Each state has initialization, update, and render procedures.
 * This is a state machine.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Commander} commander
 */
export default function SimStateMachine(entities, voterDistricts, changes, simOptions, electionOptions) {
    const self = this

    // States //
    const sims = {
        one: new SimOne(entities, changes, voterDistricts, simOptions, electionOptions),
        sample: new SimSample(entities, changes, voterDistricts, simOptions, electionOptions),
    }
    self.sims = sims

    self.state = simOptions.mode

    // State Machine //
    self.update = () => {
        // state: check for change, exit, set, enter, update.
        if (changes.check(['design', 'dimensions', 'mode', 'electionMethod'])) {
            Object.keys(sims).forEach((k) => sims[k].exit())
            self.state = simOptions.mode
            sims[self.state].enter()
        }
        sims[self.state].update()

        changes.clear()
    }
}
