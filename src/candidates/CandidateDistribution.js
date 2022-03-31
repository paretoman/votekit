/** @module */

import tooltipForEntity from '../sim/tooltipForEntity.js'
import SquareGraphic from './SquareGraphic.js'

/**
 * This represents a spatial distribution of candidates.
 * A draggable handle handle provides draggable behavior.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w2
 * @param {Screen} screen
 * @param {Registrar} candidateDnRegistrar
 * @param {Commander} commander
 * @param {Changes} changes
 * @param {Boolean} doLoad - Should we add the candidateDistribution without adding to the history?
 * @constructor
 */
export default function CandidateDistribution(
    p2,
    p1,
    w2,
    screen,
    candidateDnRegistrar,
    commander,
    changes,
    doLoad,
    candidateDnCommander,
    sim,
) {
    const self = this

    const id = candidateDnRegistrar.new(self)

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        // candidateDnCommander.setESenderForList.setCurrentValue(id, 0)
        // candidateDnCommander.setXYSenderForList.setCurrentValue(id, { x, y })
        // candidateDnCommander.setWSenderForList.setCurrentValue(id, w2)
        const commands = [
            candidateDnCommander.setESenderForList.command(id, 1, 0), // set alive flag
            candidateDnCommander.setP2SenderForList.command(id, p2, p2),
            candidateDnCommander.setP1SenderForList.command(id, p1, p1),
            candidateDnCommander.setW2SenderForList.command(id, w2, w2),
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

    self.setP2Action = (p) => {
        self.p2 = structuredClone(p)
        if (sim.election.dimensions === 2) {
            self.x = p.x
            self.y = p.y
        }
        changes.add(['draggables'])
    }
    self.setP1Action = (p) => {
        self.p1 = p
        if (sim.election.dimensions === 1) {
            self.x = p
            self.y = 150
        }
        changes.add(['draggables'])
    }
    self.setXY = (p) => {
        if (sim.election.dimensions === 1) {
            const cur = candidateDnCommander.setP1SenderForList.getCurrentValue(id)
            candidateDnCommander.setP1SenderForList.go(id, p.x, cur)
        } else {
            const cur = candidateDnCommander.setP2SenderForList.getCurrentValue(id)
            candidateDnCommander.setP2SenderForList.go(id, p, cur)
        }
    }
    /** Do this when entering a state because x and y change.
     *  Maybe x and y should be in the SimCandidateDn instead... just speculating. */
    self.updateXY = () => {
        if (sim.election.dimensions === 1) {
            self.setP1Action(self.p1)
        } else {
            self.setP2Action(self.p2)
        }
    }

    self.setW2Action = (newW) => {
        self.w2 = newW
        changes.add(['width'])
    }
    self.setW2 = (newW) => {
        const cur = candidateDnCommander.setW2SenderForList.getCurrentValue(id)
        candidateDnCommander.setW2SenderForList.go(id, newW, cur)
    }

    self.instantiate()

    // Click Handler

    self.click = () => {
        tooltipForEntity(self, screen, sim)
    }

    // Rendering

    self.color = '#ccc'

    const square = new SquareGraphic(self, 21, 21, screen) // square is for rendering
    self.square = square

    self.render = function () {
        const { ctx } = screen

        ctx.beginPath()
        // ctx.fillStyle = "grey"
        ctx.arc(self.x, self.y, self.w2 * 0.5, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
    }
    self.renderForeground = () => {
        square.render()
    }
}
