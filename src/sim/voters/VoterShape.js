/** @module */

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
    voterRegistrar,
    commander,
    changes,
    doLoad,
    voterCommander,
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
            voterCommander.exists.command(id, 1, 0), // set alive flag
            voterCommander.shape2p.command(id, shape2p, shape2p),
            voterCommander.shape1x.command(id, shape1.x, shape1.x),
            voterCommander.shape2w.command(id, shape2.w, shape2.w),
            voterCommander.shape1w.command(id, shape1.w, shape1.w),
            voterCommander.shape1densityProfile.command(
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
        const cur = voterCommander.exists.getCurrentValue(id)
        voterCommander.exists.go(id, e, cur)
    }

    self.setAction.shape2p = (p) => {
        self.shape2.x = p.x
        self.shape2.y = p.y
        changes.add(['draggables'])
    }
    self.setAction.shape1x = (p) => {
        self.shape1.x = p
        changes.add(['draggables'])
    }
    self.setXY1 = (p) => {
        const cur = voterCommander.shape1x.getCurrentValue(id)
        voterCommander.shape1x.go(id, p.x, cur)
    }
    self.setXY2 = (p) => {
        const cur = voterCommander.shape2p.getCurrentValue(id)
        voterCommander.shape2p.go(id, p, cur)
    }

    self.setAction.shape2w = (newW) => {
        self.shape2.w = newW
        changes.add(['width'])
    }
    self.setW2 = (newW) => {
        const cur = voterCommander.shape2w.getCurrentValue(id)
        voterCommander.shape2w.go(id, newW, cur)
    }

    self.setAction.shape1w = (newW) => {
        self.shape1.w = newW
        changes.add(['width'])
    }
    self.setW1 = (newW) => {
        const cur = voterCommander.shape1w.getCurrentValue(id)
        voterCommander.shape1w.go(id, newW, cur)
    }

    /** Density Profile can be "gaussian" or "step" */
    self.setAction.shape1densityProfile = (newDensityProfile1) => {
        self.shape1.densityProfile = newDensityProfile1
        changes.add(['densityProfile'])
    }
    self.setDensityProfile1 = (newDensityProfile1) => {
        const cur = voterCommander.shape1densityProfile.getCurrentValue(id)
        voterCommander.shape1densityProfile.go(id, newDensityProfile1, cur)
    }

    self.instantiate()

    // Done instantiating variables

    // Rendering

    self.color = '#88888888'
}
