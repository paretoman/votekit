/** @module */

import CandidateView from './CandidateView.js'

/**
 *
 * A simple list of candidateView instances.
 * It passes along function calls to each member of the list.
 * It also checks if that member exists. Alternatively, it was deleted.
 * @constructor
 */
export default function CandidateViewList(viewSettings, candidateList, screen, election) {
    const self = this

    const canViews = []

    // Publish to DraggableManager //
    const observers = []
    self.attachNewG = (o) => { observers.push(o) }
    const updateObservers = (g) => { observers.forEach((o) => o.updateNewG(g)) }

    // Subscribe to Sim //
    candidateList.attachNewE(self)
    self.updateNewE = (candidate) => {
        self.newCandidate(candidate)
    }

    // Data Setters and Getters //
    self.newCandidate = function (candidate) {
        const canView = new CandidateView(candidate, screen, election, 21, 21, viewSettings)
        canViews.push(canView)
        updateObservers(canView)
    }
    self.getCanViews = () => canViews.filter((canView) => canView.candidate.exists)
    self.getCandidates = () => {
        const canViewsEx = self.getCanViews()
        return canViewsEx.map((canView) => canView.candidate)
    }
    self.getCandidatesAll = () => canViews.map((canView) => canView.candidate)

    // Update //

    self.setCandidateFractions = (fractions) => {
        const canViewsEx = self.getCanViews()
        canViewsEx.forEach((canView, index) => {
            const fraction = fractions[index]
            canView.graphic.setFraction(fraction)
        })
    }
    self.setCandidateWins = (winsByCandidate) => {
        const canViewsEx = self.getCanViews()
        canViewsEx.forEach((canView, index) => {
            const win = winsByCandidate[index]
            canView.graphic.setWins(win)
        })
    }
    self.unsetCandidateWins = () => {
        const nk = canViews.length
        const fillUndefined = Array(nk).fill(undefined)
        self.setCandidateWins(fillUndefined)
    }
    self.updateViewXY = () => {
        canViews.forEach((canView) => canView.graphic.updateViewXY())
    }

    // Render //

    self.renderForeground = () => {
        if (viewSettings.showGhosts) {
            self.renderForegroundAll()
        } else {
            self.renderForegroundExisting()
        }
    }
    self.renderForegroundExisting = () => {
        const canViewsEx = self.getCanViews()
        canViewsEx.forEach((canView) => canView.graphic.renderForeground())
    }
    self.renderForegroundAll = () => {
        canViews.forEach((canView) => canView.graphic.renderForeground())
    }
}
