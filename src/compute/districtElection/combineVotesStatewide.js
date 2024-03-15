import statewidePairwiseTallies from './statewidePairwiseTallies.js'
import statewidePreferenceLists from './statewidePreferenceLists.js'
import statewidePreferenceTallies from './statewidePreferenceTallies.js'
import statewideCandidateTallies from './statewideCandidateTallies.js'

export default function combineVotesStatewide(votesByTract, canPoints) {
    const numCans = canPoints.length

    const votes = {}

    if (votesByTract[0][0].candidateTallies !== undefined) {
        votes.candidateTallies = statewideCandidateTallies(votesByTract, numCans)
    }
    if (votesByTract[0][0].pairwiseTallies !== undefined) {
        votes.pairwiseTallies = statewidePairwiseTallies(votesByTract, numCans)
    }
    if (votesByTract[0][0].preferenceLists !== undefined) {
        votes.preferenceLists = statewidePreferenceLists(votesByTract)
        votes.preferenceTallies = statewidePreferenceTallies(votesByTract)
    }
    votes.parties = votesByTract[0][0].parties
    return votes
}
