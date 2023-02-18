/** @module */

import { polygonArea } from '../../lib/snowpack/build/snowpack/pkg/d3-polygon.js'
import castRankingFindPolygons from './castRankingFindPolygons.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} canGeoms
 */
export default function castRankingPolygons2D(voterGeom, geometry) {
    const { canGeoms } = geometry

    // draw lines across shape of voterGeom
    let { cells, rankings, cansByRankList } = castRankingFindPolygons(voterGeom, canGeoms)

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
    rankings = rankings.filter((_, i) => Math.abs(areas[i]) > tol)
    cansByRankList = cansByRankList.filter((_, i) => Math.abs(areas[i]) > tol)
    cells = cells.filter((_, i) => Math.abs(areas[i]) > tol)
    areas = areas.filter((a) => Math.abs(a) > tol)

    const [voteCounts, totalVotes] = [areas, totalArea]
    return {
        rankings, cansByRankList, voteCounts, totalVotes, cells,
    }
}
