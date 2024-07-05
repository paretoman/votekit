import getMinimaxScore from "./getMinimaxScore.js"

/** Look for candidateTallies with fractions and pick one. Right now, this is easy. */
export default function getTallyFractions(votes, socialChoiceMethod) {
    const { candidateTallies } = votes

    if (candidateTallies.bordaFractionAverageByCan) {
        if (socialChoiceMethod === 'minimax') {
            const {winFractionPairwise} = votes.pairwiseTallies
            const minimaxScore = getMinimaxScore(winFractionPairwise)
            return minimaxScore
        }
        return candidateTallies.bordaFractionAverageByCan
    }

    if (candidateTallies.voteFractionsByCan) {
        return candidateTallies.voteFractionsByCan
    }

    if (candidateTallies.firstPreferenceFractions) {
        return candidateTallies.firstPreferenceFractions
    }

    if (candidateTallies.scoreFractionAverageByCan) {
        return candidateTallies.scoreFractionAverageByCan
    }

    return null
}
