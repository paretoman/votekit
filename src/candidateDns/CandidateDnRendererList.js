/** @module */

import CandidateDnRenderer from './CandidateDnRenderer.js'

/**
 * A simple list of candidateDnRenderer instances.
 * It really just passes along function calls to each member of the list.
 * It also checks if that member exists. Alternatively, it was deleted.
 */
export default function CandidateDnRendererList(candidateDnList) {
    const self = this

    const list = []
    self.rendererMaker = () => ({ render: () => {} })

    // Subscribe to Sim //
    candidateDnList.attachNewE(self)
    self.updateNewE = (candidateDn) => {
        self.newCandidateDn(candidateDn)
    }

    // Data Setters and Getters //

    self.newCandidateDn = function (candidateDn) {
        const canDnRenderer = new CandidateDnRenderer(candidateDn)
        list.push(canDnRenderer)
        canDnRenderer.setRenderer(self.rendererMaker)
    }

    // get sim entities that exist
    self.getCanDnRenderers = () => {
        const a = list.filter((canDnRenderer) => canDnRenderer.canDn.exists)
        return a
    }

    // get the underlying entities of the above
    self.getCandidateDistributions = () => {
        const canDnRenderersEx = self.getCanDnRenderers()
        return canDnRenderersEx.map((canDnRenderer) => canDnRenderer.canDn)
    }
    self.getCandidateDistributionsAll = () => list.map((canDnRenderer) => canDnRenderer.canDn)

    // Update //

    self.setRenderer = (rendererMaker) => {
        self.rendererMaker = rendererMaker
        list.forEach((canDnRenderer) => canDnRenderer.setRenderer(rendererMaker))
    }

    // Render //

    self.render = () => {
        list.forEach((canDnRenderer) => {
            if (canDnRenderer.canDn.exists) canDnRenderer.renderer.render()
        })
    }
}
