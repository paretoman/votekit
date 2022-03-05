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
) {
    const self = this

    const id = candidateDnRegistrar.new()

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        const commands = [
            self.setECommand(1), // set alive flag
            self.setXYCommand({ x, y }),
            self.setRCommand(r),
        ]
        // Either load the commands because we don't want to create an item of history
        // Or do the commands because want to store an item in history, so that we can undo.
        if (doLoad) {
            commander.loadCommands(commands)
        } else {
            commander.doCommands(commands)
        }
    }

    const prefix = 'candidateDistribution'
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

    /**
     * The action that will be carried out by the entity-setR command.
     * @param {Number} r - radius
     */
    self.setRAction = (newR) => {
        self.r = newR
        changes.add(['radius'])
    }
    self.commandNameR = `${prefix}-${id}-setR`
    commander.addAction(self.commandNameR, self.setRAction, r)
    self.setRCommand = (newR) => ({ name: self.commandNameR, value: newR })
    self.setR = (newR) => {
        commander.do(self.setRCommand(newR))
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
