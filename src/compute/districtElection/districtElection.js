/** @module */

import socialChoiceRun from '@paretoman/votekit-election'
import combineVotesStatewide from './combineVotesStatewide.js'
import combineVotesByDistrict from './combineVotesByDistrict.js'
import castVotesByTract from './castVotesByTract.js'
import sumAllocationsStatewide from './combineAllocationsStatewide.js'

/**
 * An election with many districts.
 * Voters are from many groups.
 * Voter groups are centered around a point.
 * The point is moved by simplex noise to create distinct districts.
 * All the voter groups share the same voter basis.
 */
export default function districtElection(geometry, electionOptions, castOptions) {
    const { canPoints, geography } = geometry

    const votesByTract = castVotesByTract(geometry, electionOptions, castOptions)
    const allVotes = combineVotesStatewide(votesByTract, canPoints)
    const votesByDistrict = combineVotesByDistrict(votesByTract, canPoints, geography)

    const scResultsByDistrict = countDistrictElections(votesByDistrict, electionOptions)
    const allocation = sumAllocationsStatewide(scResultsByDistrict, canPoints, electionOptions)
    const socialChoiceResults = { allocation }

    const electionResults = {
        electionOptions, geometry, votes: allVotes, votesByTract, votesByDistrict, scResultsByDistrict, socialChoiceResults,
    }
    return electionResults
}

/** Run separate elections in each district. */
function countDistrictElections(votesByDistrict, electionOptions) {
    const scResultsByDistrict = votesByDistrict.map(
        (votes) => socialChoiceRun(votes, electionOptions),
    )
    return scResultsByDistrict
}
