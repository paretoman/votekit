/** @module */

import VoterView from './VoterView.js'

/**
 * VoterViewList is different from voterShapeList
 * because it is a list of VoterView objects rather than VoterShape objects.
 * @constructor
 */
export default function VoterViewList(viewSettings, voterShapeList, screen, election) {
    const self = this

    const list = []
    self.list = list

    // Publish to DraggableManager //
    const observers = []
    self.attachNewG = (o) => { observers.push(o) }
    const updateObservers = (g) => { observers.forEach((o) => o.updateNewG(g)) }

    // Subscribe to Sim //
    voterShapeList.attachNewE(self)
    self.updateNewE = (voterShape) => {
        self.newVoterShape(voterShape)
    }

    // Setters and Getters //
    self.newVoterShape = function (voterShape) {
        const voterView = new VoterView(voterShape, screen, election, viewSettings)
        list.push(voterView)
        updateObservers(voterView)
    }

    self.getVoterShapes = () => list.filter((v) => v.voterShape.exists).map((v) => v.voterShape)
    self.getVoterViews = () => list.filter((v) => v.voterShape.exists)

    // Update //
    self.updateViewXY = () => {
        list.forEach((v) => v.graphic.updateViewXY())
    }

    // Render //
    self.renderForeground = () => {
        if (viewSettings.showGhosts) {
            self.renderForegroundAll()
        } else {
            self.renderForegroundExisting()
        }
    }
    self.renderForegroundExisting = () => {
        list.forEach((v) => { if (v.voterShape.exists) v.graphic.renderForeground() })
    }
    self.renderForegroundAll = () => {
        list.forEach((v) => { v.graphic.renderForeground() })
    }
}
