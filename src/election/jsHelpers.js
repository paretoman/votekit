export function range(n) {
    return [...Array(n).keys()]
}

export function jcopy(a) {
    return JSON.parse(JSON.stringify(a))
}
