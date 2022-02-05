/** @module */

import MenuItem from './MenuItem.js'

/**
 * Make a menu.
 * @param {Changes} changes
 */
export default function Menu(changes) {
    const self = this

    self.divMenu = document.createElement('div')
    self.addMenuItem = function (object, choice) {
        const {
            prop, setProp, label, options, change,
        } = choice

        const menuItem = new MenuItem(object, prop, setProp, label, options, change, changes)
        menuItem.select()

        self.divMenu.appendChild(menuItem.choose.dom)
    }
}
