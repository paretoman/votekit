/** @module */

import CircleGraphic from './CircleGraphic.js'
import VoronoiGroup from './VoronoiGroup.js'

/**
 * VoterCircle class with Handle component to take care of dragging.
 * VoronoiGroup component takes care of drawing votes.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} r - radius of circle of candidate positions.
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Voters} voters
 * @param {Commander} commander
 * @param {Changes} changes
 * @param {Boolean} doLoad - Should we add the voter without adding to the history?
 */
export default function VoterCircle(x, y, r, screen, dragm, voters, commander, changes, doLoad) {
    const self = this

    // Get assigned a id by the voters list manager

    const id = voters.newVoterGroup(self)

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        const commands = [
            self.setECommand(1), // set alive flag
            self.setXYCommand({ x, y }),
            self.setRCommand(r),
        ]
        // Either load the commands because we don't want to create an item of history
        // Or do the commands because want to store an item in history, so that we can undo.
        if (doLoad) {
            commander.loadCommands(commands)
        } else {
            commander.doCommands(commands)
        }
    }

    /**
     * The action that will be carried out by the entity-setECommand command.
     * @param {Boolean} e - Does the voter exist? Alternatively, it has been deleted.
     */
    self.setEAction = (e) => {
        self.exists = e
        changes.add(['draggables'])
    }
    self.commandNameE = `voter-${id}-setE`
    // the 0 here means we didn't exist before now
    commander.addAction(self.commandNameE, self.setEAction, 0)
    self.setECommand = (e) => ({ name: self.commandNameE, value: e })
    self.setE = (e) => {
        commander.do(self.setECommand(e))
    }

    /**
     * The action that will be carried out by the entity-setXY command.
     * @param {Object} p - A point: has properties x and y.
     */
    self.setXYAction = (p) => {
        self.x = p.x
        self.y = p.y
        changes.add(['draggables'])
    }
    self.commandNameXY = `voter-${id}-setXY`
    commander.addAction(self.commandNameXY, self.setXYAction, { x, y })
    self.setXYCommand = (p) => ({ name: self.commandNameXY, value: p, props: { isSetXY: true } })
    self.setXY = (p) => {
        commander.do(self.setXYCommand(p))
    }

    /**
     * The action that will be carried out by the entity-setR command.
     * @param {Number} r - radius
     */
    self.setRAction = (newR) => {
        self.r = newR
        changes.add(['radius'])
    }
    self.commandNameR = `voter-${id}-setR`
    commander.addAction(self.commandNameR, self.setRAction, r)
    self.setRCommand = (newR) => ({ name: self.commandNameR, value: newR })
    self.setR = (newR) => {
        commander.do(self.setRCommand(newR))
    }

    self.instantiate()

    // Done instantiating variables

    // Other

    const circle = new CircleGraphic(self, 10, '#555', screen)
    self.circle = circle

    dragm.newCircleHandle(self, circle)

    const voronoiGroup = new VoronoiGroup(self, screen)

    self.update = function (candidates) {
        voronoiGroup.update(candidates)
    }

    // Graphics component
    self.render = function () {
        // circle
        voronoiGroup.render()
    }
    self.renderForeground = () => {
        // handle
        circle.render()
    }
}
