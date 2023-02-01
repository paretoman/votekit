/** @module */

import { polygonArea } from '../../lib/snowpack/build/snowpack/pkg/d3-polygon.js'
import castRankingFindPolygons from './castRankingFindPolygons.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} canGeoms
 * @constructor
 */
export default function CastRankingSummer2DPolygons(canGeoms) {
    const self = this

    self.sumArea = function sumArea(voterGeom) {
        // draw lines across shape of voterGeom

        let { cells, ranking, cansByRank } = castRankingFindPolygons(voterGeom, canGeoms)

        // find area of polygons

        const cn = cells.length
        let areas = Array(cn)
        let totalArea = 0
        for (let i = 0; i < cn; i++) {
            // return area for each ranking
            const area = -polygonArea(cells[i])
            areas[i] = area
            totalArea += area
        }
        // sometimes near-zero-area polygons are formed that need to be removed
        // because they also have rankings that don't make sense.
        const tol = 0.000001
        ranking = ranking.filter((_, i) => Math.abs(areas[i]) > tol)
        cansByRank = cansByRank.filter((_, i) => Math.abs(areas[i]) > tol)
        cells = cells.filter((_, i) => Math.abs(areas[i]) > tol)
        areas = areas.filter((a) => Math.abs(a) > tol)

        const [voteCounts, totalCount] = [areas, totalArea]
        return {
            ranking, cansByRank, voteCounts, totalCount, cells,
        }
    }
}
