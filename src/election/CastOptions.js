export default function CastOptions(changes, simOptions) {
    const self = this

    self.usr = 4

    self.update = () => {
        if (changes.check(['mode']) || changes.check(['useDistricts'])) {
            if (simOptions.mode === 'one') {
                if (simOptions.useDistricts === false) {
                    self.usr = 4
                } else {
                    self.usr = 32
                }
            } else if (simOptions.useDistricts === false) {
                self.usr = 16
            } else {
                self.usr = 16
            }
        }
    }
}
