export default function addName(layout) {
    const label = document.createElement('label')
    label.className = 'button-group-label2'
    label.innerText = 'Name: '

    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = ''

    const div = document.createElement('div')
    div.appendChild(label)
    div.appendChild(input)

    layout.newElement('name', div)
    return input
}
