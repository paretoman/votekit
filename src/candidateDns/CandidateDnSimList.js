/** @module */

import CandidateDistributionSampler from '../election/CandidateDistributionSampler.js'

/**
 * A simple list of candidateDnSim instances.
 * It really just passes along function calls to each member of the list.
 * It also checks if that member exists. Alternatively, it was deleted.
 * @constructor
 */
export default function CandidateDnSimList(sim) {
    const self = this

    const simCanDns = []

    self.newCandidate = function (simCanDn) {
        simCanDns.push(simCanDn)
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

    self.startSampler = () => {
        const canDnsList = self.getCandidateDistributions()
        if (canDnsList.length === 0) return
        self.sampler = new CandidateDistributionSampler(canDnsList)
    }
    self.updateXY = () => {
        simCanDns.forEach((simCanDn) => simCanDn.canDn.updateXY())
    }
    self.render = () => {
        const canDnsList = self.getCandidateDistributions()
        canDnsList.forEach((canDn) => canDn.render())
    }
    self.renderForeground = () => {
        if (sim.showGhosts) {
            self.renderForegroundAll()
        } else {
            self.renderForegroundExisting()
        }
    }
    self.renderForegroundExisting = () => {
        const canDnsList = self.getCandidateDistributions()
        canDnsList.forEach((canDn) => canDn.renderForeground())
    }
    self.renderForegroundAll = () => {
        const canDnsList = self.getCandidateDistributionsAll()
        canDnsList.forEach((can) => can.renderForeground())
    }
}
