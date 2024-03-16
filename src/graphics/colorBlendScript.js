/* eslint-disable no-nested-ternary */
// https://codepen.io/darsain/pen/XpgMGp

const r = Math.round

export function toRGBA(d1) {
    const l = d1.length
    const rgba = Array(4).fill()
    if (d1.slice(0, 3).toLowerCase() === 'rgb') {
        const d = d1.replace(' ', '').split(',')
        rgba[0] = parseInt(d[0].slice(d[3].toLowerCase() === 'a' ? 5 : 4), 10)
        rgba[1] = parseInt(d[1], 10)
        rgba[2] = parseInt(d[2], 10)
        rgba[3] = d[3] ? parseFloat(d[3]) : -1
    } else {
        let d
        if (l < 6) d = parseInt(String(d1[1]) + d1[1] + d1[2] + d1[2] + d1[3] + d1[3] + (l > 4 ? String(d1[4]) + d1[4] : ''), 16)
        else d = parseInt(d1.slice(1), 16)
        rgba[0] = (d >> 16) & 255
        rgba[1] = (d >> 8) & 255
        rgba[2] = d & 255
        rgba[3] = l === 9 || l === 5 ? r((((d >> 24) & 255) / 255) * 10000) / 10000 : -1
    }
    return rgba
}

export function blend(from1, to1, p1 = 0.5) {
    const from = from1.trim()
    const to = to1.trim()
    const b = p1 < 0
    const p = b ? p1 * -1 : p1
    const f = toRGBA(from)
    const t = toRGBA(to)

    if (to[0] === 'r') {
        return `rgb${to[3] === 'a' ? 'a(' : '('
        }${r(Math.sqrt(t[0] ** 2 * p + f[0] ** 2 * (1 - p)))},${
            r(Math.sqrt(t[1] ** 2 * p + f[1] ** 2 * (1 - p)))},${
            r(Math.sqrt(t[2] ** 2 * p + f[2] ** 2 * (1 - p)))
        }${f[3] < 0 && t[3] < 0 ? '' : `,${
            f[3] > -1 && t[3] > -1
                ? r(Math.sqrt(t[3] ** 2 * p + f[3] ** 2 * (1 - p)) * 10000) / 10000
                : t[3] < 0 ? f[3] : t[3]}`})`
    }

    return `#${(0x100000000 + ((
        f[3] > -1 && t[3] > -1
            ? r(Math.sqrt((t[3] ** 2 * p + f[3] ** 2 * (1 - p))) * 255)
            : t[3] > -1 ? r(t[3] * 255) : f[3] > -1 ? r(f[3] * 255) : 255
    ) * 0x1000000)
    + (r(Math.sqrt(t[0] ** 2 * p + f[0] ** 2 * (1 - p))) * 0x10000)
        + (r(Math.sqrt(t[1] ** 2 * p + f[1] ** 2 * (1 - p))) * 0x100)
        + r(Math.sqrt(t[2] ** 2 * p + f[2] ** 2 * (1 - p)))
    ).toString(16).slice(f[3] > -1 || t[3] > -1 ? 1 : 3)}`
}
