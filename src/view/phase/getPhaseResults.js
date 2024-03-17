export default function getPhaseResults(sequenceResults, optionsBag, simOptions) {
    const { sequenceName } = optionsBag.sequenceOptions
    const { resultsPhaseBySeq } = simOptions
    const resultsPhaseName = resultsPhaseBySeq[sequenceName]

    let phaseResults

    if (sequenceName === 'closedPrimary' && resultsPhaseName === 'closedPrimary') {
        const { resultsPartyBySeq } = simOptions
        const resultsParty = resultsPartyBySeq[resultsPhaseName]
        phaseResults = sequenceResults.phases[resultsPhaseName][resultsParty]
    } else {
        phaseResults = sequenceResults.phases[resultsPhaseName]
    }
    return phaseResults
}
