import statewidePairwiseTallyFractions from './statewidePairwiseTallyFractions.js'
import statewideRankingTallyFractions from './statewideRankingTallyFractions.js'
import statewideScoreTallyFractions from './statewideScoreTallyFractions.js'
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
    if (votesByTract[0][0].preferenceLists !== undefined
        && votesByTract[0][0].preferenceLists.cansByRankList !== undefined) {
        const prefs = statewideRankingTallyFractions(votesByTract)
        votes.preferenceTallies = prefs.preferenceTallies
        votes.preferenceLists = prefs.preferenceLists
    }
    if (votesByTract[0][0].preferenceTallies !== undefined
        && votesByTract[0][0].preferenceTallies.scoreVotes !== undefined) {
        const prefs = statewideScoreTallyFractions(votesByTract)
        votes.preferenceTallies = prefs.preferenceTallies
        votes.preferenceLists = prefs.preferenceLists
    }
    votes.parties = votesByTract[0][0].parties
    return votes
}
