export default function equidistantLine(c1, c2) {
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
