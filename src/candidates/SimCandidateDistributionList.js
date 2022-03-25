/** @module */

import CandidateDistributionSampler from '../election/CandidateDistributionSampler.js'

/**
 * A simple list of simCandidateDistribution instances.
 * It really just passes along function calls to each member of the list.
 * It also checks if that member exists. Alternatively, it was deleted.
 * @constructor
 */
export default function SimCandidateDistributionList() {
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

    self.startSampler = () => {
        const canDns = self.getCandidateDistributions()
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
        const canDns = self.getCandidateDistributions()
        canDns.forEach((canDn) => canDn.renderForeground())
    }
}
