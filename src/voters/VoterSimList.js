/** @module */

/**
 * Made a super class, VoterSimList.
 * VoterGeoList inherits from VoterSimList.
 * There is no VoterOne because there isn't any additional functionality that VoterOne would need.
 * VoterSimList is different from voterRegistrar
 * because it is a list of VoterSim objects rather than VoterShape objects.
 * @constructor
 */
export default function VoterSimList(sim) {
    const self = this

    const list = []
    self.list = list
    self.rendererMaker = () => ({ render: () => {} })

    // Publisher //
    const observers = []
    self.attachNewG = (o) => { observers.push(o) }
    const updateObservers = (g) => { observers.forEach((o) => o.updateNewG(g)) }

    self.newVoterSim = function (voterSim) {
        list.push(voterSim)
        voterSim.graphic.setRenderer(self.rendererMaker)
        updateObservers(voterSim)
    }

    self.getVoterShapes = () => list.filter((v) => v.voterShape.exists).map((v) => v.voterShape)
    self.getVoterSims = () => list.filter((v) => v.voterShape.exists)

    self.update = () => { } // strategy pattern. There is a similar function for VoterGeoList
    self.updateXY = () => {
        list.forEach((v) => v.voterShape.updateXY())
    }
    self.updateVoters = () => { } // strategy pattern. There is a similar function for VoterGeoList

    self.render = () => {
        list.forEach((v) => { if (v.voterShape.exists) v.graphic.renderer.render() })
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

    self.renderForeground = () => {
        if (sim.showGhosts) {
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
