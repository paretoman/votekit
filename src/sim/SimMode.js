/** @module */

import SimSample from './states/SimSample.js'
import SimOne from './states/SimOne.js'

/**
 * Simulation is the main task we're trying to accomplish in this program.
 * There are multiple states that the sim can be in.
 * Each state simulates something different.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Commander} commander
 */
export default function SimMode(pub, entities, voterDistricts, changes, simOptions, electionOptions) {
    const self = this

    self.modes = {
        one: new SimOne(pub, entities, changes, voterDistricts, simOptions, electionOptions),
        sample: new SimSample(pub, entities, changes, voterDistricts, simOptions, electionOptions),
    }

    self.update = () => {
        self.modes[simOptions.mode].update()
    }
}
