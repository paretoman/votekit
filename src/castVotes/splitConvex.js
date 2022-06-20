/**
 * Beware, points are references to old points, so make sure to make a copy afterward.
 * @param {Number[][]} points
 * @param {Number[]} plane
 * @returns
 */
export default function splitConvex(points, plane) {
    // put all points on either the positive or negative side of the plane.
    // When we cross to the other side, we create a point in the middle and add it to both.
    const n = points.length
    const pos = []
    const neg = []
    let iPos = 0
    let iNeg = 0

    let a = points[n - 1]
    let aNeg = calcNeg(plane, a)
    for (let i = 0; i < n; i++) {
        const b = points[i]
        const bNeg = calcNeg(plane, b)
        if ((aNeg && !bNeg) || (!aNeg && bNeg)) {
            const da = calcDist(plane, a)
            const db = calcDist(plane, b)
            const m = lerp(a, b, da, db)
            pos[iPos] = m
            neg[iNeg] = m
            iPos += 1
            iNeg += 1
        }
        if (bNeg) {
            neg[iNeg] = b
            iNeg += 1
        } else {
            pos[iPos] = b
            iPos += 1
        }
        a = b
        aNeg = bNeg
    }

    return { positive: pos, negative: neg }
}

function calcDist(plane, point) {
    // https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
    const numerator = plane[0] * point[0] + plane[1] * point[1] + plane[2]
    const denominator = Math.sqrt(plane[0] ** 2 + plane[1] ** 2)
    return numerator / denominator
}

function calcNeg(plane, point) {
    const numerator = plane[0] * point[0] + plane[1] * point[1] + plane[2]
    return numerator < 0
}

function lerp(a, b, da, db) {
    const d = da - db
    let f = -db / d
    if (f < 0) f = 0
    if (f > 1) f = 1
    const n = [
        f * a[0] + (1 - f) * b[0],
        f * a[1] + (1 - f) * b[1],
    ]
    return n
}
