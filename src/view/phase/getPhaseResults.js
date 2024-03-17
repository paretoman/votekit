export default function getPhaseResults(sequenceResults, simOptions) {
    const { sequenceName } = sequenceResults.optionsBag.sequenceOptions
    const { resultsPhaseBySeq } = simOptions
    const resultsPhaseName = resultsPhaseBySeq[sequenceName]

    if (sequenceName === 'closedPrimary' && resultsPhaseName === 'closedPrimary') {
        const { resultsPartyBySeq } = simOptions
        const resultsParty = resultsPartyBySeq[resultsPhaseName]
        const phaseResults = sequenceResults.phases[resultsPhaseName][resultsParty]
        return phaseResults
    }
    // else
    const phaseResults = sequenceResults.phases[resultsPhaseName]
    return phaseResults
}
