/** @module */

import SimModeSample from './SimModeSample.js'
import SimModeOne from './SimModeOne.js'

/**
 * Simulation is the main task we're trying to accomplish in this program.
 * There are multiple states that the sim can be in.
 * Each state simulates something different.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Commander} commander
 */
export default function SimMode(pub, entities, districtGeometry, changes, simOptions, electionOptions) {
    const self = this

    self.modes = {
        one: new SimModeOne(pub, entities, changes, districtGeometry, simOptions, electionOptions),
        sample: new SimModeSample(pub, entities, changes, districtGeometry, simOptions, electionOptions),
    }

    self.update = () => {
        self.modes[simOptions.mode].update()
    }
}
