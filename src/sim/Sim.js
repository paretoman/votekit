/** @module */

import SimSample from './states/SimSample.js'
import VoterShapeAdd from '../voters/VoterShapeAdd.js'
import CandidateAdd from '../candidates/CandidateAdd.js'
import CandidateDnAdd from '../candidateDns/CandidateDnAdd.js'
import addSimControlsLabel from './addSimControlsLabel.js'
import VoterTest from '../voters/VoterTest.js'
import ElectionOne from '../election/ElectionOne.js'
import ElectionSample from '../election/ElectionSample.js'
import ElectionGeo from '../election/ElectionGeo.js'
import Election from '../election/Election.js'
import SimBase from './states/SimBase.js'
import SimOne from './states/SimOne.js'
import ElectionSampleGeo from '../election/ElectionSampleGeo.js'

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
 *
 * @constructor
 */
export default function Sim(
    screen,
    menu,
    changes,
    commander,
    layout,
) {
    const self = this

    // Components //

    const election = new Election(menu)
    const electionOne = new ElectionOne(election)
    const electionSample = new ElectionSample(election)
    const electionGeo = new ElectionGeo(election)
    const electionSampleGeo = new ElectionSampleGeo(election, electionGeo)

    self.election = election

    // States //

    const sims = {
        one: new SimOne(screen, menu, changes, electionOne, electionGeo, self),
        // eslint-disable-next-line max-len
        sample: new SimSample(screen, menu, changes, electionSample, electionSampleGeo, self),
        base: new SimBase(screen, changes, self),
    }
    self.sims = sims

    // Entities //

    self.voterShapeAdd = new VoterShapeAdd(screen, layout, changes, commander, sims, self)
    self.candidateAdd = new CandidateAdd(screen, layout, changes, commander, sims, self)
    self.candidateDnAdd = new CandidateDnAdd(screen, layout, changes, commander, sims, self)

    self.voterTest = new VoterTest(screen, sims, self)
    self.testVote = () => sims[self.state].testVoteSim()

    // Default Entities //

    self.candidateAdd.addCandidate({ x: 50, y: 100 }, { x: 50 }, '#e05020', true)
    self.candidateAdd.addCandidate({ x: 100, y: 50 }, { x: 100 }, '#50e020', true)
    self.candidateAdd.addCandidate({ x: 300 - 100, y: 300 - 50 }, { x: 200 }, '#2050e0', true)
    self.candidateDnAdd.addCandidateDistribution({ x: 150, y: 150, w: 200 }, { x: 150, w: 200, densityProfile: 'gaussian' }, true)
    self.voterShapeAdd.addVoterCircle({ x: 50, y: 150, w: 200 }, { x: 50, w: 200, densityProfile: 'gaussian' }, true)
    self.voterShapeAdd.addVoterCircle({ x: 250, y: 150, w: 200 }, { x: 250, w: 200, densityProfile: 'gaussian' }, true)

    // State Machine //

    self.state = 'one' // default
    self.viz = 'one'
    self.geo = false
    self.election.setDimensions(2)
    // self.typeExit = self.state
    changes.add(['geo', 'dimensions', 'viz'])

    self.update = () => {
        // state change
        if (changes.check(['geo', 'dimensions', 'viz', 'electionMethod'])) {
            // exit states
            Object.keys(sims).forEach((k) => sims[k].exit())
            // compute state
            self.state = computeState()
            // enter state
            sims[self.state].enter()
        }

        // state update
        sims[self.state].update()
    }
    function computeState() {
        // right now, we use combinations of these state variables
        // to determine which state to take, as opposed to having
        // nested states.
        // Also, we don't yet have implementations of all the possible
        // combinations of these state variables.
        if (self.viz === 'one') {
            return 'one'
        }
        return 'sample'
    }
    self.renderForeground = () => { sims[self.state].renderForeground() }
    self.render = () => { sims[self.state].render() }

    self.setShowNonExistingEntities = (a) => {
        self.showGhosts = a
        changes.add(['showGhosts'])
    }

    // Buttons //

    addSimControlsLabel(layout)

    // -- Menu -- //

    // add a menu item to switch between types of sims
    // a list of simulation types
    const vizList = [
        { name: 'One Election', value: 'one' },
        { name: 'Sample Elections', value: 'sample' },
    ]
    menu.addMenuItem(
        self,
        {
            label: 'Viz:',
            prop: 'viz',
            setProp: (p) => { self.viz = p },
            options: vizList,
            change: ['viz'],
        },
    )

    const geoList = [
        { name: 'On', value: true },
        { name: 'Off', value: false },
    ]
    menu.addMenuItem(
        self,
        {
            label: 'Geo:',
            prop: 'geo',
            setProp: (p) => { self.geo = p },
            options: geoList,
            change: ['geo'],
        },
    )

    const dimensionList = [
        { name: '1D', value: 1 },
        { name: '2D', value: 2 },
    ]
    menu.addMenuItem(
        self.election,
        {
            label: 'Dimensions:',
            prop: 'dimensions',
            setProp: (p) => { self.election.setDimensions(p) },
            options: dimensionList,
            change: ['dimensions'],
        },
    )
}
