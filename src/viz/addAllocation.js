export default function addAllocation(electionResults) {
    const { allocation } = electionResults
    const { votes } = electionResults
    const { tallyFractions } = votes
    if (allocation === undefined) {
        const nk = votes.tallyFractions.length
        const wins = Array(nk).fill(0)
        wins[electionResults.iWinner] = 1

        return { tallyFractions, allocation: wins }
    }
    return { tallyFractions, allocation }
}
