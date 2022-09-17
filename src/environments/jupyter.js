/**
 * Check if we are in a jupyter notebook.
 * Send any data to votekitData variable in python.
 * @param {Object} data - any object with keys to send to python
 */

const usingIPython = (window.IPython !== undefined)
// const usingJupyterLab = (window._JUPYTERLAB !== undefined)

if (usingIPython) {
    window.votekitStore = {}
    window.getVotekitStore = () => {
        if (usingIPython) {
            const ex = (command) => window.IPython.notebook.kernel.execute(command)
            ex(`votekitData = '${JSON.stringify(window.votekitStore)}'`)
        }
    }
}

/**
 * A function that runs at every update.
 * provide a hook that a python notebook can define later.
 * for example, the following code might work to get javascript variables into a python function
 *   const ex = (command) => window.IPython.notebook.kernel.execute(command)
 *   ex(`votekitOnUpdate('${JSON.stringify(store)}')`)
 * @param {Object} data - a list of key-value pairs to assign to window.votekitStore
 */
export default function jupyterUpdate(data) {
    if (usingIPython) {
        Object.assign(window.votekitStore, data)

        // hook to run at every update
        // only runs if someone defines it elsewhere, like in a python notebook
        if (window.votekitUpdate !== undefined) {
            window.votekitUpdate(window.votekitStore, data)
        }
    }
}

export function jupyterClear() {
    window.votekitStore = {}
}
