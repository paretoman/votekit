import CandidateDistributionSampler from './CandidateDistributionSampler.js'

export default function SampleCandidates() {
    const self = this

    const candidateDistributions = []

    self.newCandidateDistribution = function (canDis) {
        candidateDistributions.push(canDis)
    }

    self.getCandidateDistributions = () => candidateDistributions

    self.clear = () => {
        candidateDistributions.splice(0, candidateDistributions.length)
    }

    self.startSampler = () => {
        self.sampler = new CandidateDistributionSampler(candidateDistributions)
    }
    self.render = () => {
        candidateDistributions.forEach((can) => can.render())
    }
    self.renderForeground = () => {
        candidateDistributions.forEach((can) => can.renderForeground())
    }
}
