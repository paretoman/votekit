/** @module */

import { orderedJsonStringify } from '../utilities/jsHelpers.js'
import DownloadLink from './DownloadLink.js'

/**
 * Add buttons for saving the configuration to a textbox.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addSaveConfigToText(layout, commander) {
    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Save Config To Text'

    const button2 = document.createElement('button')
    button2.className = 'button2'
    button2.innerText = 'Download Config Json'

    const dLink = new DownloadLink('config.json')
    dLink.hide()

    const text = document.createElement('textarea')

    button.onclick = () => {
        const config = commander.getConfig()
        text.value = orderedJsonStringify(config)
    }

    button2.onclick = () => {
        button.onclick()
        const url = `data:text/json;charset=utf-8,${encodeURIComponent(text.value)}`
        dLink.setUrl(url)
        dLink.show()
    }

    const clearDiv = document.createElement('div')

    const div = document.createElement('div')
    div.appendChild(button)
    div.appendChild(button2)
    div.appendChild(dLink.div)
    div.appendChild(clearDiv)
    div.appendChild(text)

    layout.newElement('saveConfigToText', div)
}
