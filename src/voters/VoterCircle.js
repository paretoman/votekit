/** @module */

import CircleGraphic from './CircleGraphic.js'

/**
 * VoterCircle class with Handle component to take care of dragging.
 * VoronoiGroup component takes care of drawing votes.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} r - radius of circle of candidate positions.
 * @param {Screen} screen
 * @param {Registrar} voterRegistrar
 * @param {Commander} commander
 * @param {Changes} changes
 * @param {Boolean} doLoad - Should we add the voter without adding to the history?
 * @constructor
 */
export default function VoterCircle(
    x,
    y,
    r,
    screen,
    voterRegistrar,
    commander,
    changes,
    doLoad,
    voterCommander,
) {
    const self = this

    // Get assigned a id by the voterRegistrar list manager

    const id = voterRegistrar.new(self)

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        // set current value because we need to be able to undo by returning to these values
        // voterCommander.setEClientList.setCurrentValue(id, 0)
        // voterCommander.setXYClientList.setCurrentValue(id, { x, y })
        // voterCommander.setRClientList.setCurrentValue(id, r)

        const commands = [
            voterCommander.setEClientList.command(id, 1, 0), // set alive flag
            voterCommander.setXYClientList.command(id, { x, y }, { x, y }),
            voterCommander.setRClientList.command(id, r, r),
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
        const cur = voterCommander.setEClientList.getCurrentValue(id)
        voterCommander.setEClientList.go(id, e, cur)
    }

    self.setXYAction = (p) => {
        self.x = p.x
        self.y = p.y
        changes.add(['draggables'])
    }
    self.setXY = (p) => {
        const cur = voterCommander.setXYClientList.getCurrentValue(id)
        voterCommander.setXYClientList.go(id, p, cur)
    }

    self.setRAction = (newR) => {
        self.r = newR
        changes.add(['radius'])
    }
    self.setR = (newR) => {
        const cur = voterCommander.setRClientList.getCurrentValue(id)
        voterCommander.setRClientList.go(id, newR, cur)
    }

    self.instantiate()

    // Done instantiating variables

    const circle = new CircleGraphic(self, 10, '#555', screen)
    self.circle = circle

    // Drawing

    self.renderForeground = () => {
        // handle
        circle.render()
    }
}
