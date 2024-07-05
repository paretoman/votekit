const invPi = 1 / Math.PI

export default function circleCDF(x,m,r) {
    let z = (x - m)/r
    if (z > 1) return 1
    else if (z < -1) return 0
    const areaFromCenter = z * Math.sqrt(1 - z * z)  + Math.asin(z)
    return areaFromCenter * invPi + .5
}