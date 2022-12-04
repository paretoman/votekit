/** @module */

import VoterTest from '../voters/VoterTest.js'
import ViewBase from './states/ViewBase.js'
import ViewOne from './states/ViewOne.js'
import ViewSample from './states/ViewSample.js'

/**
 * Simulation is the main task we're trying to accomplish in this program.
 * There are multiple states that the sim can be in.
 * Each state simulates something different.
 * Each state has initialization, update, and render procedures.
 * This is a state machine.
 * @param {Sim} sim
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 */
export default function View(sim, screen, menu, changes) {
    const self = this

    // Subscribe to Sim //
    sim.attach(self)

    // States //
    const views = {
        one: new ViewOne(screen, menu, changes, sim, self),
        sample: new ViewSample(screen, menu, changes, sim, self),
        base: new ViewBase(screen, changes, self),
    }
    self.views = views

    // Entities //
    self.voterTest = new VoterTest(screen, views, sim, self)
    self.testVote = () => views[self.state].testVoteView()

    // State Machine //

    self.state = sim.state

    self.update = (electionResults) => {
        // state: check for change, exit, set, enter, update.
        if (changes.check(['geo', 'dimensions', 'viz', 'electionMethod'])) {
            Object.keys(views).forEach((k) => views[k].exit())
            self.state = sim.state
            views[self.state].enter()
        }

        if (changes.checkNone()) return
        views[self.state].update(electionResults)
    }
    self.renderForeground = () => { views[self.state].renderForeground() }
    self.render = () => { views[self.state].render() }

    self.setShowNonExistingEntities = (a) => {
        self.showGhosts = a
        changes.add(['showGhosts'])
    }
}
