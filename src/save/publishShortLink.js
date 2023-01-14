import ajaxLite from '../utilities/ajaxLite.js'
import { hashCode } from '../utilities/jsHelpers.js'
import getLink from './getLink.js'
import linkFromParams from './linkFromParams.js'
import shortLinkDatabaseUrl from './shortLinkDatabaseUrl.js'

export default function publishShortLink(config, sandboxURL, afterPublish) {
    const link = getLink(config, sandboxURL)
    const shortcode = hashCode(link)

    ajaxLite.get(shortLinkDatabaseUrl, { shortcode, link }, (res) => {
        if (res !== '') {
            const resObj = JSON.parse(res)
            if (resObj.result === 'success') {
                const shortLink = linkFromParams({ b: shortcode }, sandboxURL)
                afterPublish(shortLink)
                return
            }
        }
        const shortLink = "Bad. The link didn't publish. The short link won't work."
        afterPublish(shortLink)
    })
}
