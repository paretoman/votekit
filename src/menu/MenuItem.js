/** @module */

import ButtonGroup from './ButtonGroup.js'

/**
 * Make a selection that determines a single property's value.
 * Defer handling dependent calculations to the next update step,
 * where we will look at a dependency tree to determine what else needs updating.
 * Functionality here is called from button presses.
 * Functionality here is also called from a command pattern (commander).
 * @param {Object.<string>} object
 * @param {(String|Number|Boolean)} object.prop - The property being selected in the menu.
 * @param {String} prop - Name of prop
 * @param {MenuItem~setProp} setProp - The action that is performed as part of onclick.
 * @param {String} label - The prompt presented to the user.
 * @param {Object[]} options - the list of options that the UI presents to the user.
 * @param {(String|Number|Boolean)} options[].value - Value to pass to setProp
 * @param {String[]} change - list of changes made when pressing a button.
 * @param {Changes} changes
 * @param {Commander} commander - Follows command pattern.
 */
// eslint-disable-next-line max-len
export default function MenuItem(object, prop, setProp, label, options, change, changes, commander) {
    const self = this
    self.list = options
    self.onChoose = function (data) {
        commander.do(prop, data.value)
    }
    self.action = (value) => {
        self.set(value)
        self.select()
    }
    commander.addAction(prop, self.action, object[prop])
    self.set = function (value) {
        // LOAD INPUT

        setProp(value)
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

function bw(x) { return (220 - 4 * (x - 1)) / x - 2 }
