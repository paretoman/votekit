/** @module */

import { orderedJsonStringify } from '../../utilities/jsHelpers.js'
import DownloadLink from './DownloadLink.js'

/**
 * Add buttons for saving the configuration to a textbox.
 * @param {Layout} layout
 */
export default function addSaveData(layout, nameInput, viewDownload) {
    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Save Data To Text'

    const button2 = document.createElement('button')
    button2.className = 'button2'
    button2.innerText = 'Download Data Json'

    const dLink = new DownloadLink()
    dLink.setFileName('data.json')
    dLink.hide()

    const text = document.createElement('textarea')

    button.onclick = () => {
        const { dataStore } = viewDownload
        text.value = orderedJsonStringify(dataStore)
    }

    button2.onclick = () => {
        button.onclick()
        const url = `data:text/json;charset=utf-8,${encodeURIComponent(text.value)}`
        dLink.setUrl(url)
        const name = nameInput.value
        if (name !== '') dLink.setFileName(`${name}_data.json`)
        dLink.show()
    }

    const clearDiv = document.createElement('div')

    const div = document.createElement('div')
    div.appendChild(button)
    div.appendChild(button2)
    div.appendChild(dLink.div)
    div.appendChild(clearDiv)
    div.appendChild(text)

    layout.newElement('saveData', div)
}
