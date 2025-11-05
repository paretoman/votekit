import def from 'lz-string'

const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = def
// import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
// don't know why but we do import this way
// maybe just use vite in the future and build a hack-friendly site separately

export function compress(jsonString2) {
    return compressToEncodedURIComponent(jsonString2).replace(/\+/g, '~')
}
export function decompress(compressedUrlString) {
    return decompressFromEncodedURIComponent(compressedUrlString.replace(/~/g, '+'))
}
