import CandidateDistributionSampler1D from '../../election/src/sampler/sampleCanDnGeom1D.js'
import CandidateDistributionSampler2D from '../../election/src/sampler/sampleCanDnGeom2D.js'

export default function CandidateDistributionSampler(candidateDnList, changes, simOptions) {
    const self = this

    self.update = () => {
        if (changes.checkNone()) return

        self.startSampler()
    }

    self.startSampler = () => {
        const canDnsGeoms = candidateDnList.getGeoms()

        if (canDnsGeoms.length === 0) return

        const { dimensions } = simOptions
        const { partiesByCan } = candidateDnList.getParties()

        if (dimensions === 1) {
            self.sampler = new CandidateDistributionSampler1D(canDnsGeoms, partiesByCan)
        } else {
            self.sampler = new CandidateDistributionSampler2D(canDnsGeoms, partiesByCan)
        }
    }
}
