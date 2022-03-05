/** @module */

import SimOne from './states/SimOne.js'
import SimSample from './states/SimSample.js'
import SimGeoOne from './states/SimGeoOne.js'
import VoterCircle from './entities/VoterCircle.js'
import Voters from '../election/Voters.js'
import Candidates from '../election/Candidates.js'
import Candidate from './entities/Candidate.js'
import CandidateDistribution from './entities/CandidateDistribution.js'
import SampleCandidates from '../election/SampleCandidates.js'

/**
 * Simulation is the main task we're trying to accomplish in this program.
 * There are multiple states that the sim can be in.
 * Each state simulates something different.
 * Each state has initialization, update, and render procedures.
 * This is a state machine.
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Election} election
 * @param {SampleElections} sampleElections
 * @param {GeoElection} geoElection
 * @param {Commander} commander
 */
export default function Sim(
    screen,
    dragm,
    menu,
    changes,
    election,
    oneElection,
    sampleElections,
    geoElection,
    commander,
) {
    const self = this

    // States //

    const voters = new Voters()
    const candidates = new Candidates()
    const sampleCandidates = new SampleCandidates()

    const sims = {
        one: new SimOne(screen, dragm, menu, changes, oneElection, commander, candidates),
        sample: new SimSample(screen, dragm, menu, changes, sampleElections, sampleCandidates),
        geoOne: new SimGeoOne(screen, dragm, menu, changes, geoElection, commander, candidates),
    }

    // Entities //

    self.addCandidatePressed = () => {
        self.addCandidate(50, 50, 'yellow', false)
    }
    self.addCandidateDistributionPressed = () => {
        self.addCandidateDistribution(50, 50, 100, false)
    }
    self.addCandidate = (x, y, c, doLoad) => {
        // eslint-disable-next-line no-new
        new Candidate(x, y, 21, 21, c, screen, dragm, candidates, commander, changes, doLoad)
    }
    self.addCandidateDistribution = (x, y, r, doLoad) => {
        // eslint-disable-next-line no-new, max-len
        new CandidateDistribution(x, y, r, screen, dragm, sampleCandidates, commander, changes, doLoad)
    }

    self.addVoterPressed = () => {
        self.addVoterCircle(50, 50, 100, false)
    }

    self.addVoterCircle = (x, y, r, doLoad) => {
        // eslint-disable-next-line max-len
        const voterCircle = new VoterCircle(x, y, r, screen, dragm, voters, commander, changes, doLoad, self)

        sims.one.addSimVoterCircle(voterCircle)
        sims.geoOne.addSimVoterCircle(voterCircle)
        sims.sample.addSimVoterCircle(voterCircle)
    }

    self.addCandidate(50, 100, '#e52', true)
    self.addCandidate(100, 50, '#5e2', true)
    self.addCandidate(300 - 100, 300 - 50, '#25e', true)
    self.addCandidateDistribution(150, 150, 100, true)
    self.addVoterCircle(50, 150, 100, true)
    self.addVoterCircle(250, 150, 100, true)

    // State Machine //

    self.state = 'one' // default
    // self.typeExit = self.state
    changes.add(['simType'])

    self.update = () => {
        // state change
        if (changes.check(['simType'])) {
            // exit states
            Object.keys(sims).forEach((k) => sims[k].exit())
            // enter state
            sims[self.state].enter()
        }

        // state update
        sims[self.state].update()
    }
    self.renderForeground = () => { sims[self.state].renderForeground() }
    self.render = () => { sims[self.state].render() }

    // -- Menu -- //

    // add a menu item to switch between types of sims
    // a list of simulation types
    self.typeList = [
        { name: 'One Election', value: 'one', state: '' },
        { name: 'Sample Elections', value: 'sample', state: '' },
        { name: 'Geo Election', value: 'geoOne', state: '' },
    ]
    menu.addMenuItem(
        self,
        {
            label: 'Simulation:',
            prop: 'state',
            setProp: (p) => { self.state = p },
            options: self.typeList,
            change: ['simType'],
        },
    )
}
