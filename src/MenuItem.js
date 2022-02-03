/** @module */

import ButtonGroup from './ButtonGroup.js'

/**
 * Make a selection that determines a single property's value.
 * Defer handling dependent calculations to the next update step,
 * where we will look at a dependency tree to determine what else needs updating.
 * @param {Object.<string>} object
 * @param {(String|Number|Boolean)} object.prop - The property being selected in the menu.
 * @param {String} prop - Name of prop
 * @param {MenuItem~setProp} setProp - The action that is performed as part of onclick.
 * @param {String} label - The prompt presented to the user.
 * @param {Object[]} options - the list of options that the UI presents to the user.
 * @param {(String|Number|Boolean)} options[].value - Value to pass to setProp
 * @param {String[]} change - list of changes made when pressing a button.
 * @param {Changes} changes
 */
export default function MenuItem(object, prop, setProp, label, options, change, changes) {
    const self = this
    self.list = options
    self.onChoose = function (data) {
        // LOAD INPUT

        setProp(data.value)
        // CONFIGURE
        self.configure()
        // UPDATE
        changes.add(change)
    }
    self.choose = new ButtonGroup({
        label,
        width: bw(2),
        data: self.list,
        onChoose: self.onChoose,
    })
    self.configure = function () {
    }
    self.select = function () {
        self.choose.highlight('value', object[prop])
    }
}

/**
 * Called in onclick.
 * @callback MenuItem~setProp
 * @param {(String|Number|Boolean)} value
 */

function bw(x) { return (220 - 4 * (x - 1)) / x - 2 }
