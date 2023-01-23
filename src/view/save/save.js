import addSaveConfigToText from './addSaveConfigToText.js'
import addLoadConfigText from './addLoadConfigText.js'
import addSaveConfigToLink from './addSaveConfigToLink.js'
import addSaveConfigToShortLink from './addSaveConfigToShortLink.js'
import addName from './addName.js'
import addSaveData from './addSaveData.js'
import ViewDownload from './viewDownload.js'
/**
 * Make buttons for the sandbox.
 * @param {*} sim
 * @param {*} layout
 * @param {*} sandboxPath
 */
export default function save(sim, layout, sandboxPath) {
    const {
        commander, changes, pub,
    } = sim

    const nameInput = addName(layout)
    addSaveConfigToLink(layout, commander, sandboxPath, nameInput)
    addSaveConfigToShortLink(layout, commander, sandboxPath, nameInput)
    addSaveConfigToText(layout, commander, nameInput)
    addLoadConfigText(layout, commander, nameInput)

    const viewDownload = new ViewDownload(pub, changes)
    addSaveData(layout, nameInput, viewDownload)

    return { nameInput }
}
