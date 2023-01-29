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

    // State //

    self.shape2 = {}
    self.shape1 = {}

    self.color = '#ccc'
    self.darkModeColor = '#333'

    self.setAction = {
        exists(e) {
            self.exists = e
            changes.add(['draggables'])
        },
        shape2p(p) {
            self.shape2.x = p.x
            self.shape2.y = p.y
            changes.add(['draggables'])
        },
        shape1x(x) {
            self.shape1.x = x
            changes.add(['draggables'])
        },
        shape2w(w) {
            self.shape2.w = w
            changes.add(['width'])
        },
        shape1w(w) {
            self.shape1.w = w
            changes.add(['width'])
        },
        shape1densityProfile(d) {
            self.shape1.densityProfile = d
            changes.add(['densityProfile'])
        },
        party(p) {
            self.party = p
            changes.add(['party'])
        },
    }

    // Make Commands //

    const id = candidateDnRegistrar.new(self)

    self.doSetCommand = {}
    const actionKeys = Object.keys(self.setAction)
    actionKeys.forEach((key) => {
        self.doSetCommand[key] = (e) => {
            const cur = candidateDnCommander[key].getCurrentValue(id)
            candidateDnCommander[key].go(id, e, cur)
        }
    })

    // Instantiation //

    // use commands to instantiate variables
    const shape2p = { x: shape2.x, y: shape2.y }

    const commands = [
        candidateDnCommander.exists.command(id, 1, 0), // set alive flag
        candidateDnCommander.shape2p.command(id, shape2p, shape2p),
        candidateDnCommander.shape1x.command(id, shape1.x, shape1.x),
        candidateDnCommander.shape2w.command(id, shape2.w, shape2.w),
        candidateDnCommander.shape1w.command(id, shape1.w, shape1.w),
        candidateDnCommander.shape1densityProfile.command(id, shape1.densityProfile, shape1.densityProfile),
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
