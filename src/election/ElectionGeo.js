/** @module */

import { range } from '../utilities/jsHelpers.js'
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

        const geoMethodResults = self.runElection(voterGeoList, canList)

        const {
            resultsStatewide,
            resultsByTract,
            resultsByDistrict,
            winsByDistrict,
            error,
        } = geoMethodResults

        if (error !== undefined) return { error }

        const colorByTract = colorTracts(resultsByTract, canList)
        const colorOfWinsByDistrict = colorDistrictWins(resultsByDistrict, canList)
        const colorOfVoteByDistrict = colorDistrictVote(resultsByDistrict, canList)

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

    self.runElection = (voterGeoList, canList) => {
        if (voterGeoList.getVoterSims().length === 0) return { error: 'no voters' }
        if (canList.length === 0) return { error: 'no candidates' }

        const votesByTract = castVotesByTract(voterGeoList, canList)

        const resultsStatewide = countStatewideElection(votesByTract, canList)

        const resultsByTract = countTractElections(votesByTract, canList)

        const resultsByDistrict = countDistrictElections(votesByTract, canList, voterGeoList)
        const winsByDistrict = updateWins(resultsByDistrict, canList)

        const geoMethodResults = {
            resultsStatewide,
            resultsByTract,
            resultsByDistrict,
            winsByDistrict,
        }
        return geoMethodResults
    }

    function castVotesByTract(voterGeoList, canList) {
        const { voterGroupsByTract } = voterGeoList

        const votesByTract = voterGroupsByTract.map(
            (row) => row.map(
                (voterGroups) => election.castVotes2(voterGroups, canList, optionCast),
            ),
        )
        return votesByTract
    }

    /** Show tallies over all the districts
     * Find statewide support for candidates (parties).
     */
    function countStatewideElection(votesByTract, canList) {
        const numCans = canList.length
        const allVotes = combineVotes(votesByTract, numCans)

        const resultsStatewide = election.countVotes.run(canList, allVotes)
        return resultsStatewide
    }

    function combineVotes(votesByTract, numCans) {
        // sum tallyFractions
        const totals = Array(numCans).fill(0)
        votesByTract.forEach(
            (row) => row.forEach(
                (votes) => {
                    const { tallyFractions } = votes
                    for (let k = 0; k < numCans; k++) {
                        totals[k] += tallyFractions[k]
                    }
                },
            ),
        )
        const norm = 1 / totals.reduce((p, c) => p + c)
        const tallyFractions = totals.map((t) => t * norm)
        return { tallyFractions }
    }

    /** Visualize voter demographics according to votes for candidates within a tract.
     * Hold mini-elections within a tract.
     */
    function countTractElections(votesByTract, canList) {
        const resultsByTract = votesByTract.map(
            (row) => row.map(
                (votes) => election.countVotes.run(canList, votes),
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
    function countDistrictElections(votesByTract, canList, voterGeoList) {
        // Loop through districts.
        // Find who won.

        const votesByDistrict = combineVotesByDistrict(votesByTract, canList, voterGeoList)

        const resultsByDistrict = votesByDistrict.map(
            (votes) => election.countVotes.run(canList, votes),
        )
        return resultsByDistrict
    }

    function combineVotesByDistrict(votesByTract, canList, voterGeoList) {
        const { census } = voterGeoList.districtMaker
        const { nd } = voterGeoList
        const numCans = canList.length

        // loop through districts
        // each district has a census with a list of tracts with weights
        // tracts are listed by index
        // This is the same index as the votes list uses.
        const votesByDistrict = range(nd).map((iDistrict) => {
            const cen = census[iDistrict]

            // sum tallyFractions
            const totals = Array(numCans).fill(0)
            for (let j = 0; j < cen.length; j++) {
                const [gx, gy, gf] = cen[j]
                const { tallyFractions } = votesByTract[gx][gy]
                for (let k = 0; k < numCans; k++) {
                    totals[k] += tallyFractions[k] * gf
                }
            }
            const norm = 1 / totals.reduce((p, c) => p + c)
            const tallyFractions = totals.map((t) => t * norm)
            return { tallyFractions }
        })
        return votesByDistrict
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
