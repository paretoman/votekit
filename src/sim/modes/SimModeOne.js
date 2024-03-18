/** @module */

import geoElection from '@paretoman/votekit-geographic-election'
import districtElection from '@paretoman/votekit-district-election'
import getGeometry from '../geometry/getGeometry.js'
import getGeometryForPhase from '../../compute/electionSequence/getGeometryForPhase.js'

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

        const geoResults = districtPatch(geometry, optionsBag)

        geoResults.colorRGBAOfCandidates = candidateList.getRGBAList()

        const simData = { geoResults }
        pub.update(simData)
        changes.clear()
    }
}

function districtPatch(geometry, optionsBag) {
    if (optionsBag.useGeography === true) {
        const { sequenceName } = optionsBag.sequenceOptions
        const phaseName = 'general'
        const electionOptions = optionsBag.sequenceOptions.sequences[sequenceName].phases[phaseName]
        const { castOptions } = optionsBag
        const geometry2 = getGeometryForPhase(phaseName, geometry)
        const deResults = districtElection(geometry2, electionOptions, castOptions)
        const geoResults = deResults
        if (sequenceName !== 'general') {
            const message = 'Elections with both geographic components and sequence components are not yet implemented. Change number of districts to 1 and number of tracts to 1 or change election sequence to general.'
            console.warn(message)
            window.alert(message)
        }
        return geoResults
    }
    // else
    return geoElection(geometry, optionsBag)
}
