/**
 * Add menu items to switch between types of sims.
 * @param {Menu} menu
 */
export default function SimOptions(menu) {
    const self = this

    self.viz = 'one'
    self.geo = false
    self.setViz = (v) => { self.viz = v }
    self.setGeo = (g) => { self.geo = g }

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
}
