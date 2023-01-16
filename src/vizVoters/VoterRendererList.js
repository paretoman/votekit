/** @module */

import VoterRenderer from './VoterRenderer.js'

export default function VoterRendererList(voterShapeList) {
    const self = this

    const list = []
    self.list = list
    self.rendererMaker = () => ({ render: () => {} })

    // Subscribe to Sim //
    voterShapeList.attachNewE(self)
    self.updateNewE = (voterShape) => {
        self.newVoterShape(voterShape)
    }

    // Setters and Getters //
    self.newVoterShape = function (voterShape) {
        const voterRenderer = new VoterRenderer(voterShape)
        list.push(voterRenderer)
        voterRenderer.setRenderer(self.rendererMaker)
    }

    self.getVoterShapes = () => list.filter((v) => v.voterShape.exists).map((v) => v.voterShape)
    self.getVoterRenderers = () => list.filter((v) => v.voterShape.exists)

    // Update //
    self.setRenderer = (rendererMaker) => {
        self.rendererMaker = rendererMaker
        list.forEach((v) => v.setRenderer(rendererMaker))
    }
    self.updateGraphic = (data) => {
        const voterRenderersEx = self.getVoterRenderers()
        if (data === undefined) {
            voterRenderersEx.forEach((v) => v.renderer.update())
        } else {
            voterRenderersEx.forEach((v, i) => v.renderer.update(data[i]))
        }
    }

    // Render //
    self.render = () => {
        list.forEach((v) => { if (v.voterShape.exists) v.renderer.render() })
    }
    self.renderBackground = () => {
        list.forEach((v) => { if (v.voterShape.exists) v.renderer.renderBackground() })
    }
}
