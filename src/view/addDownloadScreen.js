import ButtonGroup from '../menu/ButtonGroup.js'
import { buttonWidth } from '../menu/MenuItem.js'

export default function addDownloadScreen(screenCommon, layout) {
    const choose = new ButtonGroup({
        label: 'Show Link to Download Screen Image/SVG:',
        width: buttonWidth(3),
        data: [
            { name: 'Yes', value: true },
            { name: 'No', value: false },
        ],
        onChoose: (data) => {
            screenCommon.setShowDownloadScreenLink(data.value)
        },
    })
    choose.highlight('value', screenCommon.svgMode)
    layout.newElement('showDownloadScreenLink', choose.dom)
}
