import statewidePairwiseTallyFractions from './statewidePairwiseTallyFractions.js'
import statewidePreferenceLists from './statewidePreferenceLists.js'
import statewidePreferenceTallies from './statewidePreferenceTallies.js'
import statewideTallyFractions from './statewideTallyFractions.js'

export default function combineVotesStatewide(votesByTract, canGeoms) {
    const numCans = canGeoms.length

    const votes = {}

    if (votesByTract[0][0].candidateTallies !== undefined) {
        votes.candidateTallies = statewideTallyFractions(votesByTract, numCans)
    }
    if (votesByTract[0][0].pairwiseTallies !== undefined) {
        votes.pairwiseTallies = statewidePairwiseTallyFractions(votesByTract, numCans)
    }
    if (votesByTract[0][0].preferenceLists !== undefined) {
        votes.preferenceLists = statewidePreferenceLists(votesByTract)
        votes.preferenceTallies = statewidePreferenceTallies(votesByTract)
    }
    votes.parties = votesByTract[0][0].parties
    return votes
}
