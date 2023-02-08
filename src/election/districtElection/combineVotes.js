import statewidePairwiseTallyFractions from './statewidePairwiseTallyFractions.js'
import statewideRankingTallyFractions from './statewideRankingTallyFractions.js'
import statewideScoreTallyFractions from './statewideScoreTallyFractions.js'
import statewideTallyFractions from './statewideTallyFractions.js'

export default function combineVotes(votesByTract, canGeoms) {
    const numCans = canGeoms.length

    const votes = {}

    if (votesByTract[0][0].candidateTallies !== undefined) {
        votes.candidateTallies = statewideTallyFractions(votesByTract, numCans)
    }
    if (votesByTract[0][0].pairwiseTallies !== undefined) {
        votes.pairwiseTallies = statewidePairwiseTallyFractions(votesByTract, numCans)
    }
    if (votesByTract[0][0].preferenceTallies !== undefined
        && votesByTract[0][0].preferenceTallies.cansByRankList !== undefined) {
        votes.preferenceTallies = statewideRankingTallyFractions(votesByTract)
    }
    if (votesByTract[0][0].preferenceTallies !== undefined
        && votesByTract[0][0].preferenceTallies.scoreVotes !== undefined) {
        votes.preferenceTallies = statewideScoreTallyFractions(votesByTract)
    }
    votes.parties = votesByTract[0][0].parties
    return votes
}
