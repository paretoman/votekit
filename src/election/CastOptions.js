export default function CastOptions(menu, changes, simOptions) {
    const self = this

    self.usr = 4

    self.update = () => {
        if (changes.check(['viz']) || changes.check(['geo'])) {
            if (simOptions.viz === 'one') {
                if (simOptions.geo === false) {
                    self.usr = 4
                } else {
                    self.usr = 32
                }
            } else if (simOptions.geo === false) {
                self.usr = 16
            } else {
                self.usr = 16
            }
        }
    }
}
