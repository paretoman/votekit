export default function SocialChoiceOptionsMan(changes, electionOptions) {
    const self = this

    const socialChoiceOptions = {
        seats: 1,
        threshold: 0.1,
        numSampleCandidates: 5,
    }

    self.update = () => {
        if (changes.check(['socialChoiceMethod'])) {
            const { socialChoiceType } = electionOptions
            if (socialChoiceType === 'allocation') {
                socialChoiceOptions.seats = 5
                socialChoiceOptions.numSampleCandidates = 10
            } else if (socialChoiceType === 'multiWinner') {
                socialChoiceOptions.seats = 3
                socialChoiceOptions.numSampleCandidates = 10
            } else { // 'singleWinner'
                socialChoiceOptions.seats = 1
                socialChoiceOptions.numSampleCandidates = 5
            }
        }
    }
    self.getOptions = () => ({ ...socialChoiceOptions })
}
