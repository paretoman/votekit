/** @module */

import SimSample from './states/SimSample.js'
import ElectionOne from '../election/ElectionOne.js'
import ElectionSample from '../election/ElectionSample.js'
import ElectionGeo from '../election/ElectionGeo.js'
import Election from '../election/Election.js'
import SimOne from './states/SimOne.js'
import ElectionSampleGeo from '../election/ElectionSampleGeo.js'
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

    const election = new Election(simOptions, electionOptions)
    const electionOne = new ElectionOne(election)
    const electionSample = new ElectionSample(election)
    const electionGeo = new ElectionGeo(election)
    const electionSampleGeo = new ElectionSampleGeo(electionGeo)
    self.election = election

    // States //
    const sims = {
        // eslint-disable-next-line max-len
        one: new SimOne(entities, changes, electionOne, electionGeo, voterGeo, simOptions, electionOptions),
        // eslint-disable-next-line max-len
        sample: new SimSample(entities, changes, electionSample, electionSampleGeo, voterGeo, simOptions, electionOptions),
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
