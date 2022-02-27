/**
 * Both the command pattern and the memento pattern are used here.
 * Commands are performed to make changes to the mementos.
 *
 * Memento Pattern:
 *  Caretaker: this class. It keeps config as a list of mementos.
 *  Originator: menuItem.
 *  Mementos: Config is a list of mementos. It's not a strict pattern.
 *
 * Command Pattern:
 *  Client: this class. It asks an invoker to execute commands.
 *  Command: a name-value pair. Actions are listed by name. Commands are stored in history.
 *  Invoker: actions, execute(). The invoker keeps a list of actions to execute.
 *  Receiver: menuItem. The receiver calls commander.addAction(...) to add to the invoker's actions.
 *
 * References:
 * * [First google result for "invoker command pattern". It has a classic example of a stock broker.](https://home.csulb.edu/~pnguyen/cecs277/lecnotes/Command%20Pattern%201.pdf)
 * * [Memento Pattern on Wikipedia](https://en.wikipedia.org/wiki/Memento_pattern)
 * * [Memento Tutorial from refractoring.guru](https://refactoring.guru/design-patterns/memento)
 */
export default function Commander() {
    const self = this

    // Keep commands and undos in history
    const history = []
    let head = -1 // Head is where we are in history, where our head is at.

    // The list of all mementos
    const config = []

    // A list of actions we can execute (for invoker)
    const actions = []

    /**
     * A menu item or other object can add an action that it wants to execute with a value.
     * The action can be performed by calling commander.do(name,value).
     * @param {String} name - The name of the action.
     * @param {Function} action - The action function itself, which is called with a value.
     */
    self.addAction = (name, action, currentValue) => {
        actions[name] = action
        config[name] = currentValue
    }

    /**
     * Actually execute the action. Also, store the memento.
     * @param {[String,(String|Number|Boolean)]} command
     */
    const execute = (command) => {
        const { name, value } = command
        const action = actions[name]
        action(value)

        // Actually change the config.
        config[name] = value
    }

    /**
     * We want to do a command. We need to keep track of what we do so we can undo it.
     * @param {String} name
     * @param {(String|Number|Boolean)} value
     */
    self.do = (name, value) => {
        // Store the current value so we can undo the command.
        const currentValue = config[name]

        // Store the command so we can redo it or call it on another sandbox.
        const command = { name, value }

        // Store how to undo the command.
        const undoCommand = { name, value: currentValue }

        // remove future redos
        // example: head:-1 means history will be cleared splice(0,length)
        history.splice(head + 1, history.length - (head + 1))

        // Add command to history
        history.push({ command, undoCommand })
        head += 1

        // Actually preform the command.
        execute(command)
    }

    self.undo = () => {
        if (head === -1) return // There is no history

        const last = history[head]
        const { undoCommand } = last
        execute(undoCommand)

        head -= 1 // Now we're in the past.
    }

    self.redo = () => {
        if (head === history.length - 1) return // Nothing to do

        const next = history[head + 1]
        const { command } = next
        execute(command)

        head += 1 // Now we're in the future.
    }
}
