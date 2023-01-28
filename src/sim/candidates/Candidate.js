/** @module */

import { toRGBA } from '../../lib/colorBlendScript.js'

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

    self.shape1 = {}
    self.shape2 = {}

    const id = candidateRegistrar.new(self)

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
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

    self.setAction = {}
    self.setCommand = {}

    self.setAction.exists = (e) => {
        self.exists = e
        changes.add(['draggables'])
    }
    self.setCommand.exists = (e) => {
        const cur = candidateCommander.exists.getCurrentValue(id)
        candidateCommander.exists.go(id, e, cur)
    }

    self.setAction.shape2p = (p) => {
        self.shape2.x = p.x
        self.shape2.y = p.y
        changes.add(['draggables'])
    }
    self.setAction.shape1x = (p) => {
        self.shape1.x = p
        changes.add(['draggables'])
    }
    self.setCommand.shape1x = (p) => {
        const cur = candidateCommander.shape1x.getCurrentValue(id)
        candidateCommander.shape1x.go(id, p.x, cur)
    }
    self.setCommand.shape2p = (p) => {
        const cur = candidateCommander.shape2p.getCurrentValue(id)
        candidateCommander.shape2p.go(id, p, cur)
    }

    self.setAction.color = (newColor) => {
        self.color = newColor
        self.colorRGBA = toRGBA(newColor)
        changes.add(['color'])
    }
    self.setCommand.color = (e) => {
        const cur = candidateCommander.color.getCurrentValue(id)
        candidateCommander.color.go(id, e, cur)
    }

    self.setAction.party = (newParty) => {
        self.party = newParty
        changes.add(['party'])
    }
    self.setCommand.party = (e) => {
        const cur = candidateCommander.party.getCurrentValue(id)
        candidateCommander.party.go(id, e, cur)
    }

    self.instantiate()
}
