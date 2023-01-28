/** @module */

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
    candidateDnRegistrar,
    commander,
    changes,
    doLoad,
    candidateDnCommander,
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
            candidateDnCommander.exists.command(id, 1, 0), // set alive flag
            candidateDnCommander.shape2p.command(id, shape2p, shape2p),
            candidateDnCommander.shape1x.command(id, shape1.x, shape1.x),
            candidateDnCommander.shape2w.command(id, shape2.w, shape2.w),
            candidateDnCommander.shape1w.command(id, shape1.w, shape1.w),
            candidateDnCommander.shape1densityProfile.command(
                id,
                shape1.densityProfile,
                shape1.densityProfile,
            ),
            candidateDnCommander.party.command(id, [id], [id]),
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
    self.setCommand = {}

    self.setAction.exists = (e) => {
        self.exists = e
        changes.add(['draggables'])
    }
    self.setCommand.exists = (e) => {
        const cur = candidateDnCommander.exists.getCurrentValue(id)
        candidateDnCommander.exists.go(id, e, cur)
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
    self.setCommand.shape1x = (p) => {
        const cur = candidateDnCommander.shape1x.getCurrentValue(id)
        candidateDnCommander.shape1x.go(id, p.x, cur)
    }
    self.setCommand.shape2p = (p) => {
        const cur = candidateDnCommander.shape2p.getCurrentValue(id)
        candidateDnCommander.shape2p.go(id, p, cur)
    }

    self.setAction.shape2w = (newW) => {
        self.shape2.w = newW
        changes.add(['width'])
    }
    self.setCommand.shape2w = (newW) => {
        const cur = candidateDnCommander.shape2w.getCurrentValue(id)
        candidateDnCommander.shape2w.go(id, newW, cur)
    }

    self.setAction.shape1w = (newW) => {
        self.shape1.w = newW
        changes.add(['width'])
    }
    self.setCommand.shape1w = (newW) => {
        const cur = candidateDnCommander.shape1w.getCurrentValue(id)
        candidateDnCommander.shape1w.go(id, newW, cur)
    }

    /** Density Profile can be "gaussian" or "step" */
    self.setAction.shape1densityProfile = (newDensityProfile1) => {
        self.shape1.densityProfile = newDensityProfile1
        changes.add(['densityProfile'])
    }
    self.setCommand.shape1densityProfile = (newDensityProfile1) => {
        const cur = candidateDnCommander.shape1densityProfile.getCurrentValue(id)
        candidateDnCommander.shape1densityProfile.go(id, newDensityProfile1, cur)
    }

    self.setAction.party = (newParty) => {
        self.party = newParty
        changes.add(['party'])
    }
    self.setCommand.party = (e) => {
        const cur = candidateDnCommander.party.getCurrentValue(id)
        candidateDnCommander.party.go(id, e, cur)
    }

    self.instantiate()

    // Rendering

    self.color = '#ccc'
    self.darkModeColor = '#333'
}
