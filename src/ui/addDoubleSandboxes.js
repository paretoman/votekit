/** @module */

import doubleSandbox from './doubleSandbox.js'

/** Find all the divs of class "double_sandbox".
 * Add the double_sandbox as a neighbor under the same parent. */
const targets = Array.from(document.getElementsByClassName('double_sandbox'))
targets.forEach((target) => {
    const hasConfig = target.dataset.config !== undefined
    const config = (hasConfig) ? JSON.parse(target.dataset.config) : {}

    const hasSandboxURL = target.dataset.sandboxurl !== undefined
    const sandboxURL = hasSandboxURL ? target.dataset.sandboxurl : ''

    const div = doubleSandbox(config, sandboxURL)
    const parent = target.parentNode
    parent.appendChild(div)
})
