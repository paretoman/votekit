/** @module */

import SquareGraphic from './SquareGraphic.js'
import { drawStrokedColor, textPercent } from '../utilities/graphicsUtilities.js'
import tooltipForEntity from '../sim/tooltipForEntity.js'

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
 * @param {Boolean} doLoad - Should we add the candidateDistribution without adding to the history?
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
        // set current value because we need to be able to undo by returning to these values
        // candidateCommander.setESenderForList.setCurrentValue(id, 0)
        // candidateCommander.setXYSenderForList.setCurrentValue(id, { x, y })

        const shape2p = { x: shape2.x, y: shape2.y }

        const commands = [
            // candidateCommander.setNumberCandidatesSender.command(id + 1),
            candidateCommander.setESenderForList.command(id, 1, 0), // set alive flag
            candidateCommander.setP2SenderForList.command(id, shape2p, shape2p),
            candidateCommander.setP1SenderForList.command(id, shape1.x, shape1.x),
            candidateCommander.setColorSenderForList.command(id, color, color), // set alive flag
        ]
        // Either load the commands because we don't want to create an item of history
        // Or do the commands because want to store an item in history, so that we can undo.
        if (doLoad) {
            commander.loadCommands(commands)
        } else {
            commander.doCommands(commands)
        }
    }
    self.setEAction = (e) => {
        self.exists = e
        changes.add(['draggables'])
    }
    self.setE = (e) => {
        const cur = candidateCommander.setESenderForList.getCurrentValue(id)
        candidateCommander.setESenderForList.go(id, e, cur)
    }

    self.setP2Action = (p) => {
        self.shape2.x = p.x
        self.shape2.y = p.y
        if (sim.election.dimensions === 2) {
            self.x = p.x
            self.y = p.y
        }
        changes.add(['draggables'])
    }
    self.setP1Action = (p) => {
        self.shape1.x = p
        if (sim.election.dimensions === 1) {
            self.x = p
            self.y = 250
        }
        changes.add(['draggables'])
    }
    self.setXY = (p) => {
        if (sim.election.dimensions === 1) {
            const cur = candidateCommander.setP1SenderForList.getCurrentValue(id)
            candidateCommander.setP1SenderForList.go(id, p.x, cur)
        } else {
            const cur = candidateCommander.setP2SenderForList.getCurrentValue(id)
            candidateCommander.setP2SenderForList.go(id, p, cur)
        }
    }
    /** Do this when entering a state because x and y change.
     *  Maybe x and y should be in the SimCandidate instead... just speculating. */
    self.updateXY = () => {
        if (sim.election.dimensions === 1) {
            self.setP1Action(self.shape1.x)
        } else {
            self.setP2Action({ x: self.shape2.x, y: self.shape2.y })
        }
    }

    self.setColorAction = (newColor) => {
        self.color = newColor
        changes.add(['color'])
    }
    self.setColor = (e) => {
        const cur = candidateCommander.setColorSenderForList.getCurrentValue(id)
        candidateCommander.setColorSenderForList.go(id, e, cur)
    }

    self.instantiate()

    // Click Handler

    self.click = () => {
        tooltipForEntity(self, screen, sim)
    }

    // Rendering

    const square = new SquareGraphic(self, wHandle, hHandle, screen)
    self.square = square

    self.fraction = 0
    self.setFraction = function (fraction) {
        self.fraction = fraction
    }

    self.setWins = (wins) => {
        self.wins = wins
    }

    self.renderForeground = function () {
        square.render()

        // show minimal graphics when rendering as a ghost.
        if (self.exists === 0) return

        drawStrokedColor(textPercent(self.fraction), self.x, self.y - square.h * 0.5 - 2, 20, 2, '#222', 1, screen.fctx)

        if (self.wins !== undefined) {
            drawStrokedColor(self.wins, self.x, self.y + square.h * 0.5 + 20 + 2, 20, 2, '#222', 1, screen.fctx)
        }
    }
}
