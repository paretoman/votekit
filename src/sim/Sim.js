/** @module */

import SimOne from './states/SimOne.js'
import SimSample from './states/SimSample.js'
import SimGeoOne from './states/SimGeoOne.js'
import SimAddVoters from './SimAddVoters.js'
import SimAddCandidates from './SimAddCandidates.js'
import SimAddCandidateDns from './SimAddCandidateDns.js'
import addSimControlsLabel from './addSimControlsLabel.js'
import SimOneDOne from './states/SimOneDOne.js'

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
    election,
    oneElection,
    sampleElections,
    geoElection,
    commander,
    layout,
) {
    const self = this

    // Components //

    self.election = election

    // States //

    const sims = {
        one: new SimOne(screen, menu, changes, oneElection, self),
        oneDOne: new SimOneDOne(screen, menu, changes, oneElection, self),
        // eslint-disable-next-line max-len
        sample: new SimSample(screen, menu, changes, sampleElections, self),
        geoOne: new SimGeoOne(screen, menu, changes, geoElection, self),
    }

    // Entities //

    self.simAddVoters = new SimAddVoters(screen, layout, changes, commander, sims, self)
    self.simAddCandidates = new SimAddCandidates(screen, layout, changes, commander, sims, self)
    self.simAddCandidateDns = new SimAddCandidateDns(screen, layout, changes, commander, sims, self)

    // Default Entities //

    self.simAddCandidates.addCandidate(50, 100, 50, '#e52', true)
    self.simAddCandidates.addCandidate(100, 50, 100, '#5e2', true)
    self.simAddCandidates.addCandidate(300 - 100, 300 - 50, 200, '#25e', true)
    self.simAddCandidateDns.addCandidateDistribution(150, 150, 150, 200, true)
    self.simAddVoters.addVoterCircle(50, 150, 50, 200, 200, 'gaussian', true)
    self.simAddVoters.addVoterCircle(250, 150, 250, 200, 200, 'gaussian', true)

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

    // Buttons //

    addSimControlsLabel(layout)

    // -- Menu -- //

    // add a menu item to switch between types of sims
    // a list of simulation types
    self.typeList = [
        { name: 'One Election', value: 'one', state: '' },
        { name: '1D One Election', value: 'oneDOne', state: '' },
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
