export default function configFromParams(params) {
    const encoded = params.get('a')
    const string = decodeURIComponent(encoded)
    const config = JSON.parse(string)
    return config
}
