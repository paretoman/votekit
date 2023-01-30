/** @module */

import Button from './Button.js'

/**
 * Create a group of buttons.
 * @param {*} config
 * @constructor
 */
export default function ButtonGroup(config) {
    const self = this
    self.config = config

    // check if there is a function to make the data
    // this function can be used later to update the buttons
    if (config.data === undefined) {
        config.data = []
        if (config.makeData === undefined) {
            config.makeData = () => []
        }
        self.makeData = config.makeData
        self.buttonConfigs = self.makeData()
        self.doMakeData = true
    }
    self.buttonConfigs = config.data

    self.labelName = config.label
    self.labelIsHTML = config.labelIsHTML || false

    self.onChoose = config.onChoose
    self.isCheckbox = config.isCheckbox || false
    self.isCheckboxBool = config.isCheckboxBool || false
    self.justButton = config.justButton || false
    self.buttonHidden = config.buttonHidden || {}

    // DOM!
    self.dom = document.createElement('div')
    self.dom.setAttribute('class', 'button-group')

    self.buttonDOMByValue = []

    self.init = function () {
        if (self.doMakeData) self.buttonConfigs = self.makeData()

        // clear
        self.dom.innerHTML = ''
        self.buttons = []
        self.buttonsByName = {}

        // Label!
        self.labelDOM = document.createElement('div')
        self.labelDOM.setAttribute('class', 'button-group-label')
        self.labelDOM.setAttribute('title', config.explain || '')

        self.labelTip = document.createElement('div')
        self.labelTip.setAttribute('class', 'label-tip')
        self.labelTip.innerText = config.explain || ''
        let labelToggle = true
        self.labelTip.hidden = labelToggle
        self.labelDOM.onclick = () => {
            labelToggle = !labelToggle
            if (config.explain === undefined) labelToggle = true
            self.labelTip.hidden = labelToggle
        }
        self.dom.appendChild(self.labelDOM)
        self.dom.appendChild(self.labelTip)

        self.draw()

        self.buttonContainer = document.createElement('div')
        self.buttonContainer.setAttribute('class', 'button-group-button-container')
        self.dom.appendChild(self.buttonContainer)

        // Create & place buttons!
        for (let i = 0; i < self.buttonConfigs.length; i++) {
            const conf = self.buttonConfigs[i]
            const button = new Button(conf, self.onToggle)
            self.buttonsByName[conf.name] = button
            button.dom.style.width = `${config.width}px` // whatever
            if (conf.width) button.dom.style.width = `${conf.width}px` // whatever
            self.buttons.push(button)
            self.buttonContainer.appendChild(button.dom)
            self.buttonDOMByValue[conf.value] = button.dom
        }

        // And then select the one that says "selected"! Fake a click.
        for (let i = 0; i < self.buttons.length; i++) {
            const button = self.buttons[i]
            if (button.config.selected) {
                button.turnOn()
                break
            }
        }
        self.draw()
    }
    self.updateNames = function () {
        const data2 = self.makeData()
        for (let i = 0; i < self.buttonConfigs.length; i++) {
            self.buttonConfigs[i].name = data2[i].name
            self.buttons[i].name = self.buttonConfigs[i].name
        }
    }
    self.redraw = function () {
        self.updateNames()
        self.draw()
    }
    self.draw = function () {
        if (self.labelIsHTML) {
            self.labelDOM.innerHTML = self.labelName
        } else {
            self.labelDOM.innerText = self.labelName
        }
        for (const button of self.buttons) {
            button.draw()
        }
    }

    self.configureHidden = function () {
        for (const [buttonName, hidden] of Object.entries(self.buttonHidden)) {
            self.buttonsByName[buttonName].dom.hidden = hidden
        }
    }

    // Toggle buttons
    self.onToggle = function (button, buttonData) {
        if (self.isCheckbox || self.isCheckboxBool) {
            if (button.isOn) {
                button.turnOff()
            } else {
                button.turnOn()
            }
        } else { // justButton means it doesn't get selected
            // Turn all off
            for (let i = 0; i < self.buttons.length; i++) self.buttons[i].turnOff()
            button.turnOn() // except one
            if (self.justButton) {
                // turn on for a little while, then off
                setTimeout(() => button.turnOff(), 800)
            }
        }
        // And send the data up
        self.onChoose(buttonData)
    }

    // Highlight based on data...
    self.highlight = function (propName, propValue) {
        // if we haven't set up the buttons yet, then don't do anything yet
        if (self.buttons.length === 0) return

        // Turn all off
        for (let i = 0; i < self.buttons.length; i++) self.buttons[i].turnOff()

        if (self.isCheckbox) {
            for (const ibu in self.buttons) {
                const bu = self.buttons[ibu]
                if (propValue.includes(bu.config[propName])) { // the propValue is an array of values
                    bu.turnOn()
                }
            }
        } else if (self.isCheckboxBool) {
            for (const ibu in self.buttons) {
                const bu = self.buttons[ibu]
                const buttonName = bu.config[propName]
                // if (Object.keys(propValue).includes(buttonName)) { // the propValue is an array of values
                if (buttonName in propValue) {
                    if (propValue[buttonName]) {
                        bu.turnOn()
                    }
                }
            }
        } else {
            // Find the one...
            const theButton = self.buttons.filter((button) => {
                const { config } = button
                return (config[propName] === propValue)
            })[0]
            if (theButton !== undefined) {
                theButton.turnOn()
            }
        }
    }

    self.init()
}
