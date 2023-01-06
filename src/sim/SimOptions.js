/**
 * Add menu items to switch between types of sims.
 * @param {Menu} menu
 */
export default function SimOptions(menu, changes) {
    const self = this

    self.setMode = (m) => { self.mode = m }
    self.setUseDistricts = (g) => { self.useDistricts = g }
    self.setDimensions = (d) => { self.dimensions = d }

    // Defaults
    self.setMode('one')
    self.setUseDistricts(false)
    self.setDimensions(2)
    changes.add(['design', 'dimensions', 'mode'])

    const modeList = [
        { name: 'One Election', value: 'one' },
        { name: 'Sample Elections', value: 'sample' },
    ]
    menu.addMenuItem(
        self,
        {
            label: 'Mode:',
            prop: 'mode',
            setProp: (p) => { self.setMode(p) },
            options: modeList,
            change: ['mode'],
        },
    )

    const useDistrictsList = [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
    ]
    menu.addMenuItem(
        self,
        {
            label: 'Use Districts:',
            prop: 'useDistricts',
            setProp: (p) => { self.setUseDistricts(p) },
            options: useDistrictsList,
            change: ['design'],
        },
    )

    const dimensionList = [
        { name: '1D', value: 1 },
        { name: '2D', value: 2 },
    ]
    menu.addMenuItem(
        self,
        {
            label: 'Dimensions:',
            prop: 'dimensions',
            setProp: (p) => { self.setDimensions(p) },
            options: dimensionList,
            change: ['dimensions'],
        },
    )
}
