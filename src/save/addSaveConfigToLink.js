/** @module */

import getLink from './getLink.js'

/**
 * Add buttons for saving the configuration to a link.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addSaveConfigToLink(layout, commander, sandboxURL) {
    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Save Link'

    const button2 = document.createElement('button')
    button2.className = 'button2'
    button2.innerText = 'Copy Link to Clipboard'

    const text = document.createElement('textarea')

    button.onclick = () => {
        const config = commander.getConfig()
        const link = getLink(config, sandboxURL)
        text.value = link
    }
    button2.onclick = () => {
        const config = commander.getConfig()
        const link = getLink(config, sandboxURL)
        navigator.clipboard.writeText(link)
    }

    const clearDiv = document.createElement('div')

    const div = document.createElement('div')
    div.appendChild(button)
    div.appendChild(button2)
    div.appendChild(clearDiv)
    div.appendChild(text)

    layout.newElement('saveConfigToLink', div)
}