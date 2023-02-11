export default function CastOptionsMan(changes, simOptions, electionOptions) {
    const self = this

    const castOptions = {
        usr: 4,
    }

    self.update = () => {
        if (changes.check(['mode']) || changes.check(['numTracts'])) {
            if (simOptions.mode === 'one') {
                if (electionOptions.numTracts === 1) {
                    castOptions.usr = 4
                } else {
                    castOptions.usr = 32
                }
            } else if (electionOptions.numTracts === 1) {
                castOptions.usr = 16
            } else {
                castOptions.usr = 16
            }
        }
    }
    self.getOptions = () => ({ ...castOptions })
}
