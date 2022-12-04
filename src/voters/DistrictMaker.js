/** @module */

import { polygonArea } from '../lib/snowpack/build/snowpack/pkg/d3-polygon.js'
import lloydVoronoi from './lloydVoronoi.js'
import geoCensus from './geoCensus.js'
/**
 * Makes and draws district boundaries.
 * Right now, just for a uniform square geography.
 * @param {Screen} screen
 * @constructor
 */
export default function DistrictMaker() {
    const self = this

    /**
     * Define district lines and count demographics.
     * @param {Number} nx - number of voter cells in x
     * @param {Number} ny - number of voter cells in y
     * @param {Number} nd - number of districts.
     */
    self.make = (nx, ny, nd) => {
        [self.centroids, self.voronoi, self.polygons] = lloydVoronoi(nx, ny, nd, 0.01)
        self.nx = nx
        self.ny = ny
        self.nd = nd
        self.polygonAreas = self.polygons.map(polygonArea).map((x) => -x)
        self.totalArea = nx * ny

        self.census = geoCensus(self)
    }
}
