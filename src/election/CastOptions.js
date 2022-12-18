export default function CastOptions(menu) {
    const self = this

    self.dimensions = 2

    const dimensionList = [
        { name: '1D', value: 1 },
        { name: '2D', value: 2 },
    ]
    menu.addMenuItem(
        self,
        {
            label: 'Dimensions:',
            prop: 'dimensions',
            setProp: (p) => { self.dimensions = p },
            options: dimensionList,
            change: ['dimensions'],
        },
    )
}
