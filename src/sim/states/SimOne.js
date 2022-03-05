/** @module */

import OneVoterCircle from '../entities/oneVoterCircle.js'
import SimVoterList from '../entities/SimVoterList.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Election} election
 */
export default function SimOne(
    screen,
    dragm,
    menu,
    changes,
    oneElection,
    commander,
    candidates,
) {
    const self = this

    const oneVoters = new SimVoterList()

    self.addSimVoterCircle = (voterCircle) => {
        oneVoters.newVoterGroup(new OneVoterCircle(voterCircle, screen))
    }

    self.update = () => {
        if (changes.checkNone()) return
        // clear changes, reset to []
        changes.clear()
        oneElection.updateTallies(oneVoters, candidates)
        oneVoters.update(candidates)
        screen.clear()
        self.render()
    }

    self.render = () => {
        oneVoters.render()
    }
    self.renderForeground = () => {
        // sampleElections.renderForeground()
        oneVoters.renderForeground()
        candidates.renderForeground()
    }

    self.enter = () => {}

    self.exit = () => {}
}
