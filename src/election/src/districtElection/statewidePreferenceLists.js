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
    const preferencesAll = []
    votesByTract.forEach(
        (row) => row.forEach(
            (votes) => {
                const preferences = votes.preferenceLists[tallyName]

                // concat
                // preferencesAll.push(...preferences)
                const n1 = preferencesAll.length
                const n2 = preferences.length
                preferencesAll.length += preferences.length
                for (let i = 0; i < n2; i++) {
                    preferencesAll[n1 + i] = preferences[i]
                }
            },
        ),
    )
    return preferencesAll
}
