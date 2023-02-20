import getNormStatewide from './getNormStatewide.js'

export default function statewidePreferenceTallies(votesByTract) {
    const tallyNames = Object.keys(votesByTract[0][0].preferenceTallies)

    const preferenceTallies = {}
    for (let i = 0; i < tallyNames.length; i++) {
        const tallyName = tallyNames[i]

        const tallyAll = concatPreferenceTalliesStatewide(tallyName, votesByTract)
        preferenceTallies[tallyName] = tallyAll
    }

    return preferenceTallies
}

function concatPreferenceTalliesStatewide(tallyName, votesByTract) {
    // concatenate tallies and normalize
    let tallyAll = []
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const tally = votes.preferenceTallies[tallyName]

                // concat
                // tallyAll.push(...tally)
                const n1 = tallyAll.length
                const n2 = tally.length
                tallyAll.length += tally.length
                for (let i = 0; i < n2; i++) {
                    tallyAll[n1 + i] = tally[i]
                }
            },
        ),
    )
    const dNorm = getNormStatewide(votesByTract)
    tallyAll = tallyAll.map((t) => t * dNorm)
    return tallyAll
}
