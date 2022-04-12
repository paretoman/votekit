import hideOnClickOutside from './hideOnClickOutside.js'

export default function tooltipBox(entity, screen) {
    const box = document.createElement('div')

    box.style.position = 'absolute'
    if (entity.x > screen.width * 0.5) {
        box.style.right = `${screen.width - entity.x}px`
    } else {
        box.style.left = `${entity.x}px`
    }
    box.style.top = `${entity.y}px`
    // box.style.width = '10px'
    // box.style.height = '10px'
    box.style.border = '1px solid black'
    box.style.padding = '4px'
    box.style.background = 'white'

    const hidebox = () => {
        // box.style.display = 'none'
        box.remove()
    }

    hideOnClickOutside(box, hidebox)

    return box
}
