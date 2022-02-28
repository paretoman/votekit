/** @module */

import SimOne from './states/SimOne.js'
import SimSample from './states/SimSample.js'
import SimGeoOne from './states/SimGeoOne.js'

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

    changes.add(['simType'])
    const sims = {
    }

    self.state = 'one' // default
    self.typeExit = self.state
    self.update = () => {
        // state change
        if (changes.check(['simType'])) {
            // exit state
            dragm.clear()
            if (sims.one) sims.one.clear()
            if (sims.sample) sims.sample.clear()
            if (sims.geoOne) sims.geoOne.clear()
            screen.hideGeoMaps()

            // enter state
            if (self.state === 'one') {
                sims[self.state] = new SimOne(screen, dragm, menu, changes, oneElection, commander)
            } else if (self.state === 'sample') {
                sims[self.state] = new SimSample(screen, dragm, menu, changes, sampleElections)
            } else if (self.state === 'geoOne') {
                sims[self.state] = new SimGeoOne(screen, dragm, menu, changes, geoElection)
            }
        }

        // state update
        sims[self.state].update()
    }
    self.renderForeground = () => { sims[self.state].renderForeground() }
    self.render = () => { sims[self.state].render() }

    // -- Menu --

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
