import CandidateDistributionSampler1D from '../../election/sampler/CandidateDistributionSampler1D.js'
import CandidateDistributionSampler2D from '../../election/sampler/CandidateDistributionSampler2D.js'

export default function CandidateDistributionSampler(candidateDnList, changes, simOptions) {
    const self = this

    self.update = () => {
        if (changes.checkNone()) return

        self.startSampler()
    }

    self.startSampler = () => {
        const { dimensions } = simOptions
        const canDnsGeoms = candidateDnList.getGeoms()
        const { partiesByCan } = candidateDnList.getParties()

        if (canDnsGeoms.length === 0) return

        const CDnSampler = (dimensions === 1)
            ? CandidateDistributionSampler1D
            : CandidateDistributionSampler2D
        self.sampler = new CDnSampler(canDnsGeoms, partiesByCan)
    }
}
