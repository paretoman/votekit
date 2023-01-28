/** @module */

import getLink from './getLink.js'
import TextArea from './TextArea.js'

/**
 * Add buttons for saving the configuration to a link.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addSaveConfigToLink(layout, commander, sandboxPath, nameInput) {
    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Save Long Link'

    const button2 = document.createElement('button')
    button2.className = 'button2'
    button2.innerText = 'Copy'

    const text = new TextArea()
    text.hide()

    button.onclick = () => {
        text.show()
        const config = commander.getConfig()
        const link = getLink(config, sandboxPath, nameInput)
        text.setText(link)
    }
    button2.onclick = () => {
        button.onclick()
        navigator.clipboard.writeText(text.value)
    }

    const clearDiv = document.createElement('div')

    const div = document.createElement('div')
    div.appendChild(button)
    div.appendChild(button2)
    div.appendChild(clearDiv)
    div.appendChild(text.div)

    layout.newElement('saveConfigToLink', div)
}
