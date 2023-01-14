/** @module */

/**
 * Check if the URL is giving a configuration.
 * @returns {Object} - Property yes means we have a config to use from the URL.
 */
export default function checkURL() {
    const { search } = window.location
    const params = new URLSearchParams(search)
    const yes = params.has('a')

    let config = {}
    if (yes) config = configFromParams(params)

    return { yes, config }
}

function configFromParams(params) {
    const encoded = params.get('a')
    const string = decodeURIComponent(encoded)
    const config = JSON.parse(string)
    return config
}
