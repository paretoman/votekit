/** @module */

import checkURL from '../command/checkURL.js'
import ComMessenger from '../command/ComMessenger.js'
import sandbox from './sandbox.js'

/** Find all the divs of class "sandbox".
 * Add the sandbox as a neighbor under the same parent. */
const targets = Array.from(document.getElementsByClassName('sandbox'))
targets.forEach((target) => {
    const hasConfig = target.dataset.config !== undefined
    const targetConfig = (hasConfig) ? JSON.parse(target.dataset.config) : {}
    const cu = checkURL()
    const config = (cu.yes) ? cu.config : targetConfig

    const hasSandboxURL = target.dataset.sandboxurl !== undefined
    const sandboxURL = hasSandboxURL ? target.dataset.sandboxurl : ''

    const comMessenger = new ComMessenger()
    const div = sandbox(config, comMessenger, sandboxURL)
    const parent = target.parentNode
    parent.appendChild(div)
})
