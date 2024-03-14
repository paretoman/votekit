import * as typesMath from '../../types/typesMath.js'
/**
 * Make line equidistant from two points.
 * The line can be used to determine if a new point c is closer to c1 or c2.
 * For the line [ax, ay, b] and point c = [x,y], ax * x + ay * y + b < 0 means the point c is closer to c1.
 * @param {number[]} c1
 * @param {number[]} c2
 * @returns {typesMath.lineHomogeneous}
 */
export default function equidistantLine(c1, c2) {
    const [c1x, c1y] = c1
    const [c2x, c2y] = c2

    // ax * x + ay * y + b < 0
    // this is the condition that x counts for a candidate.

    // line equidistant from two points
    // https://math.stackexchange.com/a/771773

    // difference between points
    const dx = c2x - c1x
    const dy = c2y - c1y

    // midpoint between points
    const mx = (c1x + c2x) * 0.5
    const my = (c1y + c2y) * 0.5

    // equation for line
    // (y-my) / (x-mx) = - dx / dy
    // implies y * dy - my * dy = - x * dx + mx * dx
    // implies dx * x + dy * y = mx * dx + my * dy
    // rename to A = [dx;dy]
    //           b = -(mx * dx + my * dy)
    const ax = dx
    const ay = dy
    const b = -(mx * dx + my * dy)

    // is c1 or c2 closer?
    // c1 is closer is equivalent to ax * x + ay * y + b < 0

    return [ax, ay, b]
}
