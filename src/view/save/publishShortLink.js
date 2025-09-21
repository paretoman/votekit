import ajaxLite from './ajaxLite.js'
import getLink from './getLink.js'
import linkFromParams from './linkFromParams.js'
import orderedJsonStringify from './orderedJsonStringify.js'
import shortLinkDatabaseUrl from './shortLinkDatabaseUrl.js'

export default function publishShortLink(config, sandboxPath, nameInput, afterPublish) {
    const link = getLink(config, sandboxPath, nameInput)

    const configString = orderedJsonStringify(config)
    const shortcode = hashCode(configString)

    ajaxLite.get(shortLinkDatabaseUrl, { shortcode, link }, (res) => {
        const justGo = 1
        const success = checkResponse(res)
        if (justGo || success) {
            const name = nameInput.value
            const b = shortcode
            const params = (name === '') ? { b } : { b, name }
            const shortLink = linkFromParams(params, sandboxPath)
            afterPublish(shortLink)
            return
        }
        const shortLink = "Bad. The link didn't publish. The short link won't work."
        afterPublish(shortLink)
    })
}

function checkResponse(res) {
    if (res === '') return 0
    const resObj = JSON.parse(res)
    if (resObj.result !== 'success') return 0
    return 1
}

export function hashCode(s) { // https://stackoverflow.com/a/7616484
    let hash = 0; let i; let
        chr
    for (i = 0; i < s.length; i++) {
        chr = s.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0 // Convert to 32bit integer
    }

    // I will only use non-negative integers because it might be easier.
    // So basically, I'm setting the first bit to 0.
    const half = 2147483648
    return (hash + half) % half
}
