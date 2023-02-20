export default function districtPreferenceLists(votesByTract, cen) {
    const tallyNames = Object.keys(votesByTract[0][0].preferenceLists)

    const preferenceLists = {}
    for (let i = 0; i < tallyNames.length; i++) {
        const tallyName = tallyNames[i]

        const preferencesAll = concatPreferenceListsDistrict(tallyName, votesByTract, cen)
        preferenceLists[tallyName] = preferencesAll
    }

    return preferenceLists
}
function concatPreferenceListsDistrict(tallyName, votesByTract, cen) {
    // concatenate preferences
    const preferencesAll = []
    for (let j = 0; j < cen.length; j++) {
        const [gx, gy] = cen[j]
        const votesInTract = votesByTract[gx][gy]
        const preferences = votesInTract.preferenceLists[tallyName]

        // concat
        // preferencesAll.push(...preferences)
        const n1 = preferencesAll.length
        const n2 = preferences.length
        preferencesAll.length += preferences.length
        for (let i = 0; i < n2; i++) {
            preferencesAll[n1 + i] = preferences[i]
        }
    }
    return preferencesAll
}
