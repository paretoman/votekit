/** @module */

import Sim from '@paretoman/votekit-sim'
import View from '@paretoman/votekit-view'

/**
 * Set up a user interface to run a simulation.
 * @param {Object} config - An object containing commands. A command is a {name,value} pair.
 */
export default function sandbox(configURL, targetConfig, sandboxPath, comMessenger) {
    const sim = Sim(comMessenger)

    const view = View(sim, sandboxPath)
    const { div, load } = view

    load(configURL, targetConfig)

    return div
}
