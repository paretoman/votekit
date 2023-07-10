/** @module */

import VoronoiRanking1D from './VoronoiRanking1D.js'
import VoronoiRanking2D from './VoronoiRanking2D.js'

/**
 * Show votes
 * @param {VoterRendererList} voterRendererList
 * @param {CandidateList} candidateList
 * @param {Screen} screen
 * @constructor
 */
// eslint-disable-next-line max-len
export default function VizOneVoronoiRanking(voterRendererList, candidateList, screen, screenMini, simOptions) {
    const self = this

    // renderer factory //
    const { dimensions } = simOptions
    const VoronoiRanking = (dimensions === 1) ? VoronoiRanking1D : VoronoiRanking2D
    const rendererMaker = (voterShape) => new VoronoiRanking(voterShape, candidateList, screen)
    voterRendererList.setRenderer(rendererMaker)

    self.enter = () => {}
    self.exit = () => { }

    self.update = function (sequenceResults) {
        const { error } = sequenceResults
        if (error !== undefined) return

        const { sequenceName } = sequenceResults.electionOptions.sequenceOptions
        const { resultsPhaseBySeq, resultsPartyBySeq } = simOptions
        const resultsPhaseName = resultsPhaseBySeq[sequenceName]
        const resultsParty = resultsPartyBySeq[resultsPhaseName]

        const phaseResults0 = sequenceResults.phases[resultsPhaseName]
        const phaseResults = (resultsParty !== undefined) ? phaseResults0[resultsParty] : phaseResults0

        const { votesByGeom } = phaseResults.votes
        voterRendererList.updateGraphic(votesByGeom)
    }

    self.render = function () {
        voterRendererList.render()
    }
}
