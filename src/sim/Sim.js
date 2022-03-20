/** @module */

import SimOne from './states/SimOne.js'
import SimSample from './states/SimSample.js'
import SimGeoOne from './states/SimGeoOne.js'
import VoterCircle from '../voters/VoterCircle.js'
import Candidate from '../candidates/Candidate.js'
import CandidateDistribution from '../candidates/CandidateDistribution.js'
import Registrar from './Registrar.js'
import createAddVoter from './createAddVoter.js'
import CreateAddCandidate from './CreateAddCandidate.js'
import CreateAddCandidateDistribution from './CreateAddCandidateDistribution.js'
import CandidateCommander from '../candidates/CandidateCommander.js'
import CandidateDnCommander from '../candidates/CandidateDnCommander.js'
import VoterCircleCommander from '../voters/VoterCircleCommander.js'

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
 * @constructor
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

    const sims = {
        one: new SimOne(screen, menu, changes, oneElection, canButton),
        // eslint-disable-next-line max-len
        sample: new SimSample(screen, menu, changes, sampleElections, canDnButton),
        geoOne: new SimGeoOne(screen, menu, changes, geoElection, canButton),
    }

    // Entities //

    const candidateCommander = new CandidateCommander(candidateRegistrar, commander, self)
    const candidateDnCommander = new CandidateDnCommander(candidateDnRegistrar, commander, self)
    const voterCommander = new VoterCircleCommander(voterRegistrar, commander, self)

    self.addCandidatePressed = () => {
        // really, we want to make a command to set numCandidates to at least an amount
        const num = candidateRegistrar.num() + 1
        candidateCommander.setNumberCandidates(num)
    }
    self.setNumberCandidatesAction = (num) => {
        while (candidateRegistrar.num() < num) {
            self.addCandidate(50, 50, 'yellow', false)
        }
    }

    self.addCandidateDistributionPressed = () => {
        const num = candidateDnRegistrar.num() + 1
        candidateDnCommander.setNumberCandidateDns(num)
    }
    self.setNumberCandidateDnsAction = (num) => {
        while (candidateDnRegistrar.num() < num) {
            self.addCandidateDistribution(50, 50, 100, false)
        }
    }

    self.addCandidate = (x, y, c, doLoad) => {
        // eslint-disable-next-line no-new, max-len
        const candidate = new Candidate(x, y, 21, 21, c, screen, candidateRegistrar, commander, changes, doLoad, candidateCommander)
        sims.one.addSimCandidate(candidate)
        sims.geoOne.addSimCandidate(candidate)

        const num = candidateRegistrar.num()
        candidateCommander.setNumberCandidates(num)
    }
    self.addCandidateDistribution = (x, y, r, doLoad) => {
        // eslint-disable-next-line no-new, max-len
        const candidateDistribution = new CandidateDistribution(x, y, r, screen, candidateDnRegistrar, commander, changes, doLoad, candidateDnCommander)
        sims.sample.addSimCandidateDistribution(candidateDistribution)

        const num = candidateDnRegistrar.num()
        candidateDnCommander.setNumberCandidateDns(num)
    }

    self.addVoterPressed = () => {
        const num = voterRegistrar.num() + 1
        voterCommander.setNumberVoters(num)
    }
    self.setNumberVotersAction = (num) => {
        while (voterRegistrar.num() < num) {
            self.addVoterCircle(50, 50, 100, false)
        }
    }

    self.addVoterCircle = (x, y, r, doLoad) => {
        // eslint-disable-next-line max-len
        const voterCircle = new VoterCircle(x, y, r, screen, voterRegistrar, commander, changes, doLoad, voterCommander)

        sims.one.addSimVoterCircle(voterCircle)
        sims.geoOne.addSimVoterCircle(voterCircle)
        sims.sample.addSimVoterCircle(voterCircle)

        const num = voterRegistrar.num()
        voterCommander.setNumberVoters(num)
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
