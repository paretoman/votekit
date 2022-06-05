import tooltipBox from './tooltipBox.js'
import TooltipVoteText from './TooltipVoteText.js'

export default function tooltipForTestVoter(entity, screen) {
    // make a html box appear

    const tbox = tooltipBox(entity, screen)
    const { box, setPin } = tbox

    box.innerText = 'Vote'
    box.style['min-width'] = '100px'

    const button = document.createElement('button')
    // button.className = 'button2'
    button.style['min-width'] = '35px'
    button.style.float = 'right'
    button.style.clear = 'right'

    button.onclick = () => {
        togglePin()
    }
    let pinned = true
    function togglePin() {
        pinned = !pinned
        setPin(pinned)
        // button.innerText = (pinned) ? 'Pinned' : 'Pin'
        button.innerHTML = (pinned) ? '&#x1F6AB;' : '&#x1F4CC;'
    }
    togglePin()

    const button2 = document.createElement('button')
    // button2.className = 'button2'
    button2.style.float = 'right'
    button2.style['min-width'] = '35px'
    button2.style['font-size'] = '10px'
    button2.innerHTML = '&#x2573;'
    button2.onclick = () => {
        box.remove()
        entity.setE(0)
    }
    box.appendChild(button2)
    box.appendChild(button)

    const tooltipVoteText = new TooltipVoteText(box)

    // box.style['pointer-events'] = 'none'
    screen.tooltips.appendChild(box)

    function update(vote, color, colorSet) {
        tbox.update()
        tooltipVoteText.update(vote, color, colorSet)
    }

    return { box, update }
}
