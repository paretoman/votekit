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
    let preferencesAll = []
    for (let j = 0; j < cen.length; j++) {
        const [gx, gy] = cen[j]
        const votesInTract = votesByTract[gx][gy]
        const preferences = votesInTract.preferenceLists[tallyName]
        preferencesAll = preferencesAll.concat(preferences)
    }
    return preferencesAll
}
