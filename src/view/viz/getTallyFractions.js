/** Look for candidateTallies with fractions and pick one. Right now, this is easy. */
export default function getTallyFractions(votes) {
    const { candidateTallies } = votes

    if (candidateTallies.bordaFractionAverageByCan) {
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
