export default function linkFromParams(params, sandboxURL) {
    const search = urlSearchString(params)
    const currentUrlFolder = getFolder()

    const link = `${currentUrlFolder}/${sandboxURL}?${search}`
    return link
}

function urlSearchString(params) {
    const urlParams = new URLSearchParams(params)
    const search = urlParams.toString()
    return search
}

function getFolder() {
    const sp = document.location.href.split('/')
    const sl = sp.slice(0, sp.length - 1)
    const folder = sl.join('/')
    return folder
}
