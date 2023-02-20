export default function sumCircle(circle, lineSet) {
    // integrate inside
    //   Need a direction for "inside" for each line.
    //   Then do a 1D consideration of what is inside.

    // for each x coordinate,
    const dx = 2
    let sum = 0
    const x1 = circle.x
    const y1 = circle.y
    const { w } = circle
    const r = 0.5 * w
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
        for (let i = 0; i < lineSet.length; i++) {
            const [ax, ay, b] = lineSet[i]
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
        }

        // count area inside lines
        const dy = high - low
        if (dy > 0) {
            const area = dy * dx
            sum += area
        }
    }
    return sum
}
