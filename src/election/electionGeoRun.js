/** @module */

import voteCasters from '../castVotes/voteCasters.js'
import getGeoms from '../entities.js/getGeoms.js'
import { range } from '../utilities/jsHelpers.js'
import socialChoiceRun from './socialChoiceRun.js'

/**
 * An election with many districts.
 * Voters are from many groups.
 * Voter groups are centered around a point.
 * The point is moved by simplex noise to create distinct districts.
 * All the voter groups share the same voter basis.
 */
export default function electionGeoRun(geometry, electionOptions) {
    const { voterGeoms, canGeoms, voterGeo } = geometry
    if (voterGeoms.length === 0) return { error: 'no voters' }
    if (canGeoms.length === 0) return { error: 'no candidates' }

    const votesByTract = castVotesByTract(geometry, electionOptions)
    const allVotes = combineVotes(votesByTract, canGeoms)
    const votesByDistrict = combineVotesByDistrict(votesByTract, canGeoms, voterGeo)

    // const resultsStatewide = countStatewideElection(allVotes, electionOptions)
    // const resultsByTract = countTractElections(votesByTract, electionOptions)

    const scResultsByDistrict = countDistrictElections(votesByDistrict, electionOptions)
    const allocation = sumAllocations(scResultsByDistrict, canGeoms, electionOptions)
    const socialChoiceResults = { allocation }

    const electionResults = {
        electionOptions, geometry, votes: allVotes, votesByTract, votesByDistrict, scResultsByDistrict, socialChoiceResults,
    }
    return electionResults
}

function castVotesByTract(geometry, electionOptions) {
    const { castOptions } = electionOptions
    const {
        canGeoms, parties, dimensions, voterGeo,
    } = geometry
    const { voterGroupsByTract } = voterGeo

    const votesByTract = voterGroupsByTract.map(
        (row) => row.map(
            (voterGroups) => {
                const voterGeoms = getGeoms(voterGroups, dimensions)
                const tractGeometry = {
                    voterGeoms, canGeoms, parties, dimensions, voterGeo,
                }
                return voteCasters[electionOptions.voteCasterName].cast(tractGeometry, castOptions)
            },
        ),
    )
    return votesByTract
}

/** Show tallies over all the districts
     * Find statewide support for candidates (parties).
     */
function countStatewideElection(allVotes, electionOptions) {
    const resultsStatewide = socialChoiceRun(allVotes, electionOptions)
    return resultsStatewide
}

function combineVotes(votesByTract, canGeoms) {
    const numCans = canGeoms.length

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
    votes.parties = votesByTract[0][0].parties
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
function countTractElections(votesByTract, electionOptions) {
    const resultsByTract = votesByTract.map(
        (row) => row.map(
            (votes) => socialChoiceRun(votes, electionOptions),
        ),
    )
    return resultsByTract
}

/** Run separate elections in each district. */
function countDistrictElections(votesByDistrict, electionOptions) {
    // Loop through districts.
    // Find who won.

    const scResultsByDistrict = votesByDistrict.map(
        (votes) => socialChoiceRun(votes, electionOptions),
    )
    return scResultsByDistrict
}

function combineVotesByDistrict(votesByTract, canGeoms, voterGeo) {
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
        votes.parties = votesByTract[0][0].parties
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
function sumAllocations(scResultsByDistrict, canGeoms, electionOptions) {
    // make a histogram of allocation
    const numCandidates = canGeoms.length
    const allocationsSum = Array(numCandidates).fill(0)
    if (electionOptions.electionType === 'singleWinner') {
        const iWinners = scResultsByDistrict.map((socialChoiceResults) => socialChoiceResults.iWinner)
        iWinners.forEach((iWinner) => {
            allocationsSum[iWinner] += 1
        })
    } else {
        scResultsByDistrict.forEach(
            (socialChoiceResults) => {
                const { allocation } = socialChoiceResults
                for (let i = 0; i < numCandidates; i++) {
                    allocationsSum[i] += allocation[i]
                }
            },
        )
    }
    return allocationsSum
}
