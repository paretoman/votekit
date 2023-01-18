/** @module */

import MenuItem from './MenuItem.js'

/**
 * Make a menu.
 * @param {Changes} changes
 * @param {Layout} layout
 * @param {Commander} commander - Follows command pattern.
 * @constructor
 */
export default function Menu(changes, layout, commander) {
    const self = this
    self.divMenu = document.createElement('div')
    layout.newElement('menu', self.divMenu)
    self.addMenuItem = function (object, choice) {
        const {
            prop, setProp, label, options, change,
        } = choice

        // eslint-disable-next-line max-len
        const menuItem = new MenuItem(object, prop, setProp, label, options, change, changes, commander)
        menuItem.select()

        self.divMenu.appendChild(menuItem.choose.dom)
    }
}
