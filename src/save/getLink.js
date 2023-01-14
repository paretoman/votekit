import linkFromParams from './linkFromParams.js'

export default function getLink(config, sandboxURL) {
    const string = JSON.stringify(config)
    const encoded = encodeURIComponent(string)

    const link = linkFromParams({ a: encoded }, sandboxURL)
    return link
}
