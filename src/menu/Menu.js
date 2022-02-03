/** @module */

import MenuItem from './MenuItem.js'

/**
 * Make a menu.
 * @param {String} id - must be an element's id
 * @param {Changes} changes
 */
export default function Menu(id, changes) {
    const self = this

    // find id in divs
    const div = document.getElementById(id)
    const parent = div.parentElement

    self.addMenuItem = function (object, choice) {
        const {
            prop, setProp, label, options, change,
        } = choice

        const menuItem = new MenuItem(object, prop, setProp, label, options, change, changes)
        menuItem.select()

        parent.appendChild(menuItem.choose.dom)
    }
}
