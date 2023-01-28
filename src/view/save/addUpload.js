export default function addUpload(uploadCallback, nameInput) {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = () => {
        const file = input.files[0]

        const reader = new FileReader()
        reader.addEventListener('load', uploadCallback)
        reader.readAsText(file)

        const { name } = file
        const nameWithoutExtension = name.split('.').slice(0, -1).join('.')
        nameInput.set(nameWithoutExtension)
    }

    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Upload Config'
    button.onclick = () => { input.click() }

    return button
}
