/** @module */

import MenuItem from './MenuItem.js'

/**
 * Make a menu.
 * @param {Changes} changes
 * @param {Layout} layout
 */
export default function Menu(changes, layout) {
    const self = this
    self.divMenu = document.createElement('div')
    layout.newDiv('menu', self.divMenu)
    self.addMenuItem = function (object, choice) {
        const {
            prop, setProp, label, options, change,
        } = choice

        const menuItem = new MenuItem(object, prop, setProp, label, options, change, changes)
        menuItem.select()

        self.divMenu.appendChild(menuItem.choose.dom)
    }
}
