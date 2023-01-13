/**
 * Add menu items to switch between types of sim modes.
 * @param {Menu} menu
 */
export default function SimOptions(changes) {
    const self = this

    self.setMode = (m) => { self.mode = m }
    self.setUseDistricts = (g) => { self.useDistricts = g }
    self.setDimensions = (d) => { self.dimensions = d }

    // Defaults
    self.setMode('one')
    self.setUseDistricts(false)
    self.setDimensions(2)
    changes.add(['useDistricts', 'dimensions', 'mode'])
}
