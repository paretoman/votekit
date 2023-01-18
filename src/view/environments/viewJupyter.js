import jupyterUpdate, { jupyterClear } from './jupyter.js'

export default function viewJupyter(pub, changes) {
    pub.attach({
        update: (simData) => {
            if (changes.checkNone()) return

            jupyterClear()
            jupyterUpdate(simData)
        },
    })
}
