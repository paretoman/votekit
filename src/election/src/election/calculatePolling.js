export default function calculatePolling(electionResultsList) {
    if (electionResultsList.length === 0) {
        return {}
    }

    const lastElectionResults = electionResultsList[electionResultsList.length - 1]
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
