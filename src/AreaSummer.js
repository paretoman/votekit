/** @module */

/**
 * Sum area of voter distributions to tally the votes.
 * @param {*} cans
 */
export default function AreaSummer(cans) {
    const self = this

    const lines = findLines(cans)

    // todo: figure out if this is really just a function rather than a class.

    self.sumArea = function sumArea(voterGroup) {
        // draw lines across shape of voterGroup

        const n = lines.length
        const area = Array(n)
        for (let i = 0; i < n; i++) {
            const lineSet = lines[i]
            // return area for each candidate
            area[i] = sumCircle(voterGroup, lineSet)
        }
        return area
    }
}

function findLines(cans) {
    // find all lines
    const n = cans.length
    const lines = new Array(n) // each candidate has a set of lines for themselves
    for (let i = 0; i < n; i++) {
        lines[i] = []
        for (let k = 0; k < n; k++) {
            // skip sames
            if (i === k) continue
            // find equation for a line
            const c1 = cans[i]
            const c2 = cans[k]
            // lines[i][k] = equidistantLine(c1,c2) // problem when i === k
            lines[i].push(equidistantLine(c1, c2))
        }
    }

    return lines
}

export function testEquidistantLine(eq, assert) {
    // Takes an assertion function.
    // Returns a test function.

    return [{
        label: 'Finds line equation equidistant from two points.',
        test: () => {
            const m = equidistantLine({ x: 0, y: 0 }, { x: 1, y: 1 })
            const e = { A: { x: 1, y: 1 }, b: 1 }
            eq(e.A.x / e.b, m.A.x / m.b)
            eq(e.A.y / e.b, m.A.y / m.b)
        },
    }, {
        label: 'The first point satisfies Ac < b. A[0,0] < b. ',
        test: () => {
            const m = equidistantLine({ x: 0, y: 0 }, { x: 1, y: 1 })
            assert(m.b > 0)
        },
    },
    ]
}

function equidistantLine(c1, c2) {
    // Ac < b
    // this is the condition that x counts for a candidate.

    // line equidistant from two points
    // https://math.stackexchange.com/a/771773

    // difference between points
    const dx = c2.x - c1.x
    const dy = c2.y - c1.y

    // midpoint between points
    const mx = (c1.x + c2.x) * 0.5
    const my = (c1.y + c2.y) * 0.5

    // equation for line
    // (y-my) / (x-mx) = - dx / dy
    // implies y * dy - my * dy = - x * dx + mx * dx
    // implies dx * x + dy * y = mx * dx + my * dy
    // rename to A = [dx;dy]
    //           b = mx * dx + my * dy
    const A = { x: dx, y: dy }
    const b = mx * dx + my * dy

    // is c1 or c2 closer?
    // c1 is closer is equivalent to Ac < b

    return { A, b }
}

function sumCircle(circle, lineSet) {
    // integrate inside
    //   Need a direction for "inside" for each line.
    //   Then do a 1D consideration of what is inside.

    // for each x coordinate,
    const dx = 2
    let sum = 0
    const x1 = circle.x
    const y1 = circle.y
    const { r } = circle
    // x only goes from x1-r to x1+r
    for (let x = x1 - r; x < x1 + r; x += dx) {
        // find bounds

        // find equation for circle

        // (y - y1)**2 + (x-x1)**2 < r**2
        const diff2 = r ** 2 - (x - x1) ** 2
        let half
        if (diff2 > 0) {
            half = Math.sqrt(diff2)
        } else {
            half = 0
        }
        let high = y1 + half
        let low = y1 - half

        // for each of the constraints, figure out if it is an upper or lower bound,
        // then adjust the bound.
        // The y coefficient tells us whether this is an upper or lower bound.
        // Imagine infinite +y.
        // If the y coefficient is negative, then Ac < b, and Ac = b is a lower bound.
        // A.x * x + A.y * y = b
        // y = (b - A.x * x) / A.y
        lineSet.forEach((line) => {
            const ay = line.A.y
            const ax = line.A.x
            const { b } = line
            if (ay === 0) {
                if (ax * x < b) {
                    // no bounds
                } else {
                    low = Infinity // bounded by x
                }
                // not handling 0,0 case
            } else {
                const y2 = (b - ax * x) / ay
                if (ay < 0) {
                    low = Math.max(low, y2)
                } else {
                    high = Math.min(high, y2)
                }
            }
        })

        // count area inside lines
        const dy = high - low
        if (dy > 0) {
            const area = dy * dx
            sum += area
        }
    }
    return sum
}
