export default function CastOptions(menu, changes, simOptions) {
    const self = this

    self.usr = 4

    self.update = () => {
        if (changes.check(['mode']) || changes.check(['design'])) {
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
