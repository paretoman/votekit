/** @module */

import CircleGraphic from './CircleGraphic.js'
import tooltipForEntity from '../sim/tooltipForEntity.js'

/**
 * VoterCircle class with Handle component to take care of dragging.
 * VoronoiGroup component takes care of drawing votes.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w - width of circle of candidate positions.
 * @param {Screen} screen
 * @param {Registrar} voterRegistrar
 * @param {Commander} commander
 * @param {Changes} changes
 * @param {Boolean} doLoad - Should we add the voter without adding to the history?
 * @constructor
 */
export default function VoterCircle(
    p2,
    p1,
    w2,
    w1,
    densityProfile1,
    screen,
    voterRegistrar,
    commander,
    changes,
    doLoad,
    voterCommander,
    sim,
) {
    const self = this

    // Get assigned a id by the voterRegistrar list manager

    const id = voterRegistrar.new(self)

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        // set current value because we need to be able to undo by returning to these values
        // voterCommander.setESenderForList.setCurrentValue(id, 0)
        // voterCommander.setXYSenderForList.setCurrentValue(id, { x, y })
        // voterCommander.setWSenderForList.setCurrentValue(id, w2)

        const commands = [
            voterCommander.setESenderForList.command(id, 1, 0), // set alive flag
            voterCommander.setP2SenderForList.command(id, p2, p2),
            voterCommander.setP1SenderForList.command(id, p1, p1),
            voterCommander.setW2SenderForList.command(id, w2, w2),
            voterCommander.setW1SenderForList.command(id, w1, w1),
            voterCommander
                .setDensityProfile1SenderForList.command(id, densityProfile1, densityProfile1),
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
        console.log(e)
        const cur = voterCommander.setESenderForList.getCurrentValue(id)
        voterCommander.setESenderForList.go(id, e, cur)
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
        const cur = voterCommander.setW2SenderForList.getCurrentValue(id)
        voterCommander.setW2SenderForList.go(id, newW, cur)
    }

    self.setW1Action = (newW) => {
        self.w1 = newW
        changes.add(['width'])
    }
    self.setW1 = (newW) => {
        const cur = voterCommander.setW1SenderForList.getCurrentValue(id)
        voterCommander.setW1SenderForList.go(id, newW, cur)
    }

    /** Density Profile can be "gaussian" or "step" */
    self.setDensityProfile1Action = (newDensityProfile1) => {
        self.densityProfile1 = newDensityProfile1
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

    const circle = new CircleGraphic(self, 13, '#999', screen)
    self.circle = circle

    // Drawing

    self.renderForeground = () => {
        // handle
        circle.render()
    }
}
