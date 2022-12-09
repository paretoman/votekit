/** @module */

import CandidateDistributionSampler from '../../election/CandidateDistributionSampler.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {ElectionSample} electionSample
 * @param {ElectionSampleGeo} electionSampleGeo
 * @param {VoterGeo} voterGeo
 * @param {Sim} sim
 * @constructor
 */
export default function SimSample(
    entities,
    menu,
    changes,
    election,
    electionSample,
    electionSampleGeo,
    voterGeo,
    sim,
) {
    const self = this

    const { candidateDnList, voterShapeList } = entities
    const canDnSampler = new CandidateDistributionSampler(candidateDnList, changes, election)

    changes.add(['districts'])

    // Strategies //
    let electionStrategy

    // Main State Machine Functions //
    self.enter = () => {
        electionStrategy = (sim.geo) ? electionSampleGeo : electionSample
    }
    self.exit = () => { }
    self.update = () => {
        // Update players. Run an election. Get result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        if (sim.geo) voterGeo.update()
        canDnSampler.update()

        const { dimensions } = sim.election
        const addResult = electionStrategy
            .update(voterShapeList, candidateDnList, canDnSampler.sampler, changes, dimensions)
        return addResult
    }
}
