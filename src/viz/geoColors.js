/** @module */

import colorBlender, { rgbToString } from './colorBlender.js'

export default function geoColors(geoElectionResults, candidateList, electionOptions) {
    const {
        resultsByTract,
        resultsByDistrict,
    } = geoElectionResults

    const canList = candidateList.getCandidates()

    const colorByTract = colorTracts(resultsByTract, canList)
    const colorOfWinsByDistrict = colorDistrictWins(resultsByDistrict, canList, electionOptions)
    const colorOfVoteByDistrict = colorDistrictVote(resultsByDistrict, canList)

    const gc = {
        colorByTract,
        colorOfVoteByDistrict,
        colorOfWinsByDistrict,
    }
    return gc
}

function colorTracts(resultsByTract, canList) {
    // get color
    const colorSet = canList.map((can) => can.colorRGBA)
    const colorByTract = resultsByTract.map(
        (row) => row.map(
            (electionResults) => {
                const { tallyFractions } = electionResults.votes
                const color = colorBlender(tallyFractions, colorSet)
                return color
            },
        ),
    )
    return colorByTract
}

function colorDistrictWins(resultsByDistrict, canList, electionOptions) {
    // calculate color for win map
    let colorOfWinsByDistrict
    if (electionOptions.electionType === 'singleWinner') {
        colorOfWinsByDistrict = resultsByDistrict.map(
            (electionResults) => electionResults.winner.color,
        )
    } else {
        const colorSet = canList.map((can) => can.colorRGBA)
        colorOfWinsByDistrict = resultsByDistrict.map(
            (electionResults) => {
                const { allocation } = electionResults
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
 * @param {Object[]} resultsByDistrict - An array of electionResults, indexed by district.
 * @param {Candidate[]} canList - An array of Candidate objects.
 * @returns {String[]} - List of color strings indexed by district.
 */
function colorDistrictVote(resultsByDistrict, canList) {
    const colorOfVoteByDistrict = resultsByDistrict.map((electionResults) => {
        const { tallyFractions } = electionResults.votes
        const colorSet = canList.map((can) => can.colorRGBA)
        const color = rgbToString(colorBlender(tallyFractions, colorSet))
        return color
    })
    return colorOfVoteByDistrict
}
