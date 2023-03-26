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
    strategyRules,
    voterRegistrar,
    commander,
    changes,
    doLoad,
    voterCommander,
) {
    const self = this

    // State //

    self.shape1 = {}
    self.shape2 = {}

    self.color = '#88888888'
    self.strategyRules = strategyRules

    self.setAction = {
        exists(e) {
            self.exists = e
            changes.add(['voters', 'draggables'])
        },
        shape2p(p) {
            self.shape2.x = p.x
            self.shape2.y = p.y
            changes.add(['voters', 'draggables'])
        },
        shape1x(x) {
            self.shape1.x = x
            changes.add(['voters', 'draggables'])
        },
        shape2w(w) {
            self.shape2.w = w
            changes.add(['voters', 'width'])
        },
        shape1w(w) {
            self.shape1.w = w
            changes.add(['voters', 'width'])
        },
        shape1densityProfile(d) {
            self.shape1.densityProfile = d
            changes.add(['voters', 'densityProfile'])
        },
        shape2densityProfile(d) {
            self.shape2.densityProfile = d
            changes.add(['voters', 'densityProfile'])
        },
        strategy(a) {
            setStrategyRules(a)
        },
        actionOptionThreshold(a) {
            setStrategyRules(a)
        },
        actionWeight(a) {
            setStrategyRules(a)
        },
        party(p) {
            self.party = p
            changes.add(['party'])
        },

    }
    function setStrategyRules(a) {
        self.strategyRules = a
        changes.add(['voters', 'strategyRules'])
    }

    // Make Commands //

    const id = voterRegistrar.new(self)

    self.doSetCommand = {}
    const actionKeys = Object.keys(self.setAction)
    actionKeys.forEach((key) => {
        self.doSetCommand[key] = (e) => {
            const cur = voterCommander[key].getCurrentValue(id)
            voterCommander[key].go(id, e, cur)
        }
    })

    // Instantiation //

    // use commands to instantiate variables
    const shape2p = { x: shape2.x, y: shape2.y }

    const commands = [
        voterCommander.exists.command(id, 1, 0), // set alive flag
        voterCommander.shape2p.command(id, shape2p, shape2p),
        voterCommander.shape1x.command(id, shape1.x, shape1.x),
        voterCommander.shape2w.command(id, shape2.w, shape2.w),
        voterCommander.shape1w.command(id, shape1.w, shape1.w),
        voterCommander.shape1densityProfile.command(id, shape1.densityProfile, shape1.densityProfile),
        voterCommander.shape2densityProfile.command(id, shape2.densityProfile, shape2.densityProfile),
        voterCommander.strategy.command(id, self.strategyRules, self.strategyRules),
        voterCommander.party.command(id, [id], [id]),
    ]
    // Either load the commands because we don't want to create an item of history
    // Or do the commands because want to store an item in history, so that we can undo.
    if (doLoad) {
        commander.loadCommands(commands)
    } else {
        commander.doCommands(commands)
    }
}
