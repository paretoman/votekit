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
            self.setEClient.command(1), // set alive flag
            self.setXYClient.command({ x, y }),
            self.setRClient.command(r),
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

    self.setRClient = commander.addClient({
        action: (newR) => {
            self.r = newR
            changes.add(['radius'])
        },
        currentValue: r,
        name: `${prefix}-${id}-setR`,
    })
    self.setR = self.setRClient.go

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
