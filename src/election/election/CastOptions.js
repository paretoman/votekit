export default function CastOptions(changes, simOptions, electionOptions) {
    const self = this

    self.usr = 4

    self.update = () => {
        if (changes.check(['mode']) || changes.check(['numDistricts'])) {
            if (simOptions.mode === 'one') {
                if (electionOptions.numDistricts === 1) {
                    self.usr = 4
                } else {
                    self.usr = 32
                }
            } else if (electionOptions.numDistricts === 1) {
                self.usr = 16
            } else {
                self.usr = 16
            }
        }
    }
}
