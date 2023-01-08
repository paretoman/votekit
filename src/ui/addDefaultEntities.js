/**
 * Add entities for a default configuration.
 * @param {Entities} entities
 */
export default function addDefaultEntities(entities) {
    entities.candidateList.addCandidate({ x: 50, y: 100 }, { x: 50 }, '#e05020', true)
    entities.candidateList.addCandidate({ x: 100, y: 50 }, { x: 100 }, '#50e020', true)
    entities.candidateList.addCandidate({ x: 300 - 100, y: 300 - 50 }, { x: 200 }, '#2050e0', true)
    entities.candidateDnList.addCandidateDistribution({ x: 150, y: 150, w: 200 }, { x: 150, w: 200, densityProfile: 'gaussian' }, true)
    entities.voterShapeList.addVoterCircle({ x: 50, y: 150, w: 200 }, { x: 50, w: 200, densityProfile: 'gaussian' }, true)
    entities.voterShapeList.addVoterCircle({ x: 250, y: 150, w: 200 }, { x: 250, w: 200, densityProfile: 'gaussian' }, true)
}
