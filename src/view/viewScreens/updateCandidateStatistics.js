import { range } from '@paretoman/votekit-utilities'
import getTallyFractions from '../viz/getTallyFractions.js'
import getPhaseResults from '../phase/getPhaseResults.js'
import getAllocation from '../viz/getAllocation.js'

export default function updateCandidateStatistics(candidateViewList, simData, simOptions, optionsBag) {
    const { geoResults } = simData
    if (geoResults.error) return

    const phaseResults = phaseResultsDistrictPatch(geoResults, simOptions, optionsBag)
    if (phaseResults.error) return

    const numCans = geoResults.geometry.canPoints.length
    const tf = Array(numCans)
    const al = Array(numCans)

    const allocation = getAllocation(phaseResults)

    const { votes } = phaseResults
    const tallyFractions = getTallyFractions(votes)

    // map results to original candidate indices
    const canLabels = canLabelsDistrictPatch(phaseResults, optionsBag)
    for (let i = 0; i < canLabels.length; i++) {
        const index = canLabels[i]
        tf[index] = tallyFractions[i]
        al[index] = allocation[i]
    }
    candidateViewList.setCandidateFractions(tf)
    candidateViewList.setCandidateWins(al)
}

function phaseResultsDistrictPatch(geoResults, simOptions, optionsBag) {
    if (optionsBag.useGeography === true) {
        return geoResults
    }
    return getPhaseResults(geoResults.scResultsByDistrict[0], simOptions)
}

function canLabelsDistrictPatch(phaseResults, optionsBag) {
    if (optionsBag.useGeography === true) {
        const numCans = phaseResults.geometry.canPoints.length
        return range(numCans)
    }

    return phaseResults.geometry.canLabels
}
