import { configToC } from './cToConfig.js'
import linkFromParams from './linkFromParams.js'

export default function getLink(config, sandboxPath, nameInput) {
    const params = {}
    const doC = 1
    if (doC) {
        params.c = configToC(config)
    } else {
        params.a = configToA(config)
    }
    const name = nameInput.value
    if (name !== '') {
        params.name = name
    }
    const link = linkFromParams(params, sandboxPath)
    return link
}

function configToA(config) {
    const string = JSON.stringify(config)
    const encoded = encodeURIComponent(string)
    return encoded
}
