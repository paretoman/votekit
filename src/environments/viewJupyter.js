import jupyterUpdate, { jupyterClear } from './jupyter.js'

export default function ViewJupyter(pub, changes) {
    const self = this

    pub.attach(self)

    self.update = (simData) => {
        if (changes.checkNone()) return

        jupyterClear()
        jupyterUpdate(simData)
    }
}
