import def from 'lz-string'

const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = def
// import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
// don't know why but we do import this way
// maybe just use vite in the future and build a hack-friendly site separately

export function compress(jsonString2) {
    const mid = compressToEncodedURIComponent(jsonString2)
    return mid.replace(/\+/g, '.').replace(/-/g, '_')
}
export function decompress(compressedUrlString) {
    const mid = compressedUrlString.replace(/\./g, '+').replace(/_/g, '-')
    return decompressFromEncodedURIComponent(mid)
}
