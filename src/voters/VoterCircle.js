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
) {
    const self = this

    // Get assigned a id by the voterRegistrar list manager

    const id = voterRegistrar.new()

    // Instantiate Variables

    // use commands to instantiate variables
    self.instantiate = () => {
        const commands = [
            self.setEClient.command(1), // set alive flag
            self.setXYClient.command({ x, y }),
            self.setRClient.command(r),
        ]
        // Either load the commands because we don't want to create an item of history
        // Or do the commands because want to store an item in history, so that we can undo.
        if (doLoad) {
            commander.loadCommands(commands)
        } else {
            commander.doCommands(commands)
        }
    }

    const prefix = 'voter'

    self.setEClient = commander.addClient({
        action: (e) => {
            self.exists = e
            changes.add(['draggables'])
        },
        currentValue: 0,
        name: `${prefix}-${id}-setE`,
    })
    self.setE = self.setEClient.go

    self.setXYClient = commander.addClient({
        action: (p) => {
            self.x = p.x
            self.y = p.y
            changes.add(['draggables'])
        },
        currentValue: { x, y },
        name: `${prefix}-${id}-setXY`,
        props: { isSetXY: true },
    })
    self.setXY = self.setXYClient.go

    self.setRClient = commander.addClient({
        action: (newR) => {
            self.r = newR
            changes.add(['radius'])
        },
        currentValue: r,
        name: `${prefix}-${id}-setR`,
    })
    self.setR = self.setRClient.go

    self.instantiate()

    // Done instantiating variables

    // Dragging

    const circle = new CircleGraphic(self, 10, '#555', screen)
    self.circle = circle

    // Drawing

    self.renderForeground = () => {
        // handle
        circle.render()
    }
}
