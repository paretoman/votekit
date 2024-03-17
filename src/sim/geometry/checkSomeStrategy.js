import checkSomeStrategyForPhase from './checkSomeStrategyForPhase.js'

export default function checkSomeStrategy(optionsBag, voterShapeList, simOptions) {
    const { sequenceOptions } = optionsBag

    const { sequenceName } = optionsBag.sequenceOptions
    const { resultsPhaseBySeq } = simOptions
    const resultsPhaseName = resultsPhaseBySeq[sequenceName]

    const voterStrategyListByPhase = voterShapeList.getVoterStrategyListByPhase(sequenceOptions)
    const voterStrategyList = voterStrategyListByPhase[resultsPhaseName]

    let someStrategy
    if (sequenceName === 'closedPrimary') {
        const { resultsPartyBySeq } = simOptions
        const resultsParty = resultsPartyBySeq[resultsPhaseName]

        const voterStrategyListForParty = voterStrategyList.filter((v) => v.party === resultsParty) // not right. need to use party index.
        // todo: consider party. Maybe one primary has no strategic votes and another has some
        someStrategy = checkSomeStrategyForPhase(voterStrategyListForParty)
    } else {
        someStrategy = checkSomeStrategyForPhase(voterStrategyList)
    }
    return someStrategy
}
