import { textPercent } from '../utilities/graphicsUtilities.js'
import tooltipBox from './tooltipBox.js'

export default function tooltipForTestVoter(entity, screen) {
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

    const voteText = document.createElement('div')
    box.append(voteText)

    // box.style['pointer-events'] = 'none'
    screen.tooltips.appendChild(box)

    function update(vote, color, colorSet) {
        // box.style.backgroundColor = color
        // const makeSpan = (c) => `<span style="background-color:${c};">&#9638;</span>`
        const makeSpan = (c) => `<span style="color:${c};">&#9632;</span>` // crosshatch: &#9638; square: &#9632; large black square: &#11035;
        voteText.innerHTML = vote.tallyFractions.map(textPercent).map((c, i) => makeSpan(colorSet[i]) + c).join('<br />')
        tbox.update()
    }

    return { box, update }
}
