/** @module */

import CandidateDnView from './CandidateDnView.js'

/**
 * A simple list of candidateDnView instances.
 * It really just passes along function calls to each member of the list.
 * It also checks if that member exists. Alternatively, it was deleted.
 * @constructor
 */
export default function CandidateDnViewList(view, candidateDnList, screen, election) {
    const self = this

    const canDnViews = []
    self.rendererMaker = () => ({ render: () => {} })

    // Publish to DraggableManager //
    const observers = []
    self.attachNewG = (o) => { observers.push(o) }
    const updateObservers = (g) => { observers.forEach((o) => o.updateNewG(g)) }

    // Subscribe to Sim //
    candidateDnList.attachNewE(self)
    self.updateNewE = (candidateDn) => {
        self.newCandidateDn(candidateDn)
    }

    // Data Setters and Getters //

    self.newCandidateDn = function (candidateDn) {
        const canDnView = new CandidateDnView(candidateDn, screen, election, 21, 21, view)
        canDnViews.push(canDnView)
        canDnView.graphic.setRenderer(self.rendererMaker)
        updateObservers(canDnView)
    }

    // get sim entities that exist
    self.getCanDnViews = () => {
        const a = canDnViews.filter((canDnView) => canDnView.canDn.exists)
        return a
    }

    // get the underlying entities of the above
    self.getCandidateDistributions = () => {
        const simCanDnsEx = self.getCanDnViews()
        return simCanDnsEx.map((canDnView) => canDnView.canDn)
    }
    self.getCandidateDistributionsAll = () => canDnViews.map((canDnView) => canDnView.canDn)

    // Update //

    self.setCandidateDnWins = (partyWinFraction) => {
        const canDnViewsExisting = self.getCanDnViews()
        if (canDnViewsExisting.length > 1) {
            canDnViewsExisting.forEach((canDnView, index) => {
                const winFraction = partyWinFraction[index]
                canDnView.graphic.setWinFraction(winFraction)
            })
        }
    }
    self.updateViewXY = () => {
        canDnViews.forEach((canDnView) => canDnView.graphic.updateViewXY())
    }

    // Render //

    self.render = () => {
        canDnViews.forEach((canDnView) => {
            if (canDnView.canDn.exists) canDnView.graphic.renderer.render()
        })
    }

    self.setRenderer = (rendererMaker) => {
        self.rendererMaker = rendererMaker
        canDnViews.forEach((canDnView) => canDnView.graphic.setRenderer(rendererMaker))
    }
    self.renderForeground = () => {
        if (view.showGhosts) {
            self.renderForegroundAll()
        } else {
            self.renderForegroundExisting()
        }
    }
    self.renderForegroundExisting = () => {
        canDnViews.forEach((canDnView) => {
            if (canDnView.canDn.exists) canDnView.graphic.renderForeground()
        })
    }
    self.renderForegroundAll = () => {
        canDnViews.forEach((canDnView) => canDnView.graphic.renderForeground())
    }
}
