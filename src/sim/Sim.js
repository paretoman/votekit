/** @module */

import SimOne from './states/SimOne.js'
import SimSample from './states/SimSample.js'
import SimGeoOne from './states/SimGeoOne.js'
import VoterCircle from '../voters/VoterCircle.js'
import Candidate from '../candidates/Candidate.js'
import CandidateDistribution from '../candidates/CandidateDistribution.js'
import Registrar from './Registrar.js'
import DraggableManager from '../ui/DraggableManager.js'
import createAddVoter from '../ui/createAddVoter.js'
import CreateAddCandidate from '../ui/CreateAddCandidate.js'
import CreateAddCandidateDistribution from '../ui/CreateAddCandidateDistribution.js'

/**
 * Simulation is the main task we're trying to accomplish in this program.
 * There are multiple states that the sim can be in.
 * Each state simulates something different.
 * Each state has initialization, update, and render procedures.
 * This is a state machine.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {OneElection} oneElection
 * @param {SampleElections} sampleElections
 * @param {GeoElection} geoElection
 * @param {Commander} commander
 *
 */
export default function Sim(
    screen,
    menu,
    changes,
    oneElection,
    sampleElections,
    geoElection,
    commander,
    layout,
) {
    const self = this

    // Buttons //

    const label = document.createElement('div')
    label.setAttribute('class', 'button-group-label')
    label.innerText = 'Sim Controls:'
    layout.newElement('simControlsLabel', label)

    createAddVoter(layout, self)
    const canButton = new CreateAddCandidate(layout, self)
    const canDnButton = new CreateAddCandidateDistribution(layout, self)

    // States //

    const voterRegistrar = new Registrar()
    const candidateRegistrar = new Registrar()
    const candidateDnRegistrar = new Registrar()

    const dragms = {
        one: new DraggableManager(screen, changes),
        sample: new DraggableManager(screen, changes),
        geoOne: new DraggableManager(screen, changes),
    }
    const sims = {
        one: new SimOne(screen, dragms.one, menu, changes, oneElection, canButton),
        // eslint-disable-next-line max-len
        sample: new SimSample(screen, dragms.sample, menu, changes, sampleElections, canDnButton),
        geoOne: new SimGeoOne(screen, dragms.geoOne, menu, changes, geoElection, canButton),
    }

    // Entities //

    self.addCandidatePressed = () => {
        self.addCandidate(50, 50, 'yellow', false)
    }
    self.addCandidateDistributionPressed = () => {
        self.addCandidateDistribution(50, 50, 100, false)
    }
    self.addCandidate = (x, y, c, doLoad) => {
        // eslint-disable-next-line no-new, max-len
        const candidate = new Candidate(x, y, 21, 21, c, screen, candidateRegistrar, commander, changes, doLoad)
        sims.one.addSimCandidate(candidate)
        sims.geoOne.addSimCandidate(candidate)
    }
    self.addCandidateDistribution = (x, y, r, doLoad) => {
        // eslint-disable-next-line no-new, max-len
        const candidateDistribution = new CandidateDistribution(x, y, r, screen, candidateDnRegistrar, commander, changes, doLoad)
        sims.sample.addSimCandidateDistribution(candidateDistribution)
    }

    self.addVoterPressed = () => {
        self.addVoterCircle(50, 50, 100, false)
    }

    self.addVoterCircle = (x, y, r, doLoad) => {
        // eslint-disable-next-line max-len
        const voterCircle = new VoterCircle(x, y, r, screen, voterRegistrar, commander, changes, doLoad, self)

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

    commander.newCreator(self.addVoterPressed, 'createVoter')
    commander.newCreator(self.addCandidatePressed, 'createCandidate')
    commander.newCreator(self.addCandidateDistributionPressed, 'createCandidateDistribution')

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
