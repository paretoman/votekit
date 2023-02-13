/** @module */

import { contourDensity } from '../../lib/snowpack/build/snowpack/pkg/d3-contour.js'
import { geoPath } from '../../lib/snowpack/build/snowpack/pkg/d3-geo.js'
import { range } from '../../utilities/jsHelpers.js'

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

    const points = []

    self.update = function (samplingResult) {
        if (changes.checkAny()) {
            start()
        }
        const { pointsChanged, newPointsList, newPointsCount } = samplingResult

        if (pointsChanged) {
            self.updatePoints(newPointsList, newPointsCount)
            self.updateDensity()
        }
    }

    function start() {
        points.splice(0, points.length)
    }

    self.render = () => {
        self.renderCans()

        voterRendererList.render()
        canDnRendererList.render()
    }

    self.updatePoints = function (newPointsList, newPointsCount) {
        for (let i = 0; i < newPointsList.length; i++) {
            const point = newPointsList[i]
            const count = newPointsCount[i]

            for (let m = 0; m < count; m++) {
                points.push(point)
            }
        }
    }

    const nThresholds = 20
    let densityData
    self.updateDensity = () => {
        const btw = points.length / 10000
        const thresholds = range(nThresholds).map((x) => x * btw)
        const cd = contourDensity()
            .x((d) => d[0])
            .y((d) => d[1])
            .bandwidth(10)
            .thresholds(thresholds)
        densityData = cd(points)
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
