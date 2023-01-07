/** @module */

import electionDistrictsRun from '../../electionDistricts/electionDistrictsRun.js'
import electionRun from '../../election/electionRun.js'
import getGeometry from '../getGeometry.js'
import StatePublisher from './StatePublisher.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Create a geographical district map with variations of voter center.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {VoterDistricts} voterDistricts
 * @param {Sim} sim
 * @constructor
 */
// eslint-disable-next-line max-len
export default function SimOne(entities, changes, voterDistricts, simOptions, electionOptions) {
    const self = this

    self.pub = new StatePublisher()

    const { voterShapeList, candidateList } = entities

    // Strategies //
    let electionStrategy

    // Main State Machine Functions //
    self.enter = () => {
        electionStrategy = (simOptions.useDistricts) ? electionDistrictsRun : electionRun
        self.pub.enter()
    }
    self.exit = () => {
        self.pub.exit()
    }
    self.update = () => {
        if (changes.checkNone()) return

        electionOptions.update()

        if (simOptions.useDistricts) voterDistricts.update()

        const geometry = getGeometry(voterShapeList, candidateList, simOptions, voterDistricts)

        const electionResults = electionStrategy(geometry, electionOptions)

        electionResults.colorRGBAOfCandidates = candidateList.getRGBAList()

        const simData = { electionResults }
        self.pub.update(simData)
    }
}
