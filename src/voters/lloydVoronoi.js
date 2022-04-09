/** @module */

// import { polygonCentroid } from 'https://cdn.skypack.dev/d3-polygon@3'
import { polygonCentroid } from '../lib/snowpack/build/snowpack/pkg/d3-polygon.js'
// import * as d3 from 'https://cdn.skypack.dev/d3@7'
import { Delaunay } from '../lib/snowpack/build/snowpack/pkg/d3-delaunay.js'
/**
 * Calculate a voronoi diagram with some degree of equal capacity between voronoi cells.
 * Uses Lloyd's method.
 * @param {Number} w - number of discrete points wide of space to divide
 * @param {Number} h - number of points high
 * @param {Number} n - number of voronoi cells
 * @param {Number} tolFraction - fractional tolerance for relaxation. Maybe .01 is good.
 * @returns Centroids (list of points) and voronoi d3 object
 */
export default function lloydVoronoi(w, h, n, tolFraction) {
    let centroids = randomPoints(w, h, n)
    let converged = false
    let voronoi
    let polygons
    const tol = tolFraction * Math.min(w, h)
    for (let i = 0; i < 1000; i++) {
        [centroids, converged, voronoi, polygons] = relax(centroids, w, h, tol)
        if (converged) return centroids
    }
    return [centroids, voronoi, polygons]
}

// https://bl.ocks.org/veltman/3d1fb70e6993d4eb2eff7112c9e7bcf4

function randomPoints(w, h, n) {
    return Array(n).fill().map(() => [Math.random() * w, Math.random() * h])
}

function relax(points, w, h, tol) {
    const delaunay = Delaunay.from(points)
    const voronoi = delaunay.voronoi([0, 0, w, h])
    const polygons = range(points.length).map((i) => voronoi.cellPolygon(i))
    const centroids = polygons.map(polygonCentroid)
    const converged = points.every((point, i) => distance2(point, centroids[i]) < tol)
    return [centroids, converged, voronoi, polygons]
}

// function relax3(points, w, h) {
//     const polygons = voronoi(points).polygons()
//     polygons.map(d3.polygonCentroid)
//     const converged = points.every((point, i) => distance2(point, centroids[i]) < 1)
//     return { centroids, converged }
// }

// cellPolygons.prototype.map = function* (mapper, thisArg) {
//     for (const val of this) {
//         yield mapper.call(thisArg, val)
//     }
// }

function distance2(x, y) {
    return x ** 2 + y ** 2
}

function range(n) {
    return [...Array(n).keys()]
}
