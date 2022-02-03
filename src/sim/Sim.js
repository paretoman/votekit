/** @module */

import SimOne from './simStates/SimOne.js'
import SimMany from './simStates/SimMany.js'

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
 * @param {SimElections} simElections
 * @param {String} initialState
 */
export default function Sim(screen, dragm, menu, changes, election, simElections, initialState) {
    const self = this

    const sims = {
        one: new SimOne(screen, dragm, menu, changes, election),
        many: new SimMany(screen, dragm, menu, changes, simElections),
    }

    self.state = initialState
    self.typeExit = self.state
    self.update = () => {
        // state change
        if (changes.check(['simType'])) {
            // exit state
            dragm.clear()
            election.clear()

            // enter state
            if (self.state === 'one') {
                sims[self.state] = new SimOne(screen, dragm, menu, changes, election)
            } else {
                sims[self.state] = new SimMany(screen, dragm, menu, changes, simElections)
            }
        }

        // state update
        sims[self.state].update()
    }
    self.render = () => { sims[self.state].render() }

    // -- Menu --

    // add a menu item to switch between types of sims
    // a list of simulation types
    self.typeList = [
        { name: 'One Election', value: 'one', state: '' },
        { name: 'Many Elections', value: 'many', state: '' },
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
