import ElectionSampler from './ElectionSampler.js'

export default function Sampler() {
    const self = this
    self.electionSampler = new ElectionSampler()
    self.update = function (geometry, changes, electionOptions) {
        if (changes.checkAny()) {
            self.electionSampler.startSim()
        }

        const samplingResult = self.electionSampler.addSim(geometry, electionOptions)
        return samplingResult
    }
}
