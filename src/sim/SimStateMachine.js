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
export default function SimStateMachine(pub, entities, voterDistricts, changes, simOptions, electionOptions) {
    const self = this

    // States //
    const modes = {
        one: new SimOne(pub, entities, changes, voterDistricts, simOptions, electionOptions),
        sample: new SimSample(pub, entities, changes, voterDistricts, simOptions, electionOptions),
    }
    self.modes = modes

    // State Machine //
    self.update = () => {
        modes[simOptions.mode].update()

        changes.clear()
    }
}
