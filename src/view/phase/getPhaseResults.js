export default function getPhaseResults(sequenceResults, simOptions) {
    if (sequenceResults.error) return sequenceResults

    const { sequenceName } = sequenceResults.optionsBag.sequenceOptions
    const { resultsPhaseBySeq } = simOptions
    const resultsPhaseName = resultsPhaseBySeq[sequenceName]

    if (sequenceName === 'closedPrimary' && resultsPhaseName === 'closedPrimary') {
        const { resultsPartyBySeq } = simOptions
        const resultsParty = resultsPartyBySeq[resultsPhaseName]
        const phaseResults = sequenceResults.phases[resultsPhaseName][resultsParty]
        if (phaseResults === undefined) {
            return { error: true }
        }
        return phaseResults
    }
    // else
    const phaseResults = sequenceResults.phases[resultsPhaseName]
    return phaseResults
}
