/** @module */

import SquareGraphic from './SquareGraphic.js'

/**
 * This represents a spatial distribution of candidates.
 * A draggable handle handle provides draggable behavior.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} r
 * @param {Screen} screen
 * @param {Registrar} candidateDnRegistrar
 * @param {Commander} commander
 * @param {Changes} changes
 * @param {Boolean} doLoad - Should we add the candidateDistribution without adding to the history?
 * @constructor
 */
export default function CandidateDistribution(
    x,
    y,
    r,
    screen,
    candidateDnRegistrar,
    commander,
    changes,
    doLoad,
    candidateDnCommander,
) {
    const self = this

    const id = candidateDnRegistrar.new(self)

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        // candidateDnCommander.setESenderForList.setCurrentValue(id, 0)
        // candidateDnCommander.setXYSenderForList.setCurrentValue(id, { x, y })
        // candidateDnCommander.setRSenderForList.setCurrentValue(id, r)
        const commands = [
            candidateDnCommander.setESenderForList.command(id, 1, 0), // set alive flag
            candidateDnCommander.setXYSenderForList.command(id, { x, y }, { x, y }),
            candidateDnCommander.setRSenderForList.command(id, r, r),
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
        const cur = candidateDnCommander.setESenderForList.getCurrentValue(id)
        candidateDnCommander.setESenderForList.go(id, e, cur)
    }

    self.setXYAction = (p) => {
        self.x = p.x
        self.y = p.y
        changes.add(['draggables'])
    }
    self.setXY = (p) => {
        const cur = candidateDnCommander.setXYSenderForList.getCurrentValue(id)
        candidateDnCommander.setXYSenderForList.go(id, p, cur)
    }

    self.setRAction = (newR) => {
        self.r = newR
        changes.add(['radius'])
    }
    self.setR = (newR) => {
        const cur = candidateDnCommander.setRSenderForList.getCurrentValue(id)
        candidateDnCommander.setRSenderForList.go(id, newR, cur)
    }

    self.instantiate()

    const square = new SquareGraphic(self, 21, 21, '#ccc', screen) // square is for rendering
    self.square = square

    self.render = function () {
        const { ctx } = screen

        ctx.beginPath()
        // ctx.fillStyle = "grey"
        ctx.arc(self.x, self.y, self.r, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
    }
    self.renderForeground = () => {
        square.render()
    }
}
