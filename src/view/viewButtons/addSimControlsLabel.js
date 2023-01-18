/** Add a label for the sim controls */
export default function addSimControlsLabel(layout) {
    const label = document.createElement('div')
    label.setAttribute('class', 'button-group-label2')
    label.innerText = 'Sim Controls:'
    layout.newElement('simControlsLabel', label)
}
