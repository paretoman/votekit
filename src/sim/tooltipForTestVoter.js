import tooltipBox from './tooltipBox.js'

export default function tooltipForTestVoter(entity, screen, vote) {
    // make a html box appear

    const tbox = tooltipBox(entity, screen)
    const { box } = tbox

    box.innerText = '- Test Vote - '

    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'X'
    button.onclick = () => {
        box.remove()
        entity.setE(0)
    }
    box.appendChild(button)

    box.style.backgroundColor = vote.color
    // box.style['pointer-events'] = 'none'
    screen.tooltips.appendChild(box)

    function update(newVote) {
        box.style.backgroundColor = newVote.color
        tbox.update()
    }

    return { box, update }
}
