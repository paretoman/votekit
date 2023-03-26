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
 * @constructor
 */
// eslint-disable-next-line max-len
export default function MenuItem(pub, changes, choice) {
    const {
        label, options, changeList, getValue, onChoose, explain, checkShow,
    } = choice

    const self = this
    pub.attach(self)

    self.choose = new ButtonGroup({
        label,
        explain,
        width: buttonWidth(3),
        data: options,
        onChoose,
        // TODO: maybe do self.select here in onChoose rather than in update.
    })
    self.update = () => {
        if (changes.check(changeList)) {
            self.select()
        }
        if (checkShow !== undefined) {
            const show = checkShow()
            if (show) {
                self.choose.dom.hidden = false
            } else {
                self.choose.dom.hidden = true
            }
        }
    }
    self.select = function () {
        self.choose.highlight('value', getValue())
    }
}

export function buttonWidth(numButtons) {
    const padding = 4
    const border = 1
    const margin = 4
    const between = (padding + border + margin) * 2
    const end = padding + border
    const width = 302
    const usableSpace = width - between * (numButtons - 1) - 2 * end
    const buttonWidth1 = usableSpace / numButtons
    return buttonWidth1
}
