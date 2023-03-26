export default function getGeometryForPhase(phaseName, geometry) {
    const phaseGeometry = { ...geometry }

    phaseGeometry.voterStrategyList = geometry.voterStrategyListByPhase[phaseName]
    phaseGeometry.usePolls = geometry.usePollsByPhase[phaseName]

    delete phaseGeometry.voterStrategyListByPhase
    delete phaseGeometry.usePollsByPhase

    return phaseGeometry
}
