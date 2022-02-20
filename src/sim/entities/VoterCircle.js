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
export default function VoterCircle(x, y, r, screen, dragm, voters) {
    const self = this

    self.x = x
    self.y = y
    self.r = r
    self.setX = function (x1) {
        self.x = x1
    }
    self.setY = function (y1) {
        self.y = y1
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
