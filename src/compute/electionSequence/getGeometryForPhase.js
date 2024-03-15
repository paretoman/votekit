/** @module */

/**
 * Use phase description to get geometry. Geometry can differ by phase.
 * e.g. voter strategy, use of polls
 * @param {*} phaseName
 * @param {*} geometry
 * @returns {*} geometry
 */
export default function getGeometryForPhase(phaseName, geometry) {
    const phaseGeometry = { ...geometry }

    phaseGeometry.voterStrategyList = geometry.voterStrategyListByPhase[phaseName]
    phaseGeometry.usePolls = geometry.usePollsByPhase[phaseName]

    delete phaseGeometry.voterStrategyListByPhase
    delete phaseGeometry.usePollsByPhase

    return phaseGeometry
}
