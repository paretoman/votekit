// @ts-nocheck

/**
 * Clips a polygon with another polygon to return a polygon.
 * Polygons must be counter-clockwise.
 * https://observablehq.com/@d3/polygonclip@1237
 * @param {number[][]} clip - polygon
 * @param {number[][]} subject0 - polygon, gets mutated
 * @returns {[number,number][]} - polygon
 */
export default function polygonClip(clip, subject0) {
    const closed = polygonClosed(subject0)
    const n = clip.length - polygonClosed(clip)
    const subject = subject0.slice() // copy before mutate
    for (let i = 0, a = clip[n - 1], b, c, d; i < n; ++i) {
        const input = subject.slice()
        const m = input.length - closed
        subject.length = 0
        b = clip[i]
        c = input[m - 1]
        for (let j = 0; j < m; ++j) {
            d = input[j]
            if (lineOrient(d, a, b)) {
                if (!lineOrient(c, a, b)) {
                    subject.push(lineIntersect(c, d, a, b))
                }
                subject.push(d)
            } else if (lineOrient(c, a, b)) {
                subject.push(lineIntersect(c, d, a, b))
            }
            c = d
        }
        if (closed) subject.push(subject[0])
        a = b
    }
    return subject.length ? subject : null
}
function lineOrient([px, py], [ax, ay], [bx, by]) {
    return (bx - ax) * (py - ay) < (by - ay) * (px - ax)
}
function lineIntersect([ax, ay], [bx, by], [cx, cy], [dx, dy]) {
    const bax = bx - ax; const bay = by - ay; const dcx = dx - cx; const
        dcy = dy - cy
    const k = (bax * (cy - ay) - bay * (cx - ax)) / (bay * dcx - bax * dcy)
    return [cx + k * dcx, cy + k * dcy]
}
function polygonClosed(points) {
    const [ax, ay] = points[0]; const
        [bx, by] = points[points.length - 1]
    return ax === bx && ay === by
}
export function polygonConvex(points) {
    const n = points.length
    const [rx, ry] = points[n - 2]
    let [qx, qy] = points[n - 1]
    let vx = rx - qx; let
        vy = ry - qy
    for (let i = 0; i < n; ++i) {
        const [px, py] = points[i]
        const wx = qx - px; const
            wy = qy - py
        if (wx * vy < wy * vx) return false
        if (wx || wy) {
            vx = wx
            vy = wy
        }
        qx = px
        qy = py
    }
    return true
}

export function testClip() {
    const subject = [
        [79, 200], [266, 100],
        [452, 200],
        [359, 450],
        [172, 420]]
    const clip = [[210, 90], [110, 400], [420, 400], [490, 250]]

    return polygonClip(clip, subject)
}
