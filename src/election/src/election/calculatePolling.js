export default function calculatePolling(lastElectionResults) {
    if (lastElectionResults === null) {
        return {}
    }

    if (lastElectionResults.votes.candidateTallies === undefined) {
        return {}
    }

    const { scoreFractionAverageByCan } = lastElectionResults.votes.candidateTallies
    const { voteFractionsByCan } = lastElectionResults.votes.candidateTallies

    if (scoreFractionAverageByCan !== undefined) {
        const highestScore = Math.max(...scoreFractionAverageByCan)
        const polling = { highestScore, scoreFractionAverageByCan }
        return polling
    }
    if (voteFractionsByCan !== undefined) {
        const highestScore = Math.max(...voteFractionsByCan)
        const polling = { highestScore, voteFractionsByCan }
        return polling
    }

    return {}
}
