/** @module */

import SquareGraphic from './SquareGraphic.js'
import { drawStrokedColor, textPercent } from './graphicsUtilities.js'

/**
 * Candidate class on top of handle.
 * Candidate adds candidate behavior on top of a draggable handle handle.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @param {String} color
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Candidates} candidates
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
    dragm,
    candidates,
    commander,
    changes,
    doLoad,
) {
    const self = this

    const id = candidates.newCandidate(self)

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        const commands = [
            self.setECommand(1), // set alive flag
            self.setXYCommand({ x, y }),
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
    /**
     * The action that will be carried out by the entity-setECommand command.
     * @param {Boolean} e - Does the entity exist? Alternatively, it has been deleted.
     */
    self.setEAction = (e) => {
        self.exists = e
        changes.add(['draggables'])
    }
    self.commandNameE = `${prefix}-${id}-setE`
    // the 0 here means we didn't exist before now
    commander.addAction(self.commandNameE, self.setEAction, 0)
    self.setECommand = (e) => ({ name: self.commandNameE, value: e })
    self.setE = (e) => {
        commander.do(self.setECommand(e))
    }

    /**
     * The action that will be carried out by the entity-setXY command.
     * @param {Object} p - A point: has properties x and y.
     */
    self.setXYAction = (p) => {
        self.x = p.x
        self.y = p.y
        changes.add(['draggables'])
    }
    self.commandNameXY = `${prefix}-${id}-setXY`
    commander.addAction(self.commandNameXY, self.setXYAction, { x, y })
    self.setXYCommand = (p) => ({ name: self.commandNameXY, value: p, props: { isSetXY: true } })
    self.setXY = (p) => {
        commander.do(self.setXYCommand(p))
    }

    self.instantiate()

    const square = new SquareGraphic(self, w, h, color, screen) // square is for rendering
    self.square = square

    dragm.newSquareHandle(self, square)

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
