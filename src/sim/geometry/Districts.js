/** @module */

import makeGeography, { makeTracts, updateCensus, updateDistricts, updateVotersByDistrict, updateVotersByTract } from '@paretoman/votekit-make-geography'

/**
 * @constructor
 */
export default function Districts(voterShapeList, changes, electionOptionsMan, simOptions) {
    const self = this

    self.init = () => {
        const optionsBag = electionOptionsMan.getOptions()
        const { numTracts, numDistricts } = optionsBag
        const { dimensions } = simOptions
        const voterGeoms = voterShapeList.getGeoms(dimensions)
        self.geography = makeGeography(numTracts, numDistricts, voterGeoms, dimensions)
    }

    let firstRun = true

    // Update call from sim //
    self.update = () => {
        if (changes.checkNone()) return

        if (firstRun) {
            firstRun = false
            self.init()
            return
        }

        const optionsBag = electionOptionsMan.getOptions()

        if (changes.check(['numTracts'])) {
            const { numTracts } = optionsBag
            self.geography = makeTracts(self.geography, numTracts)
        }

        if (changes.check(['numDistricts'])) {
            const { numDistricts } = optionsBag
            self.geography = updateDistricts(self.geography, numDistricts)
        }

        if (changes.check(['numDistricts', 'numTracts'])) {
            self.geography = updateCensus(self.geography)
        }

        if (changes.check(['voters', 'dimensions', 'numTracts'])) {
            const { dimensions } = simOptions
            const voterGeoms = voterShapeList.getGeoms(dimensions)
            self.geography = updateVotersByTract(self.geography, voterGeoms, dimensions)
            // todo: maybe make this only trigger when voters change
        }

        if (changes.check(['voters', 'dimensions', 'numTracts', 'numDistricts'])) {
            self.geography = updateVotersByDistrict(self.geography)
            // todo: maybe make this only trigger when voters change
        }
    }
}
