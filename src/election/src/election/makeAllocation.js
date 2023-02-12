/**
 * When there is just one winner,
 * sometimes the allocation isn't included in the election results.
 * So we fill the gap, for now.
 */
export default function makeAllocation(votes, socialChoiceResults) {
    const { numCans } = votes
    const { iWinner } = socialChoiceResults

    const allocation = Array(numCans).fill(0)
    allocation[iWinner] = 1
    return allocation
}
