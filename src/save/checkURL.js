/** @module */

import configFromParams from './configFromParams.js'
import loadShortCode from './loadShortCode.js'

/**
 * Check if the URL is giving a configuration.
 * Three cases:
 * 1. No config in url
 * 2. Long config in url
 * 3. Short code in url that requires a database lookup.
 * Then use a callback since we might have to wait for the database.
 */
export default function checkURL(configURL, checkUrlCallback) {
    const { search } = configURL
    const params = new URLSearchParams(search)
    const a = params.has('a')
    const b = params.has('b')
    const yes = a || b

    if (a) {
        const config = configFromParams(params)
        checkUrlCallback({ yes, config })
        return
    }
    if (b) {
        const shortcode = params.get('b')
        loadShortCode(shortcode, checkUrlCallback)
        return
    }
    const config = {}
    checkUrlCallback({ yes, config })
}
