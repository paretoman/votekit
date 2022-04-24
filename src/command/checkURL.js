/** @module */

/**
 * Check if the URL is giving a configuration.
 * @returns {Object} - Property yes means we have a config to use from the URL.
 */
export default function checkURL() {
    const url = window.location.search
    const urlParams = new URLSearchParams(url)

    const yes = urlParams.has('a')

    const config = yes ? JSON.parse(getParameterByName('a', url)) : {}

    return { yes, config }
}

function getParameterByName(name, url) {
    const name2 = name.replace(/[[\]]/g, '\\$&')
    const regex = new RegExp(`[?&]${name2}(=([^&#]*)|&|#|$)`)
    const results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' ')).replace('}/', '}') // not sure how that / got there.
}
