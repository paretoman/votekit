import checkURL from './checkURL.js'

export default function loadView(targetConfig, init) {
    checkURL(checkUrlCallback)

    function checkUrlCallback(cu) {
        const config = (cu.yes) ? cu.config : targetConfig
        init(config)
    }
}
