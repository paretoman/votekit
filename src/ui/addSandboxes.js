import sandbox from './sandbox.js'

/** Find all the divs of class "sandbox".
 * Add the sandbox as a neighbor under the same parent. */
const targets = Array.from(document.getElementsByClassName('sandbox'))
targets.forEach((target) => {
    const div = sandbox({ initialState: target.dataset.initialstate })
    const parent = target.parentNode
    parent.appendChild(div)
})
