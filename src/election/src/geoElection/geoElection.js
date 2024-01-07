import electionSequence from '../sequence/electionSequence.js'
import { range } from '../util/mathHelpers.js'

export default function geoElection(geometry0, optionsBag) {
    const { canPoints, canLabels, parties, voterParties, dimensions, geography, strategySeed, usePollsByPhase, voterStrategyListByPhase, information } = geometry0
    const { census, voterGeomsByTract } = geography
    const { nd } = geography.districtMap

    // Calculating candidate borders can be useful, unless we have primaries.
    // const voterGeoms00 = voterGeomsByTract[0][0]
    // const { voteCasterName } = optionsBag.electionOptions
    // const canBorders = getCanBorders(canPoints, voterGeoms00, dimensions, voteCasterName)

    const scResultsByDistrict = range(nd).map((iDistrict) => {
        const cen = census[iDistrict]
        const voterGeoms = []
        const voterGeomWeights = []
        for (let j = 0; j < cen.length; j++) {
            const [gx, gy, gf] = cen[j]
            const voterGeomsForTract = voterGeomsByTract[gx][gy]
            // Adjust the weight of each voter geometry by the tract's weight in the census.
            for (let i = 0; i < voterGeomsForTract.length; i++) {
                voterGeoms.push(voterGeomsForTract[i])
                voterGeomWeights.push(gf)
            }
        }
        const geometry = { voterGeoms, voterGeomWeights, voterParties, canPoints, canLabels, parties, dimensions, strategySeed, information, usePollsByPhase, voterStrategyListByPhase }

        const sequenceResults = electionSequence(geometry, optionsBag)
        return sequenceResults
    })

    const electionResults = { scResultsByDistrict, geometry: geometry0 }
    return electionResults
}
