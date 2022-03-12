import ComMessenger from './ComMessenger.js'
import sandbox from './sandbox.js'

export default function doubleSandbox(config) {
    const comMessenger = new ComMessenger()

    const divLink = document.createElement('button')
    divLink.className = 'button2'
    divLink.innerText = 'linked'
    divLink.style['vertical-align'] = 'middle'
    divLink.style['min-width'] = '70px'
    divLink.style.margin = '5px'
    const toggle = () => {
        if (divLink.innerText === 'linked') {
            divLink.innerText = 'unlinked'
            comMessenger.setLinked(false)
        } else {
            divLink.innerText = 'linked'
            comMessenger.setLinked(true)
        }
    }
    divLink.onclick = toggle

    const div1 = sandbox(config, comMessenger)
    const div2 = sandbox(config, comMessenger)
    div1.style.display = 'inline-block'
    div2.style.display = 'inline-block'

    div1.style['vertical-align'] = 'top'
    div2.style['vertical-align'] = 'top'

    const div = document.createElement('div')
    div.appendChild(div1)
    div.appendChild(divLink)
    div.appendChild(div2)
    return div
}
