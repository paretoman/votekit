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

    self.updateVotes = (voterGeoList, candidateSimList) => {
        const cans = candidateSimList.getCandidates()

        if (voterGeoList.getVoterSims().length === 0) return { error: 'no voters' }
        if (cans.length === 0) return { error: 'no candidates' }

        const resultsStatewide = runStatewideElection(voterGeoList, cans)

        const resultsByTract = runTractElections(voterGeoList, cans)
        const colorByTract = colorTracts(resultsByTract, cans)

        const resultsByDistrict = runDistrictElections(voterGeoList, cans)
        const colorOfWinsByDistrict = colorDistrictWins(resultsByDistrict, cans)
        const colorOfVoteByDistrict = colorDistrictVote(resultsByDistrict, cans)
        const winsByDistrict = updateWins(resultsByDistrict, cans)

        candidateSimList.setCandidateWins(winsByDistrict)
        candidateSimList.setCandidateFractions(resultsStatewide.votes.tallyFractions)

        return {
            resultsStatewide,
            resultsByTract,
            colorByTract,
            resultsByDistrict,
            colorOfVoteByDistrict,
            winsByDistrict,
            colorOfWinsByDistrict,
        }
    }

    /** Show tallies over all the districts
     * Find statewide support for candidates (parties).
     */
    function runStatewideElection(voterGeoList, cans) {
        const { allVoterGroups } = voterGeoList
        const resultsStatewide = election.runElection(allVoterGroups, cans, optionCast)
        return resultsStatewide
    }

    /** Visualize voter demographics according to votes for candidates within a voterGroup.
     * Hold mini-elections within a voterGroup.
     */
    function runTractElections(voterGeoList, cans) {
        const { voterGroupsByTract } = voterGeoList

        const resultsByTract = voterGroupsByTract.map(
            (row) => row.map(
                (voterShapes) => election.runElection(voterShapes, cans, optionCast),
            ),
        )
        return resultsByTract
    }

    function colorTracts(resultsByTract, cans) {
        // get color
        const colorSet = cans.map((can) => can.color)
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
    function runDistrictElections(voterGeoList, cans) {
        // Loop through districts.
        // Find who won.

        const { voterGroupsByDistrict } = voterGeoList

        const resultsByDistrict = voterGroupsByDistrict.map(
            (voterShapes) => election.runElection(voterShapes, cans, optionCast),
        )
        return resultsByDistrict
    }
    function colorDistrictWins(resultsByDistrict, cans) {
        // calculate color for win map
        let colorOfWinsByDistrict
        if (election.countVotes.checkElectionType() === 'singleWinner') {
            colorOfWinsByDistrict = resultsByDistrict.map(
                (electionResults) => electionResults.winner.color,
            )
        } else {
            const colorSet = cans.map((can) => can.color)
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
    function updateWins(resultsByDistrict, cans) {
        // make a histogram of winsByDistrict
        const numCandidates = cans.length
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
    function colorDistrictVote(resultsByDistrict, cans) {
        const colorOfVoteByDistrict = resultsByDistrict.map((electionResults) => {
            const { tallyFractions } = electionResults.votes
            const colorSet = cans.map((can) => can.color)
            const color = colorBlend(tallyFractions, colorSet)
            return color
        })
        return colorOfVoteByDistrict
    }

    self.testVote = (voterTest, candidateSimList) => {
        const vote = election.testVote(voterTest, candidateSimList)
        const i = vote.tallyFractions.indexOf(1)
        const cans = candidateSimList.getCandidates()
        vote.color = cans[i].color
        return vote
    }
}
