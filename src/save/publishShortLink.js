import ajaxLite from '../utilities/ajaxLite.js'
import { hashCode, orderedJsonStringify } from '../utilities/jsHelpers.js'
import getLink from './getLink.js'
import linkFromParams from './linkFromParams.js'
import shortLinkDatabaseUrl from './shortLinkDatabaseUrl.js'

export default function publishShortLink(config, sandboxPath, nameInput, afterPublish) {
    const link = getLink(config, sandboxPath, nameInput)

    const configString = orderedJsonStringify(config)
    const shortcode = hashCode(configString)

    ajaxLite.get(shortLinkDatabaseUrl, { shortcode, link }, (res) => {
        if (res !== '') {
            const resObj = JSON.parse(res)
            if (resObj.result === 'success') {
                const name = nameInput.value
                const b = shortcode
                const params = (name === '') ? { b } : { b, name }
                const shortLink = linkFromParams(params, sandboxPath)
                afterPublish(shortLink)
                return
            }
        }
        const shortLink = "Bad. The link didn't publish. The short link won't work."
        afterPublish(shortLink)
    })
}
