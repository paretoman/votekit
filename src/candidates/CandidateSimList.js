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
        const canList = self.getCandidates()
        canList.forEach((can, index) => {
            const fraction = fractions[index]
            can.setFraction(fraction)
        })
    }
    self.setCandidateWins = (winsByCandidate) => {
        const canList = self.getCandidates()
        canList.forEach((can, index) => {
            const win = winsByCandidate[index]
            can.setWins(win)
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
        const canList = self.getCandidates()
        canList.forEach((can) => can.renderForeground())
    }
    self.renderForegroundAll = () => {
        const canList = self.getCandidatesAll()
        canList.forEach((can) => can.renderForeground())
    }
    self.numCandidates = () => simCans.length
}
