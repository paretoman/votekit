/** @module */

import electionDistrictsRun from '../../election/electionDistricts/electionDistrictsRun.js'
import electionRun from '../../election/election/electionRun.js'
import getGeometry from './getGeometry.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Create a geographical district map with variations of voter center.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {VoterDistricts} voterDistricts
 * @constructor
 */
// eslint-disable-next-line max-len
export default function SimModeOne(pub, entities, changes, voterDistricts, simOptions, electionOptions) {
    const self = this

    const { voterShapeList, candidateList } = entities

    self.update = () => {
        if (changes.checkNone()) return

        electionOptions.update()

        if (simOptions.useDistricts) voterDistricts.update()

        const geometry = getGeometry(voterShapeList, candidateList, simOptions, voterDistricts)

        const electionStrategy = (simOptions.useDistricts) ? electionDistrictsRun : electionRun
        const electionResults = electionStrategy(geometry, electionOptions)

        electionResults.colorRGBAOfCandidates = candidateList.getRGBAList()

        const simData = { electionResults }
        pub.update(simData)
        changes.clear()
    }
}
