/** @module */

import publishShortLink from './publishShortLink.js'
import TextArea from './TextArea.js'

/**
 * Add buttons for saving the configuration to a link.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addSaveConfigToShortLink(layout, commander, sandboxPath, nameInput) {
    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Publish Short Link'

    const button2 = document.createElement('button')
    button2.className = 'button2'
    button2.innerText = 'Copy'

    const text = new TextArea()
    text.hide()

    const requesting = 'requesting short link...'

    button.onclick = () => {
        text.show()
        const config = commander.getConfig()
        text.setText(requesting)
        publishShortLink(config, sandboxPath, nameInput, (link) => {
            text.setText(link)
        })
    }
    button2.onclick = () => {
        text.show()
        const link = text.value
        if (link === '') {
            text.setText('Nothing Copied')
        } else {
            navigator.clipboard.writeText(link)
        }
    }

    const clearDiv = document.createElement('div')

    const div = document.createElement('div')
    div.appendChild(button)
    div.appendChild(button2)
    div.appendChild(clearDiv)
    div.appendChild(text.div)

    layout.newElement('saveConfigToShortLink', div)
}
