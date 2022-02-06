/**
 * Layout keeps an internal ordered list of div names.
 * It creates a parent div to fill with these divs.
 * New divs are added according to the order of the names.
 * If the new div isn't in the list, then it is added at the end of the parent div.
 * @param {String[]} - Names in an ordered list for the layout.
 */
export default function Layout(order) {
    const self = this

    const divsByName = {}
    const extraDivs = []

    /**
     * Adds a new div with a name that should be in Layout's internal ordered list.
     * @param {String} name
     * @param {HTMLElement} div
     */
    self.newDiv = (name, div) => {
        if (order.includes(name)) {
            divsByName[name] = div
        } else {
            extraDivs.push(div)
        }
    }

    /**
     * When we're done adding new divs, we return a parent div.
     * @returns The parent div containing all other divs in order.
     */
    self.makeComponent = () => {
        const parent = document.createElement('div')
        order.forEach((name) => {
            const div = divsByName[name]
            if (div !== undefined) {
                parent.appendChild(div)
            }
        })
        extraDivs.forEach((div) => {
            parent.appendChild(div)
        })
        return parent
    }
}
