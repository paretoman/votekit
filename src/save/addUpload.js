export default function addUpload(uploadCallback) {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = () => {
        const file = input.files[0]

        const reader = new FileReader()
        reader.addEventListener('load', uploadCallback)
        reader.readAsText(file)
    }

    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Upload Json'
    button.onclick = () => { input.click() }

    return button
}
