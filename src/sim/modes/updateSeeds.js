import seedrandom from 'seedrandom'

/**
 * Make a new random seed, if we want to.
 * @param {*} simOptions
 * @param {*} changes
 */
export default function updateSeeds(simOptions, changes) {
    if (!changes.checkAny()) return

    // debug with console log
    // console.log(simOptions.seeds[0])

    if (!simOptions.seedRandom) return
    if (changes.check(['init', 'seeds'])) return

    const rng = seedrandom()
    const seed = Math.floor(rng() * 10000)
    simOptions.setSeeds(0, seed)

    // console.log(`->${simOptions.seeds[0]}`)
}
