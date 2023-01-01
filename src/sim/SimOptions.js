/**
 * Add menu items to switch between types of sims.
 * @param {Menu} menu
 */
export default function SimOptions(menu, changes) {
    const self = this

    self.setViz = (v) => { self.viz = v }
    self.setGeo = (g) => { self.geo = g }
    self.setDimensions = (d) => { self.dimensions = d }

    // Defaults
    self.setViz('one')
    self.setGeo(false)
    self.setDimensions(2)
    changes.add(['geo', 'dimensions', 'viz'])

    const vizList = [
        { name: 'One Election', value: 'one' },
        { name: 'Sample Elections', value: 'sample' },
    ]
    menu.addMenuItem(
        self,
        {
            label: 'Viz:',
            prop: 'viz',
            setProp: (p) => { self.setViz(p) },
            options: vizList,
            change: ['viz'],
        },
    )

    const geoList = [
        { name: 'On', value: true },
        { name: 'Off', value: false },
    ]
    menu.addMenuItem(
        self,
        {
            label: 'Geo:',
            prop: 'geo',
            setProp: (p) => { self.setGeo(p) },
            options: geoList,
            change: ['geo'],
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
