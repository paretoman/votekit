export default function SocialChoiceOptionsMan(changes, electionOptions) {
    const self = this

    const socialChoiceOptions = {
        seats: 1,
        threshold: 0.1,
    }

    self.update = () => {
        if (changes.check(['socialChoiceMethod'])) {
            const { socialChoiceType } = electionOptions
            if (socialChoiceType === 'allocation') {
                socialChoiceOptions.seats = 5
            } else if (socialChoiceType === 'multiWinner') {
                socialChoiceOptions.seats = 3
            } else { // 'singleWinner'
                socialChoiceOptions.seats = 1
            }
        }
    }
    self.getOptions = () => ({ ...socialChoiceOptions })
}
