/**
 * Add menu items to switch between types of sim modes.
 * @param {Menu} menu
 */
export default function SimOptions(changes, commander) {
    const self = this

    self.init = () => {
        // Defaults
        self.setMode('one')
        self.setDimensions(2)
        self.seeds = []
        self.setSeeds(0, 0)
        self.setSeedRandom(true)
    }

    self.setMode = commander.addSender({
        name: 'mode',
        currentValue: self.mode,
        action(mode) {
            self.mode = mode
            changes.add(['mode'])
        },
    }).go

    self.setDimensions = commander.addSender({
        name: 'dimensions',
        currentValue: self.dimensions,
        action(dimensions) {
            self.dimensions = dimensions
            changes.add(['dimensions'])
        },
    }).go

    self.setSeeds = commander.addSenderForList({
        name: 'seeds',
        action(i, seed) {
            self.seeds[i] = seed
            changes.add(['seeds'])
        },
    }).go

    self.setSeedRandom = commander.addSender({
        name: 'seedRandom',
        currentValue: self.seedRandom,
        action(seedRandom) {
            self.seedRandom = seedRandom
            changes.add(['seedRandom'])
        },
    }).go

    self.init()
}
