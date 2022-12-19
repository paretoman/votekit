import CandidateDistributionSampler1D from './CandidateDistributionSampler1D.js'
import CandidateDistributionSampler2D from './CandidateDistributionSampler2D.js'

export default function CandidateDistributionSampler(candidateDnList, changes, election) {
    const self = this

    self.update = () => {
        if (changes.checkNone()) return

        self.startSampler()
    }

    self.startSampler = () => {
        const { dimensions } = election.castOptions
        const canDnsList = candidateDnList.getCandidateDistributions()
        if (canDnsList.length === 0) return
        const CDnSampler = (dimensions === 1)
            ? CandidateDistributionSampler1D
            : CandidateDistributionSampler2D
        self.sampler = new CDnSampler(canDnsList)
    }
}
