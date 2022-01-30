import MenuItem from './MenuItem.js'

export default function Menu(id, changes) {
    // Make a menu.
    // In order to make a
    const self = this

    // find id in divs
    const div = document.getElementById(id)
    const parent = div.parentElement

    self.addMenuItem = function (object, choice) {
        const { prop, options, change } = choice

        const menuItem = new MenuItem(object, prop, options, change, changes)
        menuItem.select()

        parent.appendChild(menuItem.choose.dom)
    }
}
