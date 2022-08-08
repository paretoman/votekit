/** @module */

import CandidateDistributionSampler1D from '../election/CandidateDistributionSampler1D.js'
import CandidateDistributionSampler2D from '../election/CandidateDistributionSampler2D.js'

/**
 * A simple list of candidateDnSim instances.
 * It really just passes along function calls to each member of the list.
 * It also checks if that member exists. Alternatively, it was deleted.
 * @constructor
 */
export default function CandidateDnSimList(sim, changes) {
    const self = this

    const simCanDns = []
    self.rendererMaker = () => ({ render: () => {} })

    // Data Setters and Getters //

    self.newCandidate = function (simCanDn) {
        simCanDns.push(simCanDn)
        simCanDn.graphic.setRenderer(self.rendererMaker)
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

    self.update = () => {
        if (changes.checkNone()) return

        self.startSampler()
    }

    self.startSampler = () => {
        const canDnsList = self.getCandidateDistributions()
        if (canDnsList.length === 0) return
        const { dimensions } = sim.election
        const CDnSampler = (dimensions === 1)
            ? CandidateDistributionSampler1D
            : CandidateDistributionSampler2D
        self.sampler = new CDnSampler(canDnsList)
    }

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
        if (sim.showGhosts) {
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
