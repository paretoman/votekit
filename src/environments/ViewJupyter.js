import jupyterUpdate, { jupyterClear } from './jupyter.js'

export default function ViewJupyter(viewMode, changes) {
    const self = this

    viewMode.views.one.attach(self)
    viewMode.views.sample.attach(self)

    self.enter = () => {}
    self.exit = () => {}

    self.update = (simData) => {
        if (changes.checkNone()) return

        jupyterClear()
        jupyterUpdate(simData)
    }
}
