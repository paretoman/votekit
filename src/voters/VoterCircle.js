/** @module */

import CircleGraphic from './CircleGraphic.js'
import tooltipForEntity from '../sim/tooltipForEntity.js'

/**
 * VoterCircle class with Handle component to take care of dragging.
 * VoronoiGroup component takes care of drawing votes.
 * @param {Object} g2
 * @param {Object} g1
 * @param {Screen} screen
 * @param {Registrar} voterRegistrar
 * @param {Commander} commander
 * @param {Changes} changes
 * @param {Boolean} doLoad - Should we add the voter without adding to the history?
 * @constructor
 */
export default function VoterCircle(
    g2,
    g1,
    screen,
    voterRegistrar,
    commander,
    changes,
    doLoad,
    voterCommander,
    sim,
) {
    const self = this

    self.g1 = {}
    self.g2 = {}

    // Get assigned a id by the voterRegistrar list manager

    const id = voterRegistrar.new(self)

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        const g2p = { x: g2.x, y: g2.y }
        // set current value because we need to be able to undo by returning to these values
        // voterCommander.setESenderForList.setCurrentValue(id, 0)
        // voterCommander.setXYSenderForList.setCurrentValue(id, g2p)
        // voterCommander.setWSenderForList.setCurrentValue(id, g2.w)

        const commands = [
            voterCommander.setESenderForList.command(id, 1, 0), // set alive flag
            voterCommander.setP2SenderForList.command(id, g2p, g2p),
            voterCommander.setP1SenderForList.command(id, g1.x, g1.x),
            voterCommander.setW2SenderForList.command(id, g2.w, g2.w),
            voterCommander.setW1SenderForList.command(id, g1.w, g1.w),
            voterCommander
                .setDensityProfile1SenderForList.command(id, g1.densityProfile, g1.densityProfile),
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
        const cur = voterCommander.setESenderForList.getCurrentValue(id)
        voterCommander.setESenderForList.go(id, e, cur)
    }

    self.setP2Action = (p) => {
        self.g2.x = p.x
        self.g2.y = p.y
        if (sim.election.dimensions === 2) {
            self.x = p.x
            self.y = p.y
        }
        changes.add(['draggables'])
    }
    self.setP1Action = (p) => {
        self.g1.x = p
        if (sim.election.dimensions === 1) {
            self.x = p
            self.y = 250
        }
        changes.add(['draggables'])
    }
    self.setXY = (p) => {
        if (sim.election.dimensions === 1) {
            const cur = voterCommander.setP1SenderForList.getCurrentValue(id)
            voterCommander.setP1SenderForList.go(id, p.x, cur)
        } else {
            const cur = voterCommander.setP2SenderForList.getCurrentValue(id)
            voterCommander.setP2SenderForList.go(id, p, cur)
        }
    }
    /** Do this when entering a state because x and y change.
     *  Maybe x and y should be in the SimVoter instead... just speculating. */
    self.updateXY = () => {
        if (sim.election.dimensions === 1) {
            self.setP1Action(self.g1.x)
        } else {
            self.setP2Action({ x: self.g2.x, y: self.g2.y })
        }
    }

    self.setW2Action = (newW) => {
        self.g2.w = newW
        changes.add(['width'])
    }
    self.setW2 = (newW) => {
        const cur = voterCommander.setW2SenderForList.getCurrentValue(id)
        voterCommander.setW2SenderForList.go(id, newW, cur)
    }

    self.setW1Action = (newW) => {
        self.g1.w = newW
        changes.add(['width'])
    }
    self.setW1 = (newW) => {
        const cur = voterCommander.setW1SenderForList.getCurrentValue(id)
        voterCommander.setW1SenderForList.go(id, newW, cur)
    }

    /** Density Profile can be "gaussian" or "step" */
    self.setDensityProfile1Action = (newDensityProfile1) => {
        self.g1.densityProfile = newDensityProfile1
        changes.add(['densityProfile'])
    }
    self.setDensityProfile1 = (newDensityProfile1) => {
        const cur = voterCommander.setDensityProfile1SenderForList.getCurrentValue(id)
        voterCommander.setDensityProfile1SenderForList.go(id, newDensityProfile1, cur)
    }

    self.instantiate()

    // Done instantiating variables

    // Click Handler

    self.click = () => {
        tooltipForEntity(self, screen, sim)
    }

    // Rendering

    const circle = new CircleGraphic(self, 13, '#999', screen)
    self.circle = circle

    self.renderForeground = () => {
        // handle
        circle.render()
    }
}
