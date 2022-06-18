/** @module */

import { toRGBA } from '../lib/colorBlendScript.js'
import tooltipForEntity from '../tooltips/tooltipForEntity.js'

/**
 * Candidate class on top of handle.
 * Candidate adds candidate behavior on top of a draggable handle handle.
 * @param {Object} shape2
 * @param {Object} shape1
 * @param {Number} wHandle
 * @param {Number} hHandle
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
    wHandle,
    hHandle,
    color,
    screen,
    candidateRegistrar,
    commander,
    changes,
    doLoad,
    candidateCommander,
    sim,
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
            candidateCommander.setForListSenders.exists.command(id, 1, 0), // set alive flag
            candidateCommander.setForListSenders.shape2p.command(id, shape2p, shape2p),
            candidateCommander.setForListSenders.shape1x.command(id, shape1.x, shape1.x),
            candidateCommander.setForListSenders.color.command(id, color, color), // set alive flag
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

    self.setAction.exists = (e) => {
        self.exists = e
        changes.add(['draggables'])
    }
    self.setE = (e) => {
        const cur = candidateCommander.setForListSenders.exists.getCurrentValue(id)
        candidateCommander.setForListSenders.exists.go(id, e, cur)
    }

    self.setAction.shape2p = (p) => {
        self.shape2.x = p.x
        self.shape2.y = p.y
        if (sim.election.dimensions === 2) {
            self.x = p.x
            self.y = p.y
        }
        changes.add(['draggables'])
    }
    self.setAction.shape1x = (p) => {
        self.shape1.x = p
        if (sim.election.dimensions === 1) {
            self.x = p
            self.y = 250
        }
        changes.add(['draggables'])
    }
    self.setXY = (p) => {
        if (sim.election.dimensions === 1) {
            const cur = candidateCommander.setForListSenders.shape1x.getCurrentValue(id)
            candidateCommander.setForListSenders.shape1x.go(id, p.x, cur)
        } else {
            const cur = candidateCommander.setForListSenders.shape2p.getCurrentValue(id)
            candidateCommander.setForListSenders.shape2p.go(id, p, cur)
        }
    }
    /** Do this when entering a state because x and y change.
     *  Maybe x and y should be in the CandidateSim instead... just speculating. */
    self.updateXY = () => {
        if (sim.election.dimensions === 1) {
            self.setAction.shape1x(self.shape1.x)
        } else {
            self.setAction.shape2p({ x: self.shape2.x, y: self.shape2.y })
        }
    }

    self.setAction.color = (newColor) => {
        self.color = newColor
        self.colorRGBA = toRGBA(newColor)
        changes.add(['color'])
    }
    self.setColor = (e) => {
        const cur = candidateCommander.setForListSenders.color.getCurrentValue(id)
        candidateCommander.setForListSenders.color.go(id, e, cur)
    }

    self.instantiate()

    // Click Handler

    self.click = () => {
        tooltipForEntity(self, screen, sim)
    }

    self.wHandle = wHandle
    self.hHandle = hHandle
}
