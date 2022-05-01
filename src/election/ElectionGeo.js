/** @module */

import { range } from '../utilities/jsHelpers.js'

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

    self.runElectionSim = (voterGeoList, candidateSimList, changes) => {
        if (changes.checkNone()) return { error: 'No Changes' }

        const canList = candidateSimList.getCandidates()

        const geoElectionResults = self.runElection2(voterGeoList, canList)

        return geoElectionResults
    }

    self.runElection2 = (voterGeoList, canList) => {
        if (voterGeoList.getVoterSims().length === 0) return { error: 'no voters' }
        if (canList.length === 0) return { error: 'no candidates' }

        const votesByTract = castVotesByTract(voterGeoList, canList)

        const resultsStatewide = countStatewideElection(votesByTract, canList)

        const resultsByTract = countTractElections(votesByTract, canList)

        const resultsByDistrict = countDistrictElections(votesByTract, canList, voterGeoList)
        const winsByDistrict = updateWins(resultsByDistrict, canList)

        const geoElectionResults = {
            resultsStatewide,
            resultsByTract,
            resultsByDistrict,
            winsByDistrict,
        }
        return geoElectionResults
    }

    function castVotesByTract(voterGeoList, canList) {
        const { voterGroupsByTract } = voterGeoList

        const votesByTract = voterGroupsByTract.map(
            (row) => row.map(
                (voterGroups) => election.castVotes(voterGroups, canList, optionCast),
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

    self.testVoteES = (voterTest, candidateSimList) => {
        const vote = election.testVoteE(voterTest, candidateSimList)
        return vote
    }
}
