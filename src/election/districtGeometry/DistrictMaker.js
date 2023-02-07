/** @module */

import { polygonArea } from '../../lib/snowpack/build/snowpack/pkg/d3-polygon.js'
import lloydVoronoi from './lloydVoronoi.js'
import districtCensus from './districtCensus.js'
/**
 * Makes and draws district boundaries.
 * Right now, just for a uniform square geography.
     * Define district lines and count voters.
     * @param {Number} nx - number of voter cells in x
     * @param {Number} ny - number of voter cells in y
     * @param {Number} nd - number of districts.
     */
export default function makeDistrictMap(nx, ny, nd) {
    const [centroids, voronoi, polygons] = lloydVoronoi(nx, ny, nd, 0.01)
    const polygonAreas = polygons.map(polygonArea).map((x) => -x)
    const totalArea = nx * ny

    const districtMap = { nx, ny, nd, centroids, voronoi, polygons, polygonAreas, totalArea }

    districtMap.census = districtCensus(districtMap)

    return districtMap
}
