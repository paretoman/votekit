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
        // candidateDnCommander.setEClientList.setCurrentValue(id, 0)
        // candidateDnCommander.setXYClientList.setCurrentValue(id, { x, y })
        // candidateDnCommander.setRClientList.setCurrentValue(id, r)
        const commands = [
            candidateDnCommander.setEClientList.command(id, 1, 0), // set alive flag
            candidateDnCommander.setXYClientList.command(id, { x, y }, { x, y }),
            candidateDnCommander.setRClientList.command(id, r, r),
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
        const cur = candidateDnCommander.setEClientList.getCurrentValue(id)
        candidateDnCommander.setEClientList.go(id, e, cur)
    }

    self.setXYAction = (p) => {
        self.x = p.x
        self.y = p.y
        changes.add(['draggables'])
    }
    self.setXY = (p) => {
        const cur = candidateDnCommander.setXYClientList.getCurrentValue(id)
        candidateDnCommander.setXYClientList.go(id, p, cur)
    }

    self.setRAction = (newR) => {
        self.r = newR
        changes.add(['radius'])
    }
    self.setR = (newR) => {
        const cur = candidateDnCommander.setRClientList.getCurrentValue(id)
        candidateDnCommander.setRClientList.go(id, newR, cur)
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
