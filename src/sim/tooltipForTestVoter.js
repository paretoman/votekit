import tooltipBox from './tooltipBox.js'

export default function tooltipForTestVoter(entity, screen, vote) {
    // make a html box appear

    const tbox = tooltipBox(entity, screen)
    const { box, setPin } = tbox

    box.innerText = '- Test Vote - '

    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Pin'

    button.onclick = () => {
        togglePin()
    }
    box.appendChild(button)
    let pinned = false
    function togglePin() {
        pinned = !pinned
        setPin(pinned)
        button.innerText = (pinned) ? 'Pinned' : 'Pin'
    }

    const button2 = document.createElement('button')
    button2.className = 'button2'
    button2.innerText = 'X'
    button2.onclick = () => {
        box.remove()
        entity.setE(0)
    }
    box.appendChild(button2)

    box.style.backgroundColor = vote.color
    // box.style['pointer-events'] = 'none'
    screen.tooltips.appendChild(box)

    function update(newVote) {
        box.style.backgroundColor = newVote.color
        tbox.update()
    }

    return { box, update }
}
