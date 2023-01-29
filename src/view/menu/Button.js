/** @module */

/**
 * Class for a single button.
 * @param {*} buttonConfig
 * @param {*} onChoose
 * @constructor
 */
export default function Button(buttonConfig, onChoose) {
    const self = this

    self.config = buttonConfig
    self.name = buttonConfig.name
    self.nameIsHTML = buttonConfig.nameIsHTML || false
    self.dom = document.createElement('div')
    self.dom.setAttribute('class', 'button button2')

    // overwrite margins.  The old way was not working.
    let fixMargin = buttonConfig.margin
    fixMargin = fixMargin || 0
    fixMargin = Math.max(fixMargin, 4)
    self.dom.style.marginRight = `${fixMargin}px`

    // Click!
    self.draw = function () {
        if (self.nameIsHTML) {
            self.dom.innerHTML = self.name
        } else {
            self.dom.innerText = self.name
        }
    }
    self.draw()
    self.dom.setAttribute('title', buttonConfig.explain || '')
    self.onClick = function () {
        onChoose(self, buttonConfig)
    }
    self.dom.onclick = self.onClick
    // Turn on or off!
    self.turnOff = function () {
        self.isOn = false
        self.config.isOn = false
        self.dom.setAttribute('on', 'no')
    }
    self.turnOn = function () {
        self.isOn = true
        self.config.isOn = true
        self.dom.setAttribute('on', 'yes')
    }
    self.turnOff()
}
