/** @module */

import { range } from '@paretoman/votekit-utilities'
import { contourDensity } from 'd3-contour'
import { geoPath } from 'd3-geo'

import VoterRender1D from './VoterRender1D.js'
import VoterRender2D from './VoterRender2D.js'

/**
 * Show Voters
 * @param {VoterRendererList} voterRendererList
 * @param {screen} screen - draw to the screen
 * @constructor
 */
// eslint-disable-next-line max-len
export default function VizSampleDensity2D(voterRendererList, canDnRendererList, screen, changes, simOptions) {
    const self = this

    // Candidates //

    const { dimensions } = simOptions

    // voter renderer factory //
    const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D
    voterRendererList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))
    canDnRendererList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))

    const pointsList = []
    const pointCounts = []
    let totalCount

    self.update = function (samplingResult) {
        if (changes.checkAny()) {
            start()
        }
        const { pointsChanged, samplingPointsList, samplingPointsCount } = samplingResult

        if (pointsChanged) {
            self.updatePoints(samplingPointsList, samplingPointsCount)
            self.updateDensity()
        }
    }

    function start() {
        pointsList.splice(0, pointsList.length)
        pointCounts.splice(0, pointCounts.length)
        totalCount = 0
    }

    self.render = () => {
        self.renderCans()

        voterRendererList.render()
        canDnRendererList.render()
    }

    self.updatePoints = function (samplingPointsList, samplingPointsCount) {
        for (let i = 0; i < samplingPointsList.length; i++) {
            const point = samplingPointsList[i]
            const count = samplingPointsCount[i]
            pointsList.push(point)
            pointCounts.push(count)
            totalCount += count
        }
    }

    const nThresholds = 20
    let densityData
    self.updateDensity = () => {
        const btw = totalCount / 10000
        const thresholds = range(nThresholds).map((x) => x * btw)
        const cd = contourDensity()
            .x((d) => d[0])
            .y((d) => d[1])
            .weight((d, i) => pointCounts[i])
            .bandwidth(10)
            .thresholds(thresholds)
        densityData = cd(pointsList)
    }

    self.renderCans = () => {
        const { ctx } = screen
        const { darkMode } = screen.common
        const gg = geoPath()
            .context(ctx)

        ctx.save()

        ctx.lineWidth = 0.5
        ctx.strokeStyle = '#aaa'
        const alpha = 1
        const nd = densityData.length
        for (let i = 0; i < nd; i++) {
            const col = 255 - i * (200 / nThresholds)
            // 33 is #222, otherwise there is noise TODO: fix this workaround. Try to take out 33.
            const co = (darkMode) ? 255 - col + 33 : col
            ctx.fillStyle = `rgba(${co},${co},${co}, ${alpha})`
            ctx.beginPath()
            gg(densityData[i])
            // ctx.stroke()
            ctx.fill()
        }
        ctx.restore()
    }
}
