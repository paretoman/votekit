export default function calculatePolling(electionResultsList) {
    const polling = {}

    if (electionResultsList.length === 0) return polling

    const lastElectionResults = electionResultsList[electionResultsList.length - 1]
    if (lastElectionResults.votes.candidateTallies === undefined) {
        return polling
    }
    const { scoreFractionAverageByCan } = lastElectionResults.votes.candidateTallies
    const { voteFractionsByCan } = lastElectionResults.votes.candidateTallies

    if (scoreFractionAverageByCan !== undefined) {
        const highestScore = Math.max(...scoreFractionAverageByCan)
        polling.highestScore = highestScore
    } else if (voteFractionsByCan !== undefined) {
        const highestScore = Math.max(...voteFractionsByCan)
        polling.highestScore = highestScore
    }

    return polling
}
