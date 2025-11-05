// Go from string in the URI to a configuration. And inverse.
import { compress, decompress } from './compression.js'
import { decodingDictionary, encodingDictionary } from './dictionary.js'
import { decodeObject, encodeObject } from './encoding.js'

export function cToConfig(c) {
    return decodeObject(JSON.parse(decompress(c)), decodingDictionary)
}

export function configToC(config) {
    return compress(JSON.stringify(encodeObject(config, encodingDictionary)))
}
