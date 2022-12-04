/** @module */

import CandidateDnSim from './CandidateDnSim.js'

/**
 * A simple list of candidateDnSim instances.
 * It really just passes along function calls to each member of the list.
 * It also checks if that member exists. Alternatively, it was deleted.
 * @constructor
 */
export default function CandidateDnSimList(view, sim, changes, screen, election) {
    const self = this

    const simCanDns = []
    self.rendererMaker = () => ({ render: () => {} })

    // Publish to DraggableManager //
    const observers = []
    self.attachNewG = (o) => { observers.push(o) }
    const updateObservers = (g) => { observers.forEach((o) => o.updateNewG(g)) }

    // Subscribe to Sim //
    sim.candidateDnList.attachNewE(self)
    self.updateNewE = (candidateDn) => {
        self.newCandidateDn(candidateDn)
    }

    // Data Setters and Getters //

    self.newCandidateDn = function (candidateDn) {
        const simCanDn = new CandidateDnSim(candidateDn, screen, election, 21, 21, view)
        simCanDns.push(simCanDn)
        simCanDn.graphic.setRenderer(self.rendererMaker)
        updateObservers(simCanDn)
    }

    // get sim entities that exist
    self.getSimCandidateDistributions = () => {
        const a = simCanDns.filter((simCanDn) => simCanDn.canDn.exists)
        return a
    }

    // get the underlying entities of the above
    self.getCandidateDistributions = () => {
        const simCanDnsEx = self.getSimCandidateDistributions()
        return simCanDnsEx.map((simCanDn) => simCanDn.canDn)
    }
    self.getCandidateDistributionsAll = () => simCanDns.map((simCanDn) => simCanDn.canDn)

    // Update //

    self.setCandidateDnWins = (partyWinFraction) => {
        const simCanDnsExisting = self.getSimCandidateDistributions()
        if (simCanDnsExisting.length > 1) {
            simCanDnsExisting.forEach((simCanDn, index) => {
                const winFraction = partyWinFraction[index]
                simCanDn.graphic.setWinFraction(winFraction)
            })
        }
    }
    self.updateXY = () => {
        simCanDns.forEach((simCanDn) => simCanDn.canDn.updateXY())
    }

    // Render //

    self.render = () => {
        simCanDns.forEach((simCanDn) => {
            if (simCanDn.canDn.exists) simCanDn.graphic.renderer.render()
        })
    }

    self.setRenderer = (rendererMaker) => {
        self.rendererMaker = rendererMaker
        simCanDns.forEach((simCanDn) => simCanDn.graphic.setRenderer(rendererMaker))
    }
    self.renderForeground = () => {
        if (view.showGhosts) {
            self.renderForegroundAll()
        } else {
            self.renderForegroundExisting()
        }
    }
    self.renderForegroundExisting = () => {
        simCanDns.forEach((simCanDn) => {
            if (simCanDn.canDn.exists) simCanDn.graphic.renderForeground()
        })
    }
    self.renderForegroundAll = () => {
        simCanDns.forEach((simCanDn) => simCanDn.graphic.renderForeground())
    }
}
