import checkURL from './checkURL.js'

export default function loadView(configURL, targetConfig, init, nameInput) {
    checkURL(configURL, nameInput, checkUrlCallback)

    function checkUrlCallback(cu) {
        const config = (cu.yes) ? cu.config : targetConfig
        init(config)
    }
}
