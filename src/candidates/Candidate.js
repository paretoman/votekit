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
) {
    const self = this

    const id = candidateRegistrar.new()

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        const commands = [
            self.setEClient.command(1), // set alive flag
            self.setXYClient.command({ x, y }),
        ]
        // Either load the commands because we don't want to create an item of history
        // Or do the commands because want to store an item in history, so that we can undo.
        if (doLoad) {
            commander.loadCommands(commands)
        } else {
            commander.doCommands(commands)
        }
    }

    const prefix = 'candidate'

    self.setEClient = commander.addClient({
        action: (e) => {
            self.exists = e
            changes.add(['draggables'])
        },
        currentValue: 0,
        name: `${prefix}-${id}-setE`,
    })
    self.setE = self.setEClient.go

    self.setXYClient = commander.addClient({
        action: (p) => {
            self.x = p.x
            self.y = p.y
            changes.add(['draggables'])
        },
        currentValue: { x, y },
        name: `${prefix}-${id}-setXY`,
        props: { isSetXY: true },
    })
    self.setXY = self.setXYClient.go

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
