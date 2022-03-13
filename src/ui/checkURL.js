/**
 * Check if the URL is giving a configuration.
 * @returns {Object} - Property yes means we have a config to use from the URL.
 */
export default function checkURL() {
    const urlParams = new URLSearchParams(window.location.search)

    const yes = urlParams.has('a')

    const config = yes ? JSON.parse(urlParams.get('a')) : {}

    return { yes, config }
}
