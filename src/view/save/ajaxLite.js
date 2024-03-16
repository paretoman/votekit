const ajaxLite = {} // https://stackoverflow.com/a/18078705

ajaxLite.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest()
    }
    const versions = [
        'MSXML2.XmlHttp.6.0',
        'MSXML2.XmlHttp.5.0',
        'MSXML2.XmlHttp.4.0',
        'MSXML2.XmlHttp.3.0',
        'MSXML2.XmlHttp.2.0',
        'Microsoft.XmlHttp',
    ]

    let xhr
    for (let i = 0; i < versions.length; i++) {
        try {
            // eslint-disable-next-line no-undef
            xhr = new ActiveXObject(versions[i])
            break
        } catch (e) {
            // nothing
        }
    }
    return xhr
}

ajaxLite.send = function (url, callback, method, data, asyncOpt) {
    let async = asyncOpt
    if (async === undefined) {
        async = true
    }
    const x = ajaxLite.x()
    x.open(method, url, async)
    x.onreadystatechange = function () {
        if (x.readyState === 4) {
            callback(x.responseText)
        }
    }
    if (method === 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    }
    x.send(data)
}

ajaxLite.get = function (url, data, callback, async) {
    const query = []
    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    }
    ajaxLite.send(url + (query.length ? `?${query.join('&')}` : ''), callback, 'GET', null, async)
}

export default ajaxLite
