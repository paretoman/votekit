/** @module */

import { toRGBA } from '../../util/colorBlendScript.js'

/**
 * Candidate class on top of handle.
 * Candidate adds candidate behavior on top of a draggable handle handle.
 * @param {Object} shape2
 * @param {Object} shape1
 * @param {String} color
 * @param {Screen} screen
 * @param {Registrar} candidateRegistrar
 * @param {Commander} commander
 * @param {Changes} changes
 * @param {Boolean} doLoad - Should we add the candidateDn without adding to the history?
 * @constructor
 */
export default function Candidate(
    shape2,
    shape1,
    color,
    candidateRegistrar,
    commander,
    changes,
    doLoad,
    candidateCommander,
) {
    const self = this

    // State //

    self.shape1 = {}
    self.shape2 = {}

    self.setAction = {
        exists(e) {
            self.exists = e
            changes.add(['draggables'])
        },
        shape2p(p) {
            self.shape2.x = p.x
            self.shape2.y = p.y
            changes.add(['draggables'])
        },
        shape1x(x) {
            self.shape1.x = x
            changes.add(['draggables'])
        },
        color(newColor) {
            self.color = newColor
            self.colorRGBA = toRGBA(newColor)
            changes.add(['color'])
        },
        party(p) {
            self.party = p
            changes.add(['party'])
        },
    }

    // Make Commands //

    const id = candidateRegistrar.new(self)

    self.doSetCommand = {}
    const actionKeys = Object.keys(self.setAction)
    actionKeys.forEach((key) => {
        self.doSetCommand[key] = (e) => {
            const cur = candidateCommander[key].getCurrentValue(id)
            candidateCommander[key].go(id, e, cur)
        }
    })

    // Instantiate Variables //

    // use commands to instantiate variables
    const shape2p = { x: shape2.x, y: shape2.y }
    const commands = [
        candidateCommander.exists.command(id, 1, 0), // set alive flag
        candidateCommander.shape2p.command(id, shape2p, shape2p),
        candidateCommander.shape1x.command(id, shape1.x, shape1.x),
        candidateCommander.color.command(id, color, color),
        candidateCommander.party.command(id, [id], [id]),
    ]
    // Either load the commands because we don't want to create an item of history
    // Or do the commands because want to store an item in history, so that we can undo.
    if (doLoad) {
        commander.loadCommands(commands)
    } else {
        commander.doCommands(commands)
    }
}
