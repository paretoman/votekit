import hideOnClickOutside from './hideOnClickOutside.js'

export default function tooltipBox(graphic, screen) {
    const box = document.createElement('div')

    box.className = 'tooltipBox'
    box.style.position = 'absolute'

    function update() {
        const { x, y } = graphic
        if (x > screen.width * 0.5) {
            box.style.right = `${screen.width - x}px`
            box.style.left = 'unset'
        } else {
            box.style.left = `${x}px`
            box.style.right = 'unset'
        }
        if (y > screen.height * 0.5) {
            box.style.bottom = `${screen.height - y}px`
            box.style.top = 'unset'
        } else {
            box.style.top = `${y}px`
            box.style.bottom = 'unset'
        }
    }
    update()
    // box.style.width = '10px'
    // box.style.height = '10px'
    box.style.border = (screen.common.darkMode) ? '1px solid white' : '1px solid black'
    box.style.padding = '8px'
    box.style.background = (screen.common.darkMode) ? '#222' : 'white'

    let pinned = false
    /**
     * Set pinned to true or false, to keep the box persistent.
     * @param {Boolean} b
     */
    const setPin = (b) => {
        pinned = b
    }

    const hidebox = () => {
        // box.style.display = 'none'
        if (!pinned) {
            box.remove()
            return true
        }
        return false
    }

    hideOnClickOutside(box, hidebox)

    return { box, update, setPin }
}
