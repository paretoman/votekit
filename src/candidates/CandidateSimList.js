/** @module */

/**
 *
 * A simple list of candidateDnSim instances.
 * It really just passes along function calls to each member of the list.
 * It also checks if that member exists. Alternatively, it was deleted.
 * @constructor
 */
export default function CandidateSimList(sim) {
    const self = this

    const simCans = []

    // Data Setters and Getters //

    self.newCandidate = function (simCan) {
        simCans.push(simCan)
    }
    self.getSimCandidates = () => simCans.filter((simCan) => simCan.candidate.exists)

    self.getCandidates = () => {
        const simCansEx = self.getSimCandidates()
        return simCansEx.map((simCan) => simCan.candidate)
    }
    self.getCandidatesAll = () => simCans.map((simCan) => simCan.candidate)

    // Update //

    self.setCandidateFractions = (fractions) => {
        const simCansExisting = self.getSimCandidates()
        simCansExisting.forEach((simCan, index) => {
            const fraction = fractions[index]
            simCan.graphic.setFraction(fraction)
        })
    }
    self.setCandidateWins = (winsByCandidate) => {
        const simCansExisting = self.getSimCandidates()
        simCansExisting.forEach((simCan, index) => {
            const win = winsByCandidate[index]
            simCan.graphic.setWins(win)
        })
    }
    self.updateXY = () => {
        simCans.forEach((simCan) => simCan.candidate.updateXY())
    }

    // Render //

    self.renderForeground = () => {
        if (sim.showGhosts) {
            self.renderForegroundAll()
        } else {
            self.renderForegroundExisting()
        }
    }
    self.renderForegroundExisting = () => {
        const simCansExisting = self.getSimCandidates()
        simCansExisting.forEach((simCan) => simCan.graphic.renderForeground())
    }
    self.renderForegroundAll = () => {
        simCans.forEach((simCan) => simCan.graphic.renderForeground())
    }
    self.numSimCandidates = () => simCans.length
}
