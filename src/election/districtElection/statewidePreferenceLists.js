export default function statewidePreferenceLists(votesByTract) {
    const tallyNames = Object.keys(votesByTract[0][0].preferenceLists)

    const preferenceLists = {}
    for (let i = 0; i < tallyNames.length; i++) {
        const tallyName = tallyNames[i]

        const preferencesAll = concatPreferenceListsStatewide(tallyName, votesByTract)
        preferenceLists[tallyName] = preferencesAll
    }

    return preferenceLists
}
function concatPreferenceListsStatewide(tallyName, votesByTract) {
    // concatenate preferences
    let preferencesAll = []
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const preferences = votes.preferenceLists[tallyName]
                preferencesAll = preferencesAll.concat(preferences)
            },
        ),
    )
    return preferencesAll
}
