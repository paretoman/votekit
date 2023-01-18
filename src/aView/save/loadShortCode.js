import ajaxLite from '../../utilities/ajaxLite.js'
import configFromParams from './configFromParams.js'
import shortLinkDatabaseUrl from './shortLinkDatabaseUrl.js'

export default function loadShortCode(shortcode, checkURLCallback) {
    ajaxLite.get(shortLinkDatabaseUrl, { shortcode, link: 'getTable' }, (res) => {
        // do the load config again, basically

        const resObj = JSON.parse(res)
        const { link } = resObj
        const url = new URL(link)
        const { search } = url
        const params = new URLSearchParams(search)

        const config = configFromParams(params)
        checkURLCallback({ yes: true, config })
    })
}
