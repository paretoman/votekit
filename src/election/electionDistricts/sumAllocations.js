// Show wins across all districts for each candidate
export default function sumAllocations(scResultsByDistrict, canGeoms, electionOptions) {
    // make a histogram of allocation
    const numCandidates = canGeoms.length
    const allocationsSum = Array(numCandidates).fill(0)
    if (electionOptions.socialChoiceType === 'singleWinner') {
        const iWinners = scResultsByDistrict.map((socialChoiceResults) => socialChoiceResults.iWinner)
        iWinners.forEach((iWinner) => {
            allocationsSum[iWinner] += 1
        })
    } else {
        scResultsByDistrict.forEach(
            (socialChoiceResults) => {
                const { allocation } = socialChoiceResults
                for (let i = 0; i < numCandidates; i++) {
                    allocationsSum[i] += allocation[i]
                }
            },
        )
    }
    return allocationsSum
}
