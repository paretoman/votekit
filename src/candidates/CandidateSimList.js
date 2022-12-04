/** @module */

import CandidateSim from './CandidateSim.js'

/**
 *
 * A simple list of candidateSim instances.
 * It passes along function calls to each member of the list.
 * It also checks if that member exists. Alternatively, it was deleted.
 * @constructor
 */
export default function CandidateSimList(view, sim, screen, election) {
    const self = this

    const simCans = []

    // Publish to DraggableManager //
    const observers = []
    self.attachNewG = (o) => { observers.push(o) }
    const updateObservers = (g) => { observers.forEach((o) => o.updateNewG(g)) }

    // Subscribe to Sim //
    sim.candidateList.attachNewE(self)
    self.updateNewE = (candidate) => {
        self.newCandidate(candidate)
    }

    // Data Setters and Getters //
    self.newCandidate = function (candidate) {
        const simCan = new CandidateSim(candidate, screen, election, 21, 21, view)
        simCans.push(simCan)
        updateObservers(simCan)
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
    self.unsetCandidateWins = () => {
        const nk = self.numSimCandidates()
        const fillUndefined = Array(nk).fill(undefined)
        self.setCandidateWins(fillUndefined)
    }
    self.updateXY = () => {
        simCans.forEach((simCan) => simCan.candidate.updateXY())
    }

    // Render //

    self.renderForeground = () => {
        if (view.showGhosts) {
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
