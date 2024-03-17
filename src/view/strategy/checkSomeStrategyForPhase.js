export default function checkSomeStrategyForPhase(voterStrategyList) {
    return voterStrategyList.some(
        (v) => v.strategy.some(
            (a) => (a.actionName !== 'closest' && a.actionWeight !== 0),
        ),
    )
}
