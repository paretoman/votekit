// import sumAllocationsStatewide from '@paretoman/votekit-district-election'
import { range } from '@paretoman/votekit-utilities'
import electionSequence from '@paretoman/votekit-election-sequence'

export default function geoElection(geometry0, optionsBag) {
    const { canPoints, parties, voterParties, dimensions, geography, strategySeed, usePollsByPhase, voterStrategyListByPhase, information } = geometry0
    const { voterGeomsByDistrict } = geography
    const { nd } = geography.districtMap

    // Calculating candidate borders can be useful, unless we have primaries.
    // const voterGeoms00 = voterGeomsByTract[0][0]
    // const { voteCasterName } = optionsBag.electionOptions
    // const canBorders = getCanBorders(canPoints, voterGeoms00, dimensions, voteCasterName)

    const scResultsByDistrict = range(nd).map((iDistrict) => {
        const voterGeoms = voterGeomsByDistrict[iDistrict]
        const geometry = { voterGeoms, voterParties, canPoints, parties, dimensions, strategySeed, information, usePollsByPhase, voterStrategyListByPhase }

        const sequenceResults = electionSequence(geometry, optionsBag)
        return sequenceResults
    })

    // need for visuals
    // votesByTract,
    // votesByDistrict,
    // scResultsByDistrict,
    // votesByTractByDistrict
    // const { electionOptions } = optionsBag
    // const allocation = sumAllocationsStatewide(scResultsByDistrict, canPoints, electionOptions)
    // const socialChoiceResults = { allocation }

    const electionResults = { scResultsByDistrict, geometry: geometry0 }
    return electionResults
}
