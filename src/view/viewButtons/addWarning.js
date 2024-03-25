export default function addWarning(electionOptionsMan, viewMode, layout) {
    const message = 'Elections with both geographic components and sequence components are not yet implemented. Change number of districts to 1 and number of tracts to 1 or change election sequence to general.'

    const div = document.createElement('div')
    div.className = 'warning'
    div.innerText = message

    hide()

    const observer = {
        enter: () => {},
        exit: () => {},
        update: () => {
            const optionsBag = electionOptionsMan.getOptions()
            const sayWarning = (optionsBag.useGeography === true) && (optionsBag.sequenceOptions.sequenceName !== 'general')

            if (sayWarning) {
                show()
            } else {
                hide()
            }
        },
    }
    viewMode.viewModes.one.attach(observer)
    viewMode.viewModes.sample.attach(observer)

    function show() {
        div.hidden = false
    }
    function hide() {
        div.hidden = true
    }

    layout.newElement('warning', div)
}
