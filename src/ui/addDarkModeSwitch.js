import ButtonGroup from '../menu/ButtonGroup.js'
import { buttonWidth } from '../menu/MenuItem.js'

export default function addDarkModeSwitch(screen, draw, layout) {
    const choose = new ButtonGroup({
        label: 'Theme',
        width: buttonWidth(3),
        data: [
            { name: 'Light', value: false },
            { name: 'Dark', value: true },
        ],
        onChoose: (data) => {
            screen.setDarkMode(data.value)
            draw()
        },
    })
    choose.highlight('value', screen.darkMode)
    layout.newElement('darkModeSwitch', choose.dom)
}
