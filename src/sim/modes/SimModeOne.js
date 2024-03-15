/** @module */

import geoElection from '@paretoman/votekit-geographic-election'
import getGeometry from '../geometry/getGeometry.js'

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
        const optionsBag = electionOptionsMan.getOptions()

        districts.update()

        const geometry = getGeometry(voterShapeList, candidateList, simOptions, optionsBag, districts)

        const geoResults = geoElection(geometry, optionsBag)

        geoResults.colorRGBAOfCandidates = candidateList.getRGBAList()

        const simData = { geoResults }
        pub.update(simData)
        changes.clear()
    }
}
