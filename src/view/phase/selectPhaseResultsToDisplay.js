export default function selectPhaseResultsToDisplay(sequenceResults, simOptions) {
    const { sequenceName } = sequenceResults.optionsBag.sequenceOptions
    const { resultsPhaseBySeq, resultsPartyBySeq } = simOptions
    const resultsPhaseName = resultsPhaseBySeq[sequenceName]
    const resultsParty = resultsPartyBySeq[resultsPhaseName]

    const phaseResults0 = sequenceResults.phases[resultsPhaseName]
    const phaseResults = (resultsParty !== undefined) ? phaseResults0[resultsParty] : phaseResults0
    return phaseResults
}
