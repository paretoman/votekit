import CandidateDistributionSampler from './CandidateDistributionSampler.js'

export default function SampleCandidates() {
    const self = this

    const candidateDistributions = []
    const candidateDistributionIDs = []
    let nextID = 0

    self.newCandidateDistribution = function (candidateDistribution) {
        const id = nextID
        nextID += 1
        candidateDistributions.push(candidateDistribution)
        candidateDistributionIDs.push(id)
        return id
    }

    self.getCandidateDistributions = () => candidateDistributions.filter((v) => v.exists)

    self.startSampler = () => {
        const canDis = self.getCandidateDistributions()
        self.sampler = new CandidateDistributionSampler(canDis)
    }
    self.render = () => {
        const canDis = self.getCandidateDistributions()
        canDis.forEach((can) => can.render())
    }
    self.renderForeground = () => {
        const canDis = self.getCandidateDistributions()
        canDis.forEach((can) => can.renderForeground())
    }
}
