import ButtonGroup from '../menu/ButtonGroup.js'
import { buttonWidth } from '../menu/MenuItem.js'

export default function addDarkModeSwitch(screenCommon, layout, view) {
    const choose = new ButtonGroup({
        label: 'Theme',
        width: buttonWidth(3),
        data: [
            { name: 'Light', value: false },
            { name: 'Dark', value: true },
        ],
        onChoose: (data) => {
            screenCommon.setDarkMode(data.value)
            view.rerender()
        },
    })
    choose.highlight('value', screenCommon.darkMode)
    layout.newElement('darkModeSwitch', choose.dom)
}
