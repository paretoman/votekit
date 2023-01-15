/** @module */

import publishShortLink from './publishShortLink.js'

/**
 * Add buttons for saving the configuration to a link.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addSaveConfigToShortLink(layout, commander, sandboxURL, nameInput) {
    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Publish Short Link'

    const button2 = document.createElement('button')
    button2.className = 'button2'
    button2.innerText = 'And Copy to Clipboard'

    const text = document.createElement('textarea')

    button.onclick = () => {
        const config = commander.getConfig()
        publishShortLink(config, sandboxURL, nameInput, (link) => {
            text.value = link
        })
    }
    button2.onclick = () => {
        const config = commander.getConfig()
        publishShortLink(config, sandboxURL, nameInput, (link) => {
            navigator.clipboard.writeText(link)
        })
    }

    const clearDiv = document.createElement('div')

    const div = document.createElement('div')
    div.appendChild(button)
    div.appendChild(button2)
    div.appendChild(clearDiv)
    div.appendChild(text)

    layout.newElement('saveConfigToShortLink', div)
}
