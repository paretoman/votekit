import addSimControlsLabel from './addSimControlsLabel.js'

export default function menuSim(sim, menu, layout) {
    // Buttons //

    addSimControlsLabel(layout)

    // -- Menu -- //

    // add a menu item to switch between types of sims
    // a list of simulation types
    const vizList = [
        { name: 'One Election', value: 'one' },
        { name: 'Sample Elections', value: 'sample' },
    ]
    menu.addMenuItem(
        sim,
        {
            label: 'Viz:',
            prop: 'viz',
            setProp: (p) => { sim.setViz(p) },
            options: vizList,
            change: ['viz'],
        },
    )

    const geoList = [
        { name: 'On', value: true },
        { name: 'Off', value: false },
    ]
    menu.addMenuItem(
        sim,
        {
            label: 'Geo:',
            prop: 'geo',
            setProp: (p) => { sim.setGeo(p) },
            options: geoList,
            change: ['geo'],
        },
    )
}
