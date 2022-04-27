/** @module */

import colorBlend, { toRGBA } from './colorBlend.js'

/**
 * An election with many districts.
 * Voters are from many groups.
 * Voter groups are centered around a point.
 * The point is moved by simplex noise to create distinct districts.
 * All the voter groups share the same voter basis.
 * @param {Menu} menu
 * @param {Election} election
 * @constructor
 */
export default function ElectionGeo(election) {
    const self = this

    const optionCast = { usr: 32 }

    self.runElectionAndUpdateTallies = (voterGeoList, candidateSimList) => {
        const canList = candidateSimList.getCandidates()

        if (voterGeoList.getVoterSims().length === 0) return { error: 'no voters' }
        if (canList.length === 0) return { error: 'no candidates' }

        const resultsStatewide = runStatewideElection(voterGeoList, canList)

        const resultsByTract = runTractElections(voterGeoList, canList)
        const colorByTract = colorTracts(resultsByTract, canList)

        const resultsByDistrict = runDistrictElections(voterGeoList, canList)
        const colorOfWinsByDistrict = colorDistrictWins(resultsByDistrict, canList)
        const colorOfVoteByDistrict = colorDistrictVote(resultsByDistrict, canList)
        const winsByDistrict = updateWins(resultsByDistrict, canList)

        candidateSimList.setCandidateWins(winsByDistrict)
        candidateSimList.setCandidateFractions(resultsStatewide.votes.tallyFractions)

        const geoElectionResults = {
            resultsStatewide,
            resultsByTract,
            colorByTract,
            resultsByDistrict,
            colorOfVoteByDistrict,
            winsByDistrict,
            colorOfWinsByDistrict,
        }
        return geoElectionResults
    }

    /** Show tallies over all the districts
     * Find statewide support for candidates (parties).
     */
    function runStatewideElection(voterGeoList, canList) {
        const { allVoterGroups } = voterGeoList
        const resultsStatewide = election.runElection(allVoterGroups, canList, optionCast)
        return resultsStatewide
    }

    /** Visualize voter demographics according to votes for candidates within a tract.
     * Hold mini-elections within a tract.
     */
    function runTractElections(voterGeoList, canList) {
        const { voterGroupsByTract } = voterGeoList

        const resultsByTract = voterGroupsByTract.map(
            (row) => row.map(
                (voterGroups) => election.runElection(voterGroups, canList, optionCast),
            ),
        )
        return resultsByTract
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

    /** Run separate elections in each district. */
    function runDistrictElections(voterGeoList, canList) {
        // Loop through districts.
        // Find who won.

        const { voterGroupsByDistrict } = voterGeoList

        const resultsByDistrict = voterGroupsByDistrict.map(
            (voterGroups) => election.runElection(voterGroups, canList, optionCast),
        )
        return resultsByDistrict
    }
    function colorDistrictWins(resultsByDistrict, canList) {
        // calculate color for win map
        let colorOfWinsByDistrict
        if (election.countVotes.checkElectionType() === 'singleWinner') {
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

    // Show wins across all districts for each candidate
    function updateWins(resultsByDistrict, canList) {
        // make a histogram of winsByDistrict
        const numCandidates = canList.length
        const winsByDistrict = Array(numCandidates).fill(0)
        if (election.countVotes.checkElectionType() === 'singleWinner') {
            const iWinners = resultsByDistrict.map((electionResults) => electionResults.iWinner)
            iWinners.forEach((iWinner) => {
                winsByDistrict[iWinner] += 1
            })
        } else {
            resultsByDistrict.forEach(
                (electionResults) => {
                    const { allocation } = electionResults
                    for (let i = 0; i < numCandidates; i++) {
                        winsByDistrict[i] += allocation[i]
                    }
                },
            )
        }
        return winsByDistrict
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

    self.testVote = (voterTest, candidateSimList) => {
        const vote = election.testVote(voterTest, candidateSimList)
        const i = vote.tallyFractions.indexOf(1)
        const canList = candidateSimList.getCandidates()
        vote.color = canList[i].color
        return vote
    }
}
