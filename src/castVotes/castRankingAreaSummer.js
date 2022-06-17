/** @module */

import { polygonArea } from '../lib/snowpack/build/snowpack/pkg/d3-polygon.js'
import castRankingFindPolygons from './castRankingFindPolygons.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} canGeoms
 * @constructor
 */
export default function CastRankingAreaSummer(canGeoms) {
    const self = this

    self.sumArea = function sumArea(voterGeom, weight) {
        // draw lines across shape of voterGeom

        const { cells, ranking, cansRanked } = castRankingFindPolygons(voterGeom, canGeoms)

        // find area of polygons

        const cn = cells.length
        const area = Array(cn)
        let totalArea = 0
        for (let i = 0; i < cn; i++) {
            // return area for each ranking
            const theArea = polygonArea(cells[i]) * weight
            area[i] = theArea
            totalArea += theArea
        }
        return {
            ranking, cansRanked, area, totalArea,
        }
    }
}
