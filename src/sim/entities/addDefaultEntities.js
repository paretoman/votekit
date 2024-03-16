import defaultStrategyRules from './defaultStrategyRules.js'

/**
 * Add entities for a default configuration.
 * @param {Entities} entities
 */
export default function addDefaultEntities(entities) {
    const doLoad = true
    entities.candidateList.addCandidate({
        shape2: { x: 50, y: 100 },
        shape1: { x: 50 },
        color: '#e05020',
        doLoad,
    })
    entities.candidateList.addCandidate({
        shape2: { x: 100, y: 50 },
        shape1: { x: 100 },
        color: '#50e020',
        doLoad,
    })
    entities.candidateList.addCandidate({
        shape2: { x: 300 - 100, y: 300 - 50 },
        shape1: { x: 200 },
        color: '#2050e0',
        doLoad,
    })
    entities.candidateDnList.addCandidateDistribution({
        shape2: { x: 150, y: 150, w: 200, densityProfile: 'step' },
        shape1: { x: 150, w: 200, densityProfile: 'gaussian' },
        doLoad,
    })
    entities.voterShapeList.addVoterCircle({
        shape2: { x: 150, y: 150, w: 200, densityProfile: 'step', densityMax: 1 },
        shape1: { x: 150, w: 200, densityProfile: 'gaussian', densityMax: 1 },
        strategyRules: defaultStrategyRules,
        doLoad,
    })
}
