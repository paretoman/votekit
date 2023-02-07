import { copyObjectShallow } from '../../utilities/jsHelpers.js'

/**
 * Update VoterGeoms for each Tract
 * The set of voter basis geoms is repeated at every census tract on the district map,
 * but it is altered by translating it in policy space with a little noise
 * to represent differences due to geography
 *  */
export function voterGeomsByTract1D(voterGeoms, tractNoise) {
    return tractNoise.map(
        (rowNoise) => rowNoise.map(
            (cellNoise) => voterGeoms.map(
                (vg) => {
                    const [xNoise] = cellNoise
                    const shape1 = copyObjectShallow(vg)
                    shape1.x += xNoise
                    return shape1
                },
            ),
        ),
    )
}
export default function voterGeomsByTract2D(voterGeoms, tractNoise) {
    return tractNoise.map(
        (rowNoise) => rowNoise.map(
            (cellNoise) => voterGeoms.map(
                (vg) => {
                    const [xNoise, yNoise] = cellNoise
                    const shape2 = copyObjectShallow(vg)
                    shape2.x += xNoise
                    shape2.y += yNoise
                    return shape2
                },
            ),
        ),
    )
}
