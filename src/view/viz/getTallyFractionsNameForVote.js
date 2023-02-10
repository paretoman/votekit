/** get a fractional candidate tally from a grid vote */
export default function getTallyFractionsNameForVote(vote) {
    if (vote.scoreVote) {
        return 'scoreVote'
    }

    if (vote.bordaFractions) {
        return 'bordaFractions'
    }

    if (vote.pluralityAllocation) {
        return 'pluralityAllocation'
    }

    return null
}
