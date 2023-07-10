/** @module */

import combineVotesStatewide from './combineVotesStatewide.js'
import combineVotesByDistrict from './combineVotesByDistrict.js'
import socialChoiceRun from '../election/socialChoiceRun.js'
import castVotesByTract from './castVotesByTract.js'
import sumAllocationsStatewide from './combineAllocationsStatewide.js'

/**
 * An election with many districts.
 * Voters are from many groups.
 * Voter groups are centered around a point.
 * The point is moved by simplex noise to create distinct districts.
 * All the voter groups share the same voter basis.
 */
export default function districtElection(geometry, electionPhaseOptions) {
    const { canPoints, geography } = geometry

    const votesByTract = castVotesByTract(geometry, electionPhaseOptions)
    const allVotes = combineVotesStatewide(votesByTract, canPoints)
    const votesByDistrict = combineVotesByDistrict(votesByTract, canPoints, geography)

    const scResultsByDistrict = countDistrictElections(votesByDistrict, electionPhaseOptions)
    const allocation = sumAllocationsStatewide(scResultsByDistrict, canPoints, electionPhaseOptions)
    const socialChoiceResults = { allocation }

    const sequenceResults = {
        electionPhaseOptions, geometry, votes: allVotes, votesByTract, votesByDistrict, scResultsByDistrict, socialChoiceResults,
    }
    return sequenceResults
}

/** Run separate elections in each district. */
function countDistrictElections(votesByDistrict, electionPhaseOptions) {
    const scResultsByDistrict = votesByDistrict.map(
        (votes) => socialChoiceRun(votes, electionPhaseOptions),
    )
    return scResultsByDistrict
}
