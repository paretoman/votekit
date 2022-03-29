/** @module */

/**
 *
 * A simple list of simCandidateDistribution instances.
 * It really just passes along function calls to each member of the list.
 * It also checks if that member exists. Alternatively, it was deleted.
 * @constructor
 */
export default function SimCandidateList() {
    const self = this

    const simCans = []

    self.newCandidate = function (simCan) {
        simCans.push(simCan)
    }

    self.getSimCandidates = () => simCans.filter((simCan) => simCan.candidate.exists)

    self.getCandidates = () => {
        const simCansEx = self.getSimCandidates()
        return simCansEx.map((simCan) => simCan.candidate)
    }

    self.setCandidateFractions = (fractions) => {
        const cans = self.getCandidates()
        cans.forEach((can, index) => {
            const fraction = fractions[index]
            can.setFraction(fraction)
        })
    }
    self.setCandidateWins = (winsByCandidate) => {
        const cans = self.getCandidates()
        cans.forEach((can, index) => {
            const win = winsByCandidate[index]
            can.setWins(win)
        })
    }
    self.updateXY = () => {
        simCans.forEach((simCan) => simCan.candidate.updateXY())
    }
    self.renderForeground = () => {
        const cans = self.getCandidates()
        cans.forEach((can) => can.renderForeground())
    }
    self.numCandidates = () => simCans.length
}
