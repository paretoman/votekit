/** @module */

import getGeometry from '../getGeometry.js'
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
export default function SimOne(entities, changes, electionOne, electionGeo, voterGeo, simOptions, electionOptions) {
    const self = this

    self.pub = new StatePublisher()

    const { voterShapeList, candidateList } = entities

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

        electionOptions.update()

        if (simOptions.geo) voterGeo.update()

        const geometry = getGeometry(voterShapeList, candidateList, simOptions, voterGeo)

        const electionResults = electionStrategy
            .runElectionSim(geometry, electionOptions)

        electionResults.colorRGBAOfCandidates = candidateList.getRGBAList()
        electionResults.geometry = geometry

        self.pub.update(electionResults)
    }
}
