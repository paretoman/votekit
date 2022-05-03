/** @module */

import tooltipForEntity from '../tooltips/tooltipForEntity.js'
import SquareGraphic from '../candidates/SquareGraphic.js'

/**
 * This represents a spatial distribution of candidates.
 * A draggable handle handle provides draggable behavior.
 * @param {Object} shape2
 * @param {Object} shape1
 * @param {Screen} screen
 * @param {Registrar} candidateDnRegistrar
 * @param {Commander} commander
 * @param {Changes} changes
 * @param {Boolean} doLoad - Should we add the candidateDn without adding to the history?
 * @constructor
 */
export default function CandidateDistribution(
    shape2,
    shape1,
    screen,
    candidateDnRegistrar,
    commander,
    changes,
    doLoad,
    candidateDnCommander,
    sim,
) {
    const self = this

    self.shape2 = {}
    self.shape1 = {}

    const id = candidateDnRegistrar.new(self)

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        const shape2p = { x: shape2.x, y: shape2.y }

        const commands = [
            candidateDnCommander.setForListSenders.exists.command(id, 1, 0), // set alive flag
            candidateDnCommander.setForListSenders.shape2p.command(id, shape2p, shape2p),
            candidateDnCommander.setForListSenders.shape1x.command(id, shape1.x, shape1.x),
            candidateDnCommander.setForListSenders.shape2w.command(id, shape2.w, shape2.w),
            candidateDnCommander.setForListSenders.shape1w.command(id, shape1.w, shape1.w),
            candidateDnCommander.setForListSenders.shape1densityProfile.command(
                id,
                shape1.densityProfile,
                shape1.densityProfile,
            ),
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
        const cur = candidateDnCommander.setForListSenders.exists.getCurrentValue(id)
        candidateDnCommander.setForListSenders.exists.go(id, e, cur)
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
            const cur = candidateDnCommander.setForListSenders.shape1x.getCurrentValue(id)
            candidateDnCommander.setForListSenders.shape1x.go(id, p.x, cur)
        } else {
            const cur = candidateDnCommander.setForListSenders.shape2p.getCurrentValue(id)
            candidateDnCommander.setForListSenders.shape2p.go(id, p, cur)
        }
    }
    /** Do this when entering a state because x and y change.
     *  Maybe x and y should be in the SimCandidateDn instead... just speculating. */
    self.updateXY = () => {
        if (sim.election.dimensions === 1) {
            self.setAction.shape1x(self.shape1.x)
        } else {
            self.setAction.shape2p({ x: self.shape2.x, y: self.shape2.y })
        }
    }

    self.setAction.shape2w = (newW) => {
        self.shape2.w = newW
        changes.add(['width'])
    }
    self.setW2 = (newW) => {
        const cur = candidateDnCommander.setForListSenders.shape2w.getCurrentValue(id)
        candidateDnCommander.setForListSenders.shape2w.go(id, newW, cur)
    }

    self.setAction.shape1w = (newW) => {
        self.shape1.w = newW
        changes.add(['width'])
    }
    self.setW1 = (newW) => {
        const cur = candidateDnCommander.setForListSenders.shape1w.getCurrentValue(id)
        candidateDnCommander.setForListSenders.shape1w.go(id, newW, cur)
    }

    /** Density Profile can be "gaussian" or "step" */
    self.setAction.shape1densityProfile = (newDensityProfile1) => {
        self.shape1.densityProfile = newDensityProfile1
        changes.add(['densityProfile'])
    }
    self.setDensityProfile1 = (newDensityProfile1) => {
        const cur = candidateDnCommander.setForListSenders.shape1densityProfile.getCurrentValue(id)
        candidateDnCommander.setForListSenders.shape1densityProfile.go(id, newDensityProfile1, cur)
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

    self.renderForeground = () => {
        square.render()
    }
}
