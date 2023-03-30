export default function checkSomeStrategy(voterStrategyListByPhase) {
    let someStrategy = false

    Object.keys(voterStrategyListByPhase).forEach((phaseName) => {
        const voterStrategyList = voterStrategyListByPhase[phaseName]
        const someStrategyForPhase = checkSomeStrategyForPhase(voterStrategyList)

        someStrategy = someStrategy || someStrategyForPhase
    })
    return someStrategy
}

export function checkSomeStrategyForPhase(voterStrategyList) {
    return voterStrategyList.some(
        (v) => v.strategy.some(
            (a) => (a.actionName !== 'closest' && a.actionWeight !== 0),
        ),
    )
}
