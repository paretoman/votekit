export default function getLink(config, sandboxURL) {
    const search = urlSearchString(config)
    const currentUrlFolder = getFolder()

    const link = `${currentUrlFolder}/${sandboxURL}?${search}`
    return link
}

function urlSearchString(config) {
    const string = JSON.stringify(config)
    const encoded = encodeURIComponent(string)
    const params = new URLSearchParams({ a: encoded })
    const search = params.toString()
    return search
}

function getFolder() {
    const sp = document.location.href.split('/')
    const sl = sp.slice(0, sp.length - 1)
    const folder = sl.join('/')
    return folder
}
