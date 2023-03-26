export default function getUsePollsByPhase(voterStrategyListByPhase) {
    const usePollsByPhase = {}

    Object.keys(voterStrategyListByPhase).forEach((phaseName) => {
        const voterStrategyList = voterStrategyListByPhase[phaseName]
        const usePolls = getUsePolls(voterStrategyList)

        usePollsByPhase[phaseName] = usePolls
    })
    return usePollsByPhase
}

function getUsePolls(voterStrategyList) {
    return voterStrategyList.some(
        (v) => v.strategy.some(
            (a) => (a.actionName !== 'closest' && a.actionWeight !== 0),
        ),
    )
}
