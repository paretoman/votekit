import ElectionSampler from '../../election/sampler/ElectionSampler.js'

export default function Sampler() {
    const self = this
    self.electionSampler = new ElectionSampler()
    self.update = function (geometry, cDnSampler, changes, electionOptions) {
        if (changes.checkAny()) {
            self.electionSampler.startSim()
        }

        const samplingResult = self.electionSampler.addSim(geometry, cDnSampler, electionOptions)
        return samplingResult
    }
}
