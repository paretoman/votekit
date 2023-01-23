/**
 * Add menu items to switch between types of sim modes.
 * @param {Menu} menu
 */
export default function SimOptions(changes) {
    const self = this

    self.setMode = (m) => { self.mode = m }
    self.setDimensions = (d) => { self.dimensions = d }

    // Defaults
    self.setMode('one')
    self.setDimensions(2)
    changes.add(['dimensions', 'mode'])
}
