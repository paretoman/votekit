/**
 * Update VoterGeoms for each District
 * Districts are composed of voter geoms.
 * A tract has a set of voter geoms.
 * The overlap between a district and a tract determines the density of the voter geom in the district.
 *  */
export default function makeVoterGeomsByDistrict(census, voterGeomsByTract) {
    const nDistricts = census.length
    const voterGeomsByDistrict = []
    for (let k = 0; k < nDistricts; k++) {
        const cen = census[k]
        const voterGeoms = []
        for (let j = 0; j < cen.length; j++) {
            const [gx, gy, gf] = cen[j]
            const voterGeomsForTract = voterGeomsByTract[gx][gy]
            // Adjust the weight of each voter geometry by the tract's weight in the census.
            for (let i = 0; i < voterGeomsForTract.length; i++) {
                const voterGeom = { ...voterGeomsForTract[i] }
                voterGeom.densityMax *= gf
                voterGeoms.push(voterGeom)
            }
        }
        voterGeomsByDistrict.push(voterGeoms)
    }
    return voterGeomsByDistrict
}
