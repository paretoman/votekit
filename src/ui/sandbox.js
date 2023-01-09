/** @module */

import Sim from '../sim/Sim.js'
import View from '../view/View.js'

/**
 * Set up a user interface to run a simulation.
 * @param {Object} config - An object containing commands. A command is a {name,value} pair.
 */
export default function sandbox(config, comMessenger, sandboxURL) {
    const sim = Sim(comMessenger)

    const view = View(sim, sandboxURL)
    const { div } = view

    sim.init(config)

    return div
}
