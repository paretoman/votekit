/** @module */

import CandidateDistributionSampler from '../election/CandidateDistributionSampler.js'

/**
 * A simple list of simCandidateDistribution instances.
 * It really just passes along function calls to each member of the list.
 * It also checks if that member exists. Alternatively, it was deleted.
 * @constructor
 */
export default function SimCandidateDistributionList(sim) {
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
        const canDns = self.getCandidateDistributions()
        if (canDns.length === 0) return
        self.sampler = new CandidateDistributionSampler(canDns)
    }
    self.updateXY = () => {
        simCanDns.forEach((simCanDn) => simCanDn.canDn.updateXY())
    }
    self.render = () => {
        const canDns = self.getCandidateDistributions()
        canDns.forEach((canDn) => canDn.render())
    }
    self.renderForeground = () => {
        if (sim.showGhosts) {
            self.renderForegroundAll()
        } else {
            self.renderForegroundExisting()
        }
    }
    self.renderForegroundExisting = () => {
        const canDns = self.getCandidateDistributions()
        canDns.forEach((canDn) => canDn.renderForeground())
    }
    self.renderForegroundAll = () => {
        const cans = self.getCandidateDistributionsAll()
        cans.forEach((can) => can.renderForeground())
    }
}
