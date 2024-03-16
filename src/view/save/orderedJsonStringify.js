export default function orderedJsonStringify(obj) {
    return JSON.stringify(sortObjByKey(obj), null, '\t')
}

/** https://stackoverflow.com/a/35810961 */
function sortObjByKey(value) {
    // eslint-disable-next-line no-nested-ternary
    return (typeof value === 'object')
        ? (Array.isArray(value)
            ? value.map(sortObjByKey)
            : Object.keys(value).sort().reduce((o, key) => {
                const v = value[key]
                // eslint-disable-next-line no-param-reassign
                o[key] = sortObjByKey(v)
                return o
            }, {})
        )
        : value
}
