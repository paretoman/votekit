/** @module */

import getGeometry from '../geometry/getGeometry.js'
import election from '../../election/src/sequence/election.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Create a geographical district map with variations of voter center.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {DistrictGeometry} districts
 * @constructor
 */
// eslint-disable-next-line max-len
export default function SimModeOne(pub, entities, changes, districts, simOptions, electionOptionsMan) {
    const self = this

    const { voterShapeList, candidateList } = entities

    self.update = () => {
        if (changes.checkNone()) return

        electionOptionsMan.update()
        const electionOptions = electionOptionsMan.getOptions()

        districts.update()

        const geometry = getGeometry(voterShapeList, candidateList, simOptions, electionOptions, districts)

        const electionResults = election(geometry, electionOptions)

        electionResults.colorRGBAOfCandidates = candidateList.getRGBAList()

        const simData = { electionResults }
        pub.update(simData)
        changes.clear()
    }
}
