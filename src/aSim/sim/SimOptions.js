/**
 * Add menu items to switch between types of sim modes.
 * @param {Menu} menu
 */
export default function SimOptions(changes) {
    const self = this

    self.setMode = (m) => { self.mode = m }
    self.setNumDistricts = (n) => {
        self.numDistricts = n
        self.useDistricts = n > 1
    }
    self.setDimensions = (d) => { self.dimensions = d }

    // Defaults
    self.setMode('one')
    self.setNumDistricts(1)
    self.setDimensions(2)
    changes.add(['numDistricts', 'dimensions', 'mode'])
}
