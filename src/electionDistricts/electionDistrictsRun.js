/** @module */

import combineVotes from './combineVotes.js'
import combineVotesByDistrict from './combineVotesByDistrict.js'
import socialChoiceRun from '../election/socialChoiceRun.js'
import castVotesByTract from './castVotesByTract.js'
import sumAllocations from './sumAllocations.js'

/**
 * An election with many districts.
 * Voters are from many groups.
 * Voter groups are centered around a point.
 * The point is moved by simplex noise to create distinct districts.
 * All the voter groups share the same voter basis.
 */
export default function electionDistrictsRun(geometry, electionOptions) {
    const { voterGeoms, canGeoms, voterDistricts } = geometry
    if (voterGeoms.length === 0) return { error: 'no voters' }
    if (canGeoms.length === 0) return { error: 'no candidates' }

    const votesByTract = castVotesByTract(geometry, electionOptions)
    const allVotes = combineVotes(votesByTract, canGeoms)
    const votesByDistrict = combineVotesByDistrict(votesByTract, canGeoms, voterDistricts)

    const scResultsByDistrict = countDistrictElections(votesByDistrict, electionOptions)
    const allocation = sumAllocations(scResultsByDistrict, canGeoms, electionOptions)
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
