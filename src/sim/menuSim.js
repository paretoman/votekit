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
            setProp: (p) => { sim.viz = p },
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
            setProp: (p) => { sim.geo = p },
            options: geoList,
            change: ['geo'],
        },
    )

    const dimensionList = [
        { name: '1D', value: 1 },
        { name: '2D', value: 2 },
    ]
    menu.addMenuItem(
        sim.election,
        {
            label: 'Dimensions:',
            prop: 'dimensions',
            setProp: (p) => { sim.election.setDimensions(p) },
            options: dimensionList,
            change: ['dimensions'],
        },
    )
}
