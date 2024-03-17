import checkSomeStrategyForPhase from './checkSomeStrategyForPhase.js'

export default function oldCheckSomeStrategy(voterStrategyListByPhase) {
    let someStrategy = false

    Object.keys(voterStrategyListByPhase).forEach((phaseName) => {
        const voterStrategyList = voterStrategyListByPhase[phaseName]
        const someStrategyForPhase = checkSomeStrategyForPhase(voterStrategyList)

        someStrategy = someStrategy || someStrategyForPhase
    })
    return someStrategy
}
