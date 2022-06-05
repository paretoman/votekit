import { textPercent } from '../utilities/graphicsUtilities.js'

export default function TooltipVoteText(box) {
    const self = this

    const voteText = document.createElement('div')
    box.append(voteText)

    self.update = (vote, color, colorSet) => {
        // box.style.backgroundColor = color
        // const makeSpan = (c) => `<span style="background-color:${c};">&#9638;</span>`
        const makeSpan = (c) => `<span style="color:${c};">&#9632;</span>` // crosshatch: &#9638; square: &#9632; large black square: &#11035;

        if (vote.ranking) {
            voteText.innerHTML = vote.ranking.map((c, i) => makeSpan(colorSet[i]) + c).join('<br />')
        } else if (vote.tallyFractions) {
            voteText.innerHTML = vote.tallyFractions.map(textPercent).map((c, i) => makeSpan(colorSet[i]) + c).join('<br />')
        }
    }
}
