/** @module */

import VoterSim from './VoterSim.js'

/**
 * VoterSimList is different from voterShapeList
 * because it is a list of VoterSim objects rather than VoterShape objects.
 * @constructor
 */
export default function VoterSimList(view, sim, screen) {
    const self = this

    const list = []
    self.list = list
    self.rendererMaker = () => ({ render: () => {} })

    // Publish to DraggableManager //
    const observers = []
    self.attachNewG = (o) => { observers.push(o) }
    const updateObservers = (g) => { observers.forEach((o) => o.updateNewG(g)) }

    // Subscribe to Sim //
    sim.voterShapeList.attachNewE(self)
    self.updateNewE = (voterShape) => {
        self.newVoterShape(voterShape)
    }

    // Setters and Getters //
    self.newVoterShape = function (voterShape) {
        const voterSim = new VoterSim(voterShape, screen, sim.election, view)
        list.push(voterSim)
        voterSim.graphic.setRenderer(self.rendererMaker)
        updateObservers(voterSim)
    }

    self.getVoterShapes = () => list.filter((v) => v.voterShape.exists).map((v) => v.voterShape)
    self.getVoterSims = () => list.filter((v) => v.voterShape.exists)

    // Update //
    self.updateXY = () => {
        list.forEach((v) => v.voterShape.updateXY())
    }
    self.setRenderer = (rendererMaker) => {
        self.rendererMaker = rendererMaker
        list.forEach((v) => v.graphic.setRenderer(rendererMaker))
    }
    self.updateGraphic = (data) => {
        const voterSimsExisting = self.getVoterSims()
        if (data === undefined) {
            voterSimsExisting.forEach((v) => v.graphic.renderer.update())
        } else {
            voterSimsExisting.forEach((v, i) => v.graphic.renderer.update(data[i]))
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
