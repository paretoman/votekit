/** @module */

import { orderedJsonStringify } from '../../utilities/jsHelpers.js'
import DownloadLink from './DownloadLink.js'
import TextArea from './TextArea.js'

/**
 * Add buttons for saving the configuration to a textbox.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addSaveConfigToText(layout, commander, nameInput) {
    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Show Config'

    const button2 = document.createElement('button')
    button2.className = 'button2'
    button2.innerText = 'Download Config'

    const dLink = new DownloadLink()
    dLink.setFileName('config.json')
    dLink.hide()

    const text = new TextArea()
    text.hide()

    button.onclick = () => {
        text.show()
        const config = commander.getConfig()
        const jsonText = orderedJsonStringify(config)
        text.setText(jsonText)
    }

    button2.onclick = () => {
        button.onclick()
        const url = `data:text/json;charset=utf-8,${encodeURIComponent(text.value)}`
        dLink.setUrl(url)
        const name = nameInput.value
        if (name !== '') dLink.setFileName(`${name}.json`)
        dLink.show()
    }

    const clearDiv = document.createElement('div')

    const div = document.createElement('div')
    div.appendChild(button)
    div.appendChild(button2)
    div.appendChild(dLink.div)
    div.appendChild(clearDiv)
    div.appendChild(text.div)

    layout.newElement('saveConfigToText', div)
}
