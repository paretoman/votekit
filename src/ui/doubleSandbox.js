/** @module */

import ComMessenger from '../aSim/command/ComMessenger.js'
import sandbox from './sandbox.js'

/**
 * Makes Two sandboxes and links their commands together.
 * @param {Object} config - To pass to commander to set the initial configuration of the sim.
 * @param {String} sandboxPath - String to add to the current url directory to get to the sandbox.
 * @returns {HTMLElement} - div containing the two sandboxes.
 */
export default function doubleSandbox(targetConfig, sandboxPath) {
    const comMessenger = new ComMessenger()

    const divLink = document.createElement('button')
    divLink.className = 'button2'
    divLink.innerText = 'linked'
    divLink.style['vertical-align'] = 'middle'
    divLink.style['min-width'] = '70px'
    divLink.style.margin = '5px'
    const toggle = () => {
        if (divLink.innerText === 'linked') {
            divLink.innerText = 'unlinked'
            comMessenger.setLinked(false)
        } else {
            divLink.innerText = 'linked'
            comMessenger.setLinked(true)
        }
    }
    divLink.onclick = toggle

    const configURL = window.location
    const div1 = sandbox(configURL, targetConfig, sandboxPath, comMessenger)
    const div2 = sandbox(configURL, targetConfig, sandboxPath, comMessenger)
    div1.style.display = 'inline-block'
    div2.style.display = 'inline-block'

    div1.style['vertical-align'] = 'top'
    div2.style['vertical-align'] = 'top'

    const div = document.createElement('div')
    div.appendChild(div1)
    div.appendChild(divLink)
    div.appendChild(div2)
    return div
}
