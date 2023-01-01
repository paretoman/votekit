/** @module */

import StatePublisher from './StatePublisher.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Create a geographical map with variations of voter center.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {ElectionOne} electionOne
 * @param {ElectionGeo} electionGeo
 * @param {VoterGeo} voterGeo
 * @param {Sim} sim
 * @constructor
 */
// eslint-disable-next-line max-len
export default function SimOne(entities, menu, changes, election, electionOne, electionGeo, voterGeo, simOptions) {
    const self = this

    self.pub = new StatePublisher()

    // Strategies //
    let electionStrategy

    // Main State Machine Functions //
    self.enter = () => {
        electionStrategy = (simOptions.geo) ? electionGeo : electionOne
        self.pub.enter()
    }
    self.exit = () => {
        self.pub.exit()
    }
    self.update = () => {
        if (changes.checkNone()) return

        if (simOptions.geo) voterGeo.update()
        const electionResults = electionStrategy
            .runElectionSim(entities.voterShapeList, entities.candidateList, changes)

        self.pub.update(electionResults)
    }
}
