/** @module */

import tooltipForEntity from '../tooltips/tooltipForEntity.js'

/**
 * VoterShape class with Handle component to take care of dragging.
 * Voronoi2D component takes care of drawing votes.
 * @param {Object} shape2
 * @param {Object} shape1
 * @param {Screen} screen
 * @param {Registrar} voterRegistrar
 * @param {Commander} commander
 * @param {Changes} changes
 * @param {Boolean} doLoad - Should we add the voter without adding to the history?
 * @constructor
 */
export default function VoterShape(
    shape2,
    shape1,
    screen,
    voterRegistrar,
    commander,
    changes,
    doLoad,
    voterCommander,
    sim,
) {
    const self = this

    self.shape1 = {}
    self.shape2 = {}

    // Get assigned an id by the voterRegistrar list manager

    const id = voterRegistrar.new(self)

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        const shape2p = { x: shape2.x, y: shape2.y }

        const commands = [
            voterCommander.setForListSenders.exists.command(id, 1, 0), // set alive flag
            voterCommander.setForListSenders.shape2p.command(id, shape2p, shape2p),
            voterCommander.setForListSenders.shape1x.command(id, shape1.x, shape1.x),
            voterCommander.setForListSenders.shape2w.command(id, shape2.w, shape2.w),
            voterCommander.setForListSenders.shape1w.command(id, shape1.w, shape1.w),
            voterCommander.setForListSenders.shape1densityProfile.command(
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
        const cur = voterCommander.setForListSenders.exists.getCurrentValue(id)
        voterCommander.setForListSenders.exists.go(id, e, cur)
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
            const cur = voterCommander.setForListSenders.shape1x.getCurrentValue(id)
            voterCommander.setForListSenders.shape1x.go(id, p.x, cur)
        } else {
            const cur = voterCommander.setForListSenders.shape2p.getCurrentValue(id)
            voterCommander.setForListSenders.shape2p.go(id, p, cur)
        }
    }
    /** Do this when entering a state because x and y change.
     *  Maybe x and y should be in the VoterSim instead... just speculating. */
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
        const cur = voterCommander.setForListSenders.shape2w.getCurrentValue(id)
        voterCommander.setForListSenders.shape2w.go(id, newW, cur)
    }

    self.setAction.shape1w = (newW) => {
        self.shape1.w = newW
        changes.add(['width'])
    }
    self.setW1 = (newW) => {
        const cur = voterCommander.setForListSenders.shape1w.getCurrentValue(id)
        voterCommander.setForListSenders.shape1w.go(id, newW, cur)
    }

    /** Density Profile can be "gaussian" or "step" */
    self.setAction.shape1densityProfile = (newDensityProfile1) => {
        self.shape1.densityProfile = newDensityProfile1
        changes.add(['densityProfile'])
    }
    self.setDensityProfile1 = (newDensityProfile1) => {
        const cur = voterCommander.setForListSenders.shape1densityProfile.getCurrentValue(id)
        voterCommander.setForListSenders.shape1densityProfile.go(id, newDensityProfile1, cur)
    }

    self.instantiate()

    // Done instantiating variables

    // Click Handler

    self.click = () => {
        tooltipForEntity(self, screen, sim)
    }

    // Rendering

    self.color = '#88888888'
}
