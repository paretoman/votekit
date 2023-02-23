/** @module */

import { polygonArea } from '../../lib/snowpack/build/snowpack/pkg/d3-polygon.js'
import castRankingFindPolygons from './castRankingFindPolygons.js'

/**
 * Sum area of voter distributions to tally the votes.
 */
export default function castRankingPolygons2D(voterGeom, geometry, castOptions) {
    const { canPoints } = geometry
    const { verbosity } = castOptions

    // draw lines across shape of voterGeom
    let { cells, rankings, cansByRankList } = castRankingFindPolygons(voterGeom, canPoints, verbosity)

    // find area of polygons
    const cn = cells.length
    const areas = Array(cn)
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
    cansByRankList = cansByRankList.filter((_, i) => Math.abs(areas[i]) > tol)
    const voteCounts = areas.filter((a) => Math.abs(a) > tol)

    const totalVotes = totalArea
    if (verbosity < 2) {
        return { voteCounts, totalVotes, cansByRankList }
    }
    rankings = rankings.filter((_, i) => Math.abs(areas[i]) > tol)
    cells = cells.filter((_, i) => Math.abs(areas[i]) > tol)
    return { voteCounts, totalVotes, cansByRankList, rankings, cells }
}
