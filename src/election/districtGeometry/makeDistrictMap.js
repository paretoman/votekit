/** @module */

import { polygonArea } from '../../lib/snowpack/build/snowpack/pkg/d3-polygon.js'
import lloydVoronoi from './lloydVoronoi.js'
/**
 * Makes and draws district boundaries for districts of equal number of voters.
 * Right now, just for a uniform square geography.
 * Define district lines and count voters.
 * @param {Number} nx - number of voter cells in x
 * @param {Number} ny - number of voter cells in y
 * @param {Number} nd - number of districts.
 */
export default function makeDistrictMap(nd) {
    const lloydPoints = 100
    const totalArea = lloydPoints * lloydPoints
    const [centroids, voronoi, polygons] = lloydVoronoi(lloydPoints, lloydPoints, nd, 0.01)
    const polygonAreas = polygons.map(polygonArea).map((x) => -x)

    const districtMap = { lloydPoints, totalArea, nd, centroids, voronoi, polygons, polygonAreas }

    return districtMap
}
