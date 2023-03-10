export default function calculatePolling(electionResultsList) {
    const polling = {}

    if (electionResultsList.length === 0) return polling

    const lastElectionResults = electionResultsList[electionResultsList.length - 1]
    const { scoreFractionAverageByCan } = lastElectionResults.votes.candidateTallies

    const highestScore = Math.max(...scoreFractionAverageByCan)
    polling.highestScore = highestScore

    return polling
}
