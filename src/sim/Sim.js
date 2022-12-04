/** @module */

import SimSample from './states/SimSample.js'
import VoterShapeList from '../voters/VoterShapeList.js'
import CandidateList from '../candidates/CandidateList.js'
import CandidateDnList from '../candidateDns/CandidateDnList.js'
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
export default function Sim(menu, changes, commander, layout) {
    const self = this

    // Components //

    const voterGeo = new VoterGeo(self, changes)
    self.voterGeo = voterGeo

    const election = new Election(menu)
    const electionOne = new ElectionOne(election)
    const electionSample = new ElectionSample(election)
    const electionGeo = new ElectionGeo(election, voterGeo)
    const electionSampleGeo = new ElectionSampleGeo(election, electionGeo, voterGeo)
    self.election = election

    // Entities //
    self.candidateList = new CandidateList(layout, changes, commander, self)
    self.voterShapeList = new VoterShapeList(layout, changes, commander, self)
    self.candidateDnList = new CandidateDnList(layout, changes, commander, self)

    // States //
    const sims = {
        one: new SimOne(menu, changes, election, electionOne, electionGeo, voterGeo, self),
        // eslint-disable-next-line max-len
        sample: new SimSample(menu, changes, election, electionSample, electionSampleGeo, voterGeo, self),
    }
    self.sims = sims

    // Publish for View //
    const observers = []
    self.attach = (observer) => { observers.push(observer) }
    const updateObservers = (electionResults) => {
        observers.forEach((o) => o.update(electionResults))
    }

    // Defaults //
    self.state = 'one'
    self.viz = 'one'
    self.geo = false
    self.election.setDimensions(2)
    changes.add(['geo', 'dimensions', 'viz'])

    // State Machine //
    self.update = () => {
        // state: check for change, exit, set, enter, update.
        if (changes.check(['geo', 'dimensions', 'viz', 'electionMethod'])) {
            Object.keys(sims).forEach((k) => sims[k].exit())
            self.state = computeState()
            sims[self.state].enter()
        }
        const results = sims[self.state].update()

        updateObservers(results)
        changes.clear()
    }
    function computeState() {
        // Determine state of sim.
        if (self.viz === 'one') {
            return 'one'
        }
        return 'sample'
    }
}
