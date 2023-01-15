import linkFromParams from './linkFromParams.js'

export default function getLink(config, sandboxURL, nameInput) {
    const string = JSON.stringify(config)
    const encoded = encodeURIComponent(string)

    const a = encoded
    const name = nameInput.value
    const params = (name === '') ? { a } : { a, name }
    const link = linkFromParams(params, sandboxURL)
    return link
}
