import seedrandom from '../../election/src/lib/snowpack/build/snowpack/pkg/seedrandom.js'

/**
 * Make a new random seed, if we want to.
 * @param {*} simOptions
 * @param {*} changes
 */
export default function updateSeeds(simOptions, changes) {
    if (!changes.checkAny()) return
    if (!simOptions.seedRandom) return

    const rng = seedrandom()
    const seed = Math.floor(rng() * 10000)
    simOptions.setSeeds(0, seed)
}
