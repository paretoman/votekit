/** @module */

import colorBlender, { rgbToString } from './colorBlender.js'
import getTallyFractions from './getTallyFractions.js'

export default function districtColors(districtElectionResults, candidateList, electionOptions, simOptions) {
    const {
        votesByTract,
        votesByDistrict,
        scResultsByDistrict,
    } = districtElectionResults

    const canList = candidateList.getEntities()

    const colorByTract = colorTracts(votesByTract, canList)
    const colorOfWinsByDistrict = colorDistrictWins(scResultsByDistrict, canList, electionOptions, simOptions)
    const colorOfVoteByDistrict = colorDistrictVote(votesByDistrict, canList)

    const gc = {
        colorByTract,
        colorOfVoteByDistrict,
        colorOfWinsByDistrict,
    }
    return gc
}

function colorTracts(votesByTract, canList) {
    // get color
    const colorSet = canList.map((can) => can.colorRGBA)
    const colorByTract = votesByTract.map(
        (row) => row.map(
            (votes) => {
                const tallyFractions = getTallyFractions(votes)
                const color = colorBlender(tallyFractions, colorSet)
                return color
            },
        ),
    )
    return colorByTract
}

function colorDistrictWins(scResultsByDistrict, canList, electionOptions, simOptions) {
    // calculate color for win map
    let colorOfWinsByDistrict

    const { sequenceName, sequences } = electionOptions.sequenceOptions
    const { resultsPhaseBySeq } = simOptions
    const resultsPhaseName = resultsPhaseBySeq[sequenceName]
    const resultsPhaseOptions = sequences[sequenceName].phases[resultsPhaseName]
    const { socialChoiceType } = resultsPhaseOptions

    if (socialChoiceType === 'singleWinner') {
        colorOfWinsByDistrict = scResultsByDistrict.map(
            (socialChoiceResults) => canList[socialChoiceResults.iWinner].color,
        )
    } else {
        const colorSet = canList.map((can) => can.colorRGBA)
        colorOfWinsByDistrict = scResultsByDistrict.map(
            (socialChoiceResults) => {
                const { allocation } = socialChoiceResults
                const sum = allocation.reduce((p, c) => p + c)
                const fractions = allocation.map((x) => x / sum)
                const color = rgbToString(colorBlender(fractions, colorSet))
                return color
            },
        )
    }
    return colorOfWinsByDistrict
}

/**
 * Update color for each district, based on votes for each candidate.
 * Blend candidate colors in proportion to their votes.
 * @param {Candidate[]} canList - An array of Candidate objects.
 * @returns {String[]} - List of color strings indexed by district.
 */
function colorDistrictVote(votesByDistrict, canList) {
    const colorOfVoteByDistrict = votesByDistrict.map((votes) => {
        const tallyFractions = getTallyFractions(votes)
        const colorSet = canList.map((can) => can.colorRGBA)
        const color = rgbToString(colorBlender(tallyFractions, colorSet))
        return color
    })
    return colorOfVoteByDistrict
}
