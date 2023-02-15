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

    self.seeds = [0]

    self.init()
}
