/**
 * Normalize the sum of the stats for a district.
 * @param {number[][]} cen - An entry in the census for a district,
 * containing the fraction of a tract in a district
 * @returns {number} normalizing parameter to multiply stat sum by.
 */
export default function getNormDistrict(cen) {
    let gfSum = 0
    for (let j = 0; j < cen.length; j++) {
        const [, , gf] = cen[j]
        gfSum += gf
    }
    const gfNorm = 1 / gfSum
    return gfNorm
}
