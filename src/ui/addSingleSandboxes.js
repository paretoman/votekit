/** @module */

import sandbox from './sandbox.js'

/** Find all the divs of class "sandbox".
 * Add the sandbox as a neighbor under the same parent. */
export default function addSingleSandboxes() {
    const targets = Array.from(document.getElementsByClassName('sandbox'))
    targets.forEach((target) => {
        const hasConfig = target.dataset.config !== undefined
        const targetConfig = (hasConfig) ? JSON.parse(target.dataset.config) : {}

        const hasSandboxURL = target.dataset.sandboxurl !== undefined
        const sandboxURL = hasSandboxURL ? target.dataset.sandboxurl : ''

        const div = sandbox(targetConfig, sandboxURL)
        const parent = target.parentNode
        parent.appendChild(div)
    })
}
