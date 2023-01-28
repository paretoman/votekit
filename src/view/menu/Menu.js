/** @module */

import MenuItem from './MenuItem.js'

/**
 * Make a menu.
 * @param {Changes} changes
 * @param {Layout} layout
 * @constructor
 */
export default function Menu(pub, changes, layout) {
    const self = this
    self.divMenu = document.createElement('div')
    layout.newElement('menu', self.divMenu)
    self.addMenuItem = function (choice) {
        // eslint-disable-next-line max-len
        const menuItem = new MenuItem(pub, changes, choice)
        menuItem.select()

        self.divMenu.appendChild(menuItem.choose.dom)
    }
}
