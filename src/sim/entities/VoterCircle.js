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
 * @param {Election} election
 */
export default function VoterCircle(x, y, r, screen, dragm, voters, commander, name, changes) {
    const self = this

    self.x = x
    self.y = y
    self.r = r

    /**
     * The action that will be carried out by the entity-setXY command.
     * @param {Object} p - A point: has properties x and y.
     */
    self.setXYAction = function (p) {
        self.x = p.x
        self.y = p.y
        changes.add(['draggables'])
    }

    const commandName = `voter-${name}-setXY`
    commander.addAction(commandName, self.setXYAction, { x, y })
    self.setXY = function (p) { // should be renamed setXYCommand, when ready to change all
        const opt = { isSetXY: true }
        commander.do(commandName, p, opt)
    }

    const circle = new CircleGraphic(self, 10, '#555', screen)
    self.circle = circle

    dragm.newCircleHandle(self, circle)

    voters.newVoterGroup(self)

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
