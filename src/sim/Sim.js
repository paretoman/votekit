/** @module */

import SimOne2D from './states/SimOne2D.js'
import SimSample from './states/SimSample.js'
import SimGeoOne from './states/SimGeoOne.js'
import VoterShapeAdd from '../voters/VoterShapeAdd.js'
import CandidateAdd from '../candidates/CandidateAdd.js'
import CandidateDnAdd from '../candidateDns/CandidateDnAdd.js'
import addSimControlsLabel from './addSimControlsLabel.js'
import SimOne1D from './states/SimOne1D.js'
import TestVoter from './TestVoter.js'
import ElectionOne from '../election/ElectionOne.js'
import ElectionSample from '../election/ElectionSample.js'
import ElectionGeo from '../election/ElectionGeo.js'
import Election from '../election/Election.js'

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

    self.election = election

    // States //

    const sims = {
        one2D: new SimOne2D(screen, menu, changes, electionOne, self),
        one1D: new SimOne1D(screen, menu, changes, electionOne, self),
        // eslint-disable-next-line max-len
        sample: new SimSample(screen, menu, changes, electionSample, self),
        geoOne: new SimGeoOne(screen, menu, changes, electionGeo, self),
    }
    self.sims = sims

    // Entities //

    self.voterShapeAdd = new VoterShapeAdd(screen, layout, changes, commander, sims, self)
    self.candidateAdd = new CandidateAdd(screen, layout, changes, commander, sims, self)
    self.candidateDnAdd = new CandidateDnAdd(screen, layout, changes, commander, sims, self)

    self.testVoter = new TestVoter(screen, sims, self)
    self.testVote = () => sims[self.state].testVote()

    // Default Entities //

    self.candidateAdd.addCandidate({ x: 50, y: 100 }, { x: 50 }, '#e05020', true)
    self.candidateAdd.addCandidate({ x: 100, y: 50 }, { x: 100 }, '#50e020', true)
    self.candidateAdd.addCandidate({ x: 300 - 100, y: 300 - 50 }, { x: 200 }, '#2050e0', true)
    self.candidateDnAdd.addCandidateDistribution({ x: 150, y: 150, w: 200 }, { x: 150 }, true)
    self.voterShapeAdd.addVoterCircle({ x: 50, y: 150, w: 200 }, { x: 50, w: 200, densityProfile: 'gaussian' }, true)
    self.voterShapeAdd.addVoterCircle({ x: 250, y: 150, w: 200 }, { x: 250, w: 200, densityProfile: 'gaussian' }, true)

    // State Machine //

    self.state = 'one2D' // default
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

    self.setShowNonExistingEntities = (a) => {
        self.showGhosts = a
        changes.add(['showGhosts'])
    }

    // Buttons //

    addSimControlsLabel(layout)

    // -- Menu -- //

    // add a menu item to switch between types of sims
    // a list of simulation types
    self.typeList = [
        { name: 'One Election', value: 'one2D', state: '' },
        { name: '1D One Election', value: 'one1D', state: '' },
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
