import tooltipBox from './tooltipBox.js'

export default function tooltipForTestVoter(entity, screen, vote) {
    // make a html box appear

    const box = tooltipBox(entity, screen)

    box.innerText = '- Test Vote - '
    box.style.backgroundColor = vote.color
    // box.style['pointer-events'] = 'none'
    screen.tooltips.appendChild(box)

    return box
}
