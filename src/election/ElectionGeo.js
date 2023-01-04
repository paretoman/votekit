/** @module */

import getGeoms from '../entities.js/getGeoms.js'
import jupyterUpdate from '../environments/jupyter.js'
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
export default function ElectionGeo(election, voterGeo) {
    const self = this

    self.runElectionSim = (geometry, electionOptions) => {
        const geoElectionResults = self.runElectionGeo(geometry, electionOptions)

        return geoElectionResults
    }

    self.runElectionGeo = (geometry, electionOptions) => {
        const {
            voterGeoms, canGeoms, parties, dimensions,
        } = geometry
        if (voterGeoms.length === 0) return { error: 'no voters' }
        if (canGeoms.length === 0) return { error: 'no candidates' }

        const { castOptions, socialChoiceOptions } = electionOptions

        const votesByTract = castVotesByTract(canGeoms, parties, dimensions, castOptions)

        const resultsStatewide = countStatewideElection(votesByTract, canGeoms, parties, socialChoiceOptions)

        const resultsByTract = countTractElections(votesByTract, canGeoms, parties, socialChoiceOptions)

        // eslint-disable-next-line max-len
        const resultsByDistrict = countDistrictElections(votesByTract, canGeoms, parties, socialChoiceOptions)
        const allocation = sumAllocations(resultsByDistrict, canGeoms, electionOptions)

        jupyterUpdate({ votesByTract })

        const geoElectionResults = {
            resultsStatewide,
            resultsByTract,
            resultsByDistrict,
            allocation,
        }
        return geoElectionResults
    }

    function castVotesByTract(canGeoms, parties, dimensions, castOptions) {
        const { voterGroupsByTract } = voterGeo

        const votesByTract = voterGroupsByTract.map(
            (row) => row.map(
                (voterGroups) => {
                    const voterGeoms = getGeoms(voterGroups, dimensions)
                    const tractGeometry = { voterGeoms, canGeoms, parties }
                    return election.castVotes.run(tractGeometry, castOptions)
                },
            ),
        )
        return votesByTract
    }

    /** Show tallies over all the districts
     * Find statewide support for candidates (parties).
     */
    function countStatewideElection(votesByTract, canGeoms, parties, socialChoiceOptions) {
        const numCans = canGeoms.length
        const allVotes = combineVotes(votesByTract, numCans)

        jupyterUpdate({ allVotes })

        const resultsStatewide = election.socialChoice.run(allVotes, parties, socialChoiceOptions)
        return resultsStatewide
    }

    function combineVotes(votesByTract, numCans) {
        const votes = {}

        if (votesByTract[0][0].tallyFractions !== undefined) {
            // tf - tally fractions
            const tf = statewideTallyFractions(votesByTract, numCans)
            votes.tallyFractions = tf
        }
        if (votesByTract[0][0].pairwiseTallyFractions !== undefined) {
            // pwtf - pairwise tally fractions
            const pwtf = statewidePairwiseTallyFractions(votesByTract, numCans)
            votes.pairwiseTallyFractions = pwtf
        }
        if (votesByTract[0][0].cansByRank !== undefined) {
            // vrtf - votes ranked tally fractions
            const vrtf = statewideRankingTallyFractions(votesByTract)
            votes.votePop = vrtf.votePop
            votes.cansByRank = vrtf.cansByRank
        }
        if (votesByTract[0][0].scoreVotes !== undefined) {
            // vstf - votes score tally fractions
            const vstf = statewideScoreTallyFractions(votesByTract)
            votes.votePop = vstf.votePop
            votes.scoreVotes = vstf.scoreVotes
        }
        return votes
    }

    function statewideTallyFractions(votesByTract, numCans) {
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
        return tallyFractions
    }

    function statewidePairwiseTallyFractions(votesByTract, numCans) {
        // sum pairwiseTallyFractions
        const pTotals = Array(numCans)
        for (let k = 0; k < numCans; k++) {
            pTotals[k] = Array(numCans).fill(0)
        }
        votesByTract.forEach(
            (row) => row.forEach(
                (votes) => {
                    const { pairwiseTallyFractions } = votes
                    for (let i = 0; i < numCans; i++) {
                        for (let k = 0; k < numCans; k++) {
                            pTotals[i][k] += pairwiseTallyFractions[i][k]
                        }
                    }
                },
            ),
        )
        const pNorm = 1 / (pTotals[0][1] + pTotals[1][0]) // sum wins and losses
        const pairwiseTallyFractions = pTotals.map((row) => row.map((t) => t * pNorm))
        return pairwiseTallyFractions
    }

    function statewideRankingTallyFractions(votesByTract) {
        // concatenate cansByRank
        let votePopAll = []
        let cansByRankAll = []
        votesByTract.forEach(
            (row) => row.forEach(
                (votes) => {
                    const { votePop, cansByRank } = votes
                    votePopAll = votePopAll
                        .concat(votePop)
                    cansByRankAll = cansByRankAll.concat(cansByRank)
                },
            ),
        )
        const numRows = votesByTract.length
        const numCols = votesByTract[0].length
        const rNorm = 1 / (numRows * numCols)
        votePopAll = votePopAll.map((t) => t * rNorm)
        return {
            votePop: votePopAll,
            cansByRank: cansByRankAll,
        }
    }

    function statewideScoreTallyFractions(votesByTract) {
        // concatenate cansByRank
        let votePopAll = []
        let scoreVoteAll = []
        votesByTract.forEach(
            (row) => row.forEach(
                (votes) => {
                    const { votePop, scoreVotes } = votes
                    votePopAll = votePopAll
                        .concat(votePop)
                    scoreVoteAll = scoreVoteAll.concat(scoreVotes)
                },
            ),
        )
        const numRows = votesByTract.length
        const numCols = votesByTract[0].length
        const rNorm = 1 / (numRows * numCols)
        votePopAll = votePopAll.map((t) => t * rNorm)
        return {
            votePop: votePopAll,
            scoreVotes: scoreVoteAll,
        }
    }

    /** Visualize voter demographics according to votes for candidates within a tract.
     * Hold mini-elections within a tract.
     */
    function countTractElections(votesByTract, canGeoms, parties, socialChoiceOptions) {
        const resultsByTract = votesByTract.map(
            (row) => row.map(
                (votes) => election.socialChoice.run(votes, parties, socialChoiceOptions),
            ),
        )
        return resultsByTract
    }

    /** Run separate elections in each district. */
    function countDistrictElections(votesByTract, canGeoms, parties, socialChoiceOptions) {
        // Loop through districts.
        // Find who won.

        const votesByDistrict = combineVotesByDistrict(votesByTract, canGeoms)

        jupyterUpdate({ votesByDistrict })

        const resultsByDistrict = votesByDistrict.map(
            (votes) => election.socialChoice.run(votes, parties, socialChoiceOptions),
        )
        return resultsByDistrict
    }

    function combineVotesByDistrict(votesByTract, canGeoms) {
        const { census } = voterGeo.districtMaker
        const { nd } = voterGeo
        const numCans = canGeoms.length

        // loop through districts
        // each district has a census with a list of tracts with weights
        // tracts are listed by index
        // This is the same index as the votes list uses.
        const votesByDistrict = range(nd).map((iDistrict) => {
            const cen = census[iDistrict]

            const votes = {}

            if (votesByTract[0][0].tallyFractions !== undefined) {
                // tf - tally fractions
                const tf = districtTallyFractions(votesByTract, cen, numCans)
                votes.tallyFractions = tf
            }

            if (votesByTract[0][0].pairwiseTallyFractions !== undefined) {
                // pwtf - pairwise tally fractions
                const pwtf = districtPairwiseTallyFractions(votesByTract, cen, numCans)
                votes.pairwiseTallyFractions = pwtf
            }
            if (votesByTract[0][0].cansByRank !== undefined) {
                // vrtf - votes ranked tally fractions
                const vrtf = districtRankingTallyFractions(votesByTract, cen)
                votes.votePop = vrtf.votePop
                votes.cansByRank = vrtf.cansByRank
            }
            if (votesByTract[0][0].scoreVotes !== undefined) {
                // vstf - votes score tally fractions
                const vstf = districtScoreTallyFractions(votesByTract, cen)
                votes.votePop = vstf.votePop
                votes.scoreVotes = vstf.scoreVotes
            }
            return votes
        })
        return votesByDistrict
    }

    function districtTallyFractions(votesByTract, cen, numCans) {
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
        return tallyFractions
    }

    function districtPairwiseTallyFractions(votesByTract, cen, numCans) {
        // sum pairwiseTallyFractions
        const pTotals = Array(numCans)
        for (let k = 0; k < numCans; k++) {
            pTotals[k] = Array(numCans).fill(0)
        }
        for (let j = 0; j < cen.length; j++) {
            const [gx, gy, gf] = cen[j]
            const { pairwiseTallyFractions } = votesByTract[gx][gy]
            for (let i = 0; i < numCans; i++) {
                for (let k = 0; k < numCans; k++) {
                    pTotals[i][k] += pairwiseTallyFractions[i][k] * gf
                }
            }
        }
        const pNorm = 1 / (pTotals[0][1] + pTotals[1][0]) // sum wins and losses
        const pairwiseTallyFractions = pTotals.map((row) => row.map((t) => t * pNorm))
        return pairwiseTallyFractions
    }

    function districtRankingTallyFractions(votesByTract, cen) {
        // concatenate cansByRank
        let votePopAll = []
        let cansByRankAll = []

        let gfSum = 0
        for (let j = 0; j < cen.length; j++) {
            const [, , gf] = cen[j]
            gfSum += gf
        }
        const gfNorm = 1 / gfSum

        for (let j = 0; j < cen.length; j++) {
            const [gx, gy, gf] = cen[j]
            gfSum += gf
            const { votePop, cansByRank } = votesByTract[gx][gy]
            const votePopNorm = votePop
                .map((x) => x * gf * gfNorm)
            votePopAll = votePopAll
                .concat(votePopNorm)
            cansByRankAll = cansByRankAll.concat(cansByRank)
        }
        return {
            votePop: votePopAll,
            cansByRank: cansByRankAll,
        }
    }

    function districtScoreTallyFractions(votesByTract, cen) {
        // concatenate scoreVotes
        let votePopAll = []
        let scoreVotesAll = []

        let gfSum = 0
        for (let j = 0; j < cen.length; j++) {
            const [, , gf] = cen[j]
            gfSum += gf
        }
        const gfNorm = 1 / gfSum

        for (let j = 0; j < cen.length; j++) {
            const [gx, gy, gf] = cen[j]
            gfSum += gf
            const { votePop, scoreVotes } = votesByTract[gx][gy]
            const votePopNorm = votePop
                .map((x) => x * gf * gfNorm)
            votePopAll = votePopAll
                .concat(votePopNorm)
            scoreVotesAll = scoreVotesAll.concat(scoreVotes)
        }
        return {
            votePop: votePopAll,
            scoreVotes: scoreVotesAll,
        }
    }

    // Show wins across all districts for each candidate
    function sumAllocations(resultsByDistrict, canGeoms, electionOptions) {
        // make a histogram of allocation
        const numCandidates = canGeoms.length
        const allocation = Array(numCandidates).fill(0)
        if (electionOptions.electionType === 'singleWinner') {
            const iWinners = resultsByDistrict.map((electionResults) => electionResults.iWinner)
            iWinners.forEach((iWinner) => {
                allocation[iWinner] += 1
            })
        } else {
            resultsByDistrict.forEach(
                (electionResults) => {
                    for (let i = 0; i < numCandidates; i++) {
                        allocation[i] += electionResults.allocation[i]
                    }
                },
            )
        }
        return allocation
    }
}
