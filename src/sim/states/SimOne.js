/** @module */

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Create a geographical map with variations of voter center.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {ElectionOne} electionOne
 * @param {ElectionGeo} electionGeo
 * @param {VoterGeo} voterGeo
 * @param {Sim} sim
 * @constructor
 */
export default function SimOne(menu, changes, election, electionOne, electionGeo, voterGeo, sim) {
    const self = this

    // Entities //

    changes.add(['districts'])

    // Strategies //
    let electionStrategy

    // Main State Machine Functions //
    self.enter = () => {
        electionStrategy = (sim.geo) ? electionGeo : electionOne
    }
    self.exit = () => {
    }
    self.update = () => {
        if (changes.checkNone()) return {}

        if (sim.geo) voterGeo.update()
        const electionResults = electionStrategy
            .runElectionSim(sim.voterShapeList, sim.candidateList, changes)

        return electionResults
    }
}
