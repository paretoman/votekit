import hideOnClickOutside from './hideOnClickOutside.js'

export default function tooltipBox(entity, screen) {
    const box = document.createElement('div')

    box.className = 'tooltipBox'
    box.style.position = 'absolute'

    function update() {
        if (entity.x > screen.width * 0.5) {
            box.style.right = `${screen.width - entity.x}px`
            box.style.left = 'unset'
        } else {
            box.style.left = `${entity.x}px`
            box.style.right = 'unset'
        }
        box.style.top = `${entity.y}px`
    }
    update(entity)
    // box.style.width = '10px'
    // box.style.height = '10px'
    box.style.border = '1px solid black'
    box.style.padding = '4px'
    box.style.background = 'white'

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
