/** @module */

import SquareGraphic from './SquareGraphic.js'
import { drawStrokedColor, textPercent } from '../utilities/graphicsUtilities.js'

/**
 * Candidate class on top of handle.
 * Candidate adds candidate behavior on top of a draggable handle handle.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @param {String} color
 * @param {Screen} screen
 * @param {Registrar} candidateRegistrar
 * @param {Commander} commander
 * @param {Changes} changes
 * @param {Boolean} doLoad - Should we add the candidateDistribution without adding to the history?
 * @constructor
 */
export default function Candidate(
    x,
    y,
    w,
    h,
    color,
    screen,
    candidateRegistrar,
    commander,
    changes,
    doLoad,
    candidateCommander,
) {
    const self = this

    const id = candidateRegistrar.new(self)

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        // set current value because we need to be able to undo by returning to these values
        // candidateCommander.setEClientList.setCurrentValue(id, 0)
        // candidateCommander.setXYClientList.setCurrentValue(id, { x, y })

        const commands = [
            // candidateCommander.setNumberCandidatesClient.command(id + 1),
            candidateCommander.setEClientList.command(id, 1, 0), // set alive flag
            candidateCommander.setXYClientList.command(id, { x, y }, { x, y }),
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
        const cur = candidateCommander.setEClientList.getCurrentValue(id)
        candidateCommander.setEClientList.go(id, e, cur)
    }

    self.setXYAction = (p) => {
        self.x = p.x
        self.y = p.y
        changes.add(['draggables'])
    }
    self.setXY = (p) => {
        const cur = candidateCommander.setXYClientList.getCurrentValue(id)
        candidateCommander.setXYClientList.go(id, p, cur)
    }

    self.instantiate()

    const square = new SquareGraphic(self, w, h, color, screen) // square is for rendering
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

        drawStrokedColor(textPercent(self.fraction), self.x, self.y - square.h * 0.5 - 2, 20, 2, '#222', screen.fctx)

        if (self.wins !== undefined) {
            drawStrokedColor(self.wins, self.x, self.y + square.h * 0.5 + 20 + 2, 20, 2, '#222', screen.fctx)
        }
    }
}
