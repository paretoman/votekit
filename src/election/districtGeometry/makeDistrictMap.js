/** @module */

import { polygonArea } from '../../lib/snowpack/build/snowpack/pkg/d3-polygon.js'
import lloydVoronoi from './lloydVoronoi.js'
/**
 * Makes and draws district boundaries for districts of equal number of voters.
 * Right now, just for a uniform square geography.
 * Each axis is from 0 to 1.
 * The total area is 1.
 * Define district lines and count voters.
 * @param {Number} nd - number of districts.
 */
export default function makeDistrictMap(nd) {
    const [centroids, voronoi, polygons] = lloydVoronoi(1, 1, nd, 0.01)
    const polygonAreas = polygons.map(polygonArea).map((x) => -x)

    const districtMap = { nd, centroids, voronoi, polygons, polygonAreas }

    return districtMap
}
