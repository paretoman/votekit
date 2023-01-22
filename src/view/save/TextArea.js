export default function TextArea() {
    const self = this

    self.value = ''

    self.div = document.createElement('div')

    const text = document.createElement('textarea')
    text.style.margin = '4px'
    self.div.append(text)

    const hideLink = document.createElement('button')
    hideLink.className = 'button2'
    hideLink.innerText = 'X'
    hideLink.onclick = () => { self.hide() }
    self.div.append(hideLink)

    self.show = () => {
        text.hidden = false
        hideLink.hidden = false
    }
    self.hide = () => {
        text.hidden = true
        hideLink.hidden = true
    }
    self.setText = (t) => {
        text.value = t
        self.value = t
    }
}
