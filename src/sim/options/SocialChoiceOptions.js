export default function SocialChoiceOptions(changes, electionOptions) {
    const self = this

    self.seats = 1
    self.threshold = 0.1
    self.numSampleCandidates = 5

    self.update = () => {
        if (changes.check(['socialChoiceMethod'])) {
            const { socialChoiceType } = electionOptions
            if (socialChoiceType === 'allocation') {
                self.seats = 5
                self.numSampleCandidates = 10
            } else if (socialChoiceType === 'multiWinner') {
                self.seats = 3
                self.numSampleCandidates = 10
            } else { // 'singleWinner'
                self.seats = 1
                self.numSampleCandidates = 5
            }
        }
    }
}
