export default function CastOptionsMan(changes, simOptions, optionsBag) {
    const self = this

    const castOptions = {
        usr: 4,
        verbosity: 2,
    }

    self.update = () => {
        if (changes.check(['mode']) || changes.check(['numTracts'])) {
            if (simOptions.mode === 'one') {
                if (optionsBag.numTracts === 1) {
                    castOptions.verbosity = 2
                    castOptions.usr = 4
                } else {
                    castOptions.verbosity = 1
                    castOptions.usr = 32
                }
            } else { // mode = "sample"
                castOptions.verbosity = 0
                if (optionsBag.numTracts === 1) {
                    castOptions.usr = 16
                } else {
                    castOptions.usr = 32
                }
            }
        }
    }
    self.getOptions = () => ({ ...castOptions })
}
