/** @module */

import SimSample from './states/SimSample.js'
import SimOne from './states/SimOne.js'
import VoterGeo from '../voters/VoterGeo.js'

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
export default function Sim(entities, changes, simOptions, electionOptions) {
    const self = this

    // Components //

    const { voterShapeList } = entities
    const voterGeo = new VoterGeo(voterShapeList, changes)

    // States //
    const sims = {
        one: new SimOne(entities, changes, voterGeo, simOptions, electionOptions),
        sample: new SimSample(entities, changes, voterGeo, simOptions, electionOptions),
    }
    self.sims = sims

    self.state = simOptions.viz

    // State Machine //
    self.update = () => {
        // state: check for change, exit, set, enter, update.
        if (changes.check(['geo', 'dimensions', 'viz', 'electionMethod'])) {
            Object.keys(sims).forEach((k) => sims[k].exit())
            self.state = simOptions.viz
            sims[self.state].enter()
        }
        sims[self.state].update()

        changes.clear()
    }
}
