import colorBlend, { toRGBA } from './colorBlend.js'

export default function geoColors(geoElectionResults, candidateSimList, sim) {
    const {
        resultsByTract,
        resultsByDistrict,
    } = geoElectionResults

    const canList = candidateSimList.getCandidates()

    const colorByTract = colorTracts(resultsByTract, canList)
    const colorOfWinsByDistrict = colorDistrictWins(resultsByDistrict, canList, sim)
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
    const colorSet = canList.map((can) => can.color)
    const colorByTract = resultsByTract.map(
        (row) => row.map(
            (electionResults) => {
                const { tallyFractions } = electionResults.votes
                const color = toRGBA(colorBlend(tallyFractions, colorSet))
                return color
            },
        ),
    )
    return colorByTract
}

function colorDistrictWins(resultsByDistrict, canList, sim) {
    // calculate color for win map
    let colorOfWinsByDistrict
    if (sim.election.countVotes.checkElectionType() === 'singleWinner') {
        colorOfWinsByDistrict = resultsByDistrict.map(
            (electionResults) => electionResults.winner.color,
        )
    } else {
        const colorSet = canList.map((can) => can.color)
        colorOfWinsByDistrict = resultsByDistrict.map(
            (electionResults) => {
                const { allocation } = electionResults
                const sum = allocation.reduce((p, c) => p + c)
                const fractions = allocation.map((x) => x / sum)
                const color = colorBlend(fractions, colorSet)
                return color
            },
        )
    }
    return colorOfWinsByDistrict
}

/** Update color for each district, based on votes for each candidate.
     * Blend candidate colors in proportion to their votes.
     */
function colorDistrictVote(resultsByDistrict, canList) {
    const colorOfVoteByDistrict = resultsByDistrict.map((electionResults) => {
        const { tallyFractions } = electionResults.votes
        const colorSet = canList.map((can) => can.color)
        const color = colorBlend(tallyFractions, colorSet)
        return color
    })
    return colorOfVoteByDistrict
}
