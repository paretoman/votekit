import seedrandom from '../../election/src/lib/snowpack/build/snowpack/pkg/seedrandom.js'

export default function buttonsForSeeds(viewMode, simOptions, layout) {
    const seedButtons = document.createElement('div')

    const randomize = document.createElement('button')
    randomize.className = 'button2'
    randomize.innerText = 'Randomize'

    randomize.onclick = () => {
        const rng = seedrandom()
        const seed = Math.floor(rng() * 1000000)
        simOptions.setSeeds(0, seed)
    }
    seedButtons.append(randomize)

    viewMode.viewModes.sample.attach({
        enter: show,
        exit: hide,
        update: () => {},
    })
    function show() { seedButtons.hidden = false }
    function hide() { seedButtons.hidden = true }
    hide()

    layout.newElement('seeds', seedButtons)
}
