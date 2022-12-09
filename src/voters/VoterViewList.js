/** @module */

import VoterView from './VoterView.js'

/**
 * VoterViewList is different from voterShapeList
 * because it is a list of VoterView objects rather than VoterShape objects.
 * @constructor
 */
export default function VoterViewList(view, voterShapeList, screen, election) {
    const self = this

    const list = []
    self.list = list
    self.rendererMaker = () => ({ render: () => {} })

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
        const voterView = new VoterView(voterShape, screen, election, view)
        list.push(voterView)
        voterView.graphic.setRenderer(self.rendererMaker)
        updateObservers(voterView)
    }

    self.getVoterShapes = () => list.filter((v) => v.voterShape.exists).map((v) => v.voterShape)
    self.getVoterViews = () => list.filter((v) => v.voterShape.exists)

    // Update //
    self.updateViewXY = () => {
        list.forEach((v) => v.graphic.updateViewXY())
    }
    self.setRenderer = (rendererMaker) => {
        self.rendererMaker = rendererMaker
        list.forEach((v) => v.graphic.setRenderer(rendererMaker))
    }
    self.updateGraphic = (data) => {
        const voterViewsEx = self.getVoterViews()
        if (data === undefined) {
            voterViewsEx.forEach((v) => v.graphic.renderer.update())
        } else {
            voterViewsEx.forEach((v, i) => v.graphic.renderer.update(data[i]))
        }
    }

    // Render //
    self.render = () => {
        list.forEach((v) => { if (v.voterShape.exists) v.graphic.renderer.render() })
    }
    self.renderForeground = () => {
        if (view.showGhosts) {
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
    self.renderBackground = () => {
        list.forEach((v) => { if (v.voterShape.exists) v.graphic.renderer.renderBackground() })
    }
}
