export default function getResultsPhaseOptions(optionsBag, simOptions) {
    const { sequenceName, sequences } = optionsBag.sequenceOptions
    const { resultsPhaseBySeq } = simOptions
    const resultsPhaseName = resultsPhaseBySeq[sequenceName]
    const resultsPhaseOptions = sequences[sequenceName].phases[resultsPhaseName]
    return resultsPhaseOptions
}
