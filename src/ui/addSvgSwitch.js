import ButtonGroup from '../menu/ButtonGroup.js'
import { buttonWidth } from '../menu/MenuItem.js'

export default function addSvgSwitch(screenCommon, changes, layout) {
    const choose = new ButtonGroup({
        label: 'Drawing Mode:',
        width: buttonWidth(3),
        data: [
            { name: 'Canvas', value: false },
            { name: 'SVG', value: true },
        ],
        onChoose: (data) => {
            screenCommon.setSvgMode(data.value)
            changes.add(['rerender'])
        },
    })
    choose.highlight('value', screenCommon.svgMode)
    layout.newElement('svgSwitch', choose.dom)
}
