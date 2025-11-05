import { cToConfig } from './cToConfig.js'

export default function configFromParams(params) {
    const a = params.has('a')
    if (a) {
        return aConfig(params)
    } // else c
    return cConfig(params)
}

function aConfig(params) {
    const encoded = params.get('a')
    const string = decodeURIComponent(encoded)
    const config = JSON.parse(string)
    return config
}

function cConfig(params) {
    const c = params.get('c')
    const config = cToConfig(c)
    return config
}
