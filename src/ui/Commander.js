/** @module */

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
 * @constructor
 */
export default function Commander(comMessenger) {
    const self = this

    // Keep commands and undos in history
    const history = []
    let head = -1 // Head is where we are in history, where our head is at.

    self.clearHistory = () => {
        history.splice(0, history.length)
        head = -1
    }

    // The list of all mementos
    const config = {}

    // A list of actions we can execute (for invoker)
    const actions = []

    const firstActions = []

    comMessenger.addCommander(self)

    /**
     * A menu item or other object can add an action that it wants to execute with a value.
     * The action can be performed by calling commander.do(command),
     * where command has a name and value.
     * @param {String} name - The name of the action.
     * @param {Function} action - The action function itself, which is called with a value.
     */
    self.addAction = (name, action, currentValue, props) => {
        if (props !== undefined && props.isFirstAction) {
            firstActions[name] = true
        }
        actions[name] = action
        config[name] = currentValue
    }

    // make a client with a command and a way to do the command
    self.addClient = (args) => {
        const {
            name, action, currentValue, props,
        } = args

        self.addAction(name, action, currentValue, props)
        const command = (value) => ({ name, value, props })
        const go = (value) => self.do(command(value))
        const client = { command, go }
        return client
    }

    /** Say we want to change a value for the nth candidate.
     * And say the nth candidate doesn't exist.
     * Then we have to use an action which acts on the list of candidates,
     * rather than the candidate itself.
     */
    self.addActionList = (name, action) => {
        actions[name] = action
        config[name] = []
    }

    /**
     * Make a client with a command and a way to do the command.
     * This type of client deals with lists.
     * @param {Object} args
     * @returns {Object} - methods command(id,value) and go(id,value)
     */
    self.addClientList = (args) => {
        const {
            name, action, props,
        } = args

        self.addActionList(name, action)
        const command = (id, value, currentValue) => ({
            name, id, value, props, currentValue,
        })
        const go = (id, value, currentValue) => self.do(command(id, value, currentValue))
        const setCurrentValue = (id, currentValue) => {
            config[name][id] = currentValue
        }
        const getCurrentValue = (id) => config[name][id]
        const client = {
            command, go, setCurrentValue, getCurrentValue,
        }
        return client
    }

    /**
     * Actually execute the action. Also, store the memento.
     * @param {Object} command -
     */
    const execute = (command) => {
        const { name, id, value } = command
        const action = actions[name]
        if (action) {
            // Actually change the config.
            if (id !== undefined) {
                action(id, value)
                config[name][id] = value
            } else {
                action(value)
                config[name] = value
            }
        }
    }

    /**
     * Put a commandMessenger in the middle,
     * between the command being asked for and the command being done.
     * @param {Object} command - a command to do. See passDo.
     */
    self.do = (command) => {
        comMessenger.broadcastDo(command, self)
    }
    self.doCommands = (commands) => {
        comMessenger.broadcastDoCommands(commands, self)
    }

    /**
     * We want to do a command. We need to keep track of what we do so we can undo it.
     * @param {Object} command
     * @param {String} command.name
     * @param {(String|Number|Boolean)} command.value
     * @param {Object} command.props - a catchall for easier coding
     */
    self.passDo = (command) => {
        const { name, id, props } = command // command is {name, value, props}

        // Store the current value so we can undo the command.
        let currentValue
        if (id === undefined) {
            currentValue = config[name]
        } else {
            currentValue = command.currentValue
        }

        // Store how to undo the command.
        const undoCommand = {
            name, id, value: currentValue, props,
        }

        // remove future redos
        // example: head:-1 means history will be cleared splice(0,length)
        history.splice(head + 1, history.length - (head + 1))

        // Add command to history
        history.push([{ command, undoCommand }])
        head += 1

        // Actually preform the command.
        execute(command)
    }
    /**
     * Do a set of commands together, so they have one history item.
     * @param {Object[]} commands - a list of command objects
     */
    self.passDoCommands = (commands) => {
        const historyItem = []
        commands.forEach((command) => {
        // todo: make into one undo item
            const { name, id, props } = command // command is {name, value, props}

            // Store the current value so we can undo the command.
            let currentValue
            if (id === undefined) {
                currentValue = config[name]
            } else {
                currentValue = command.currentValue
            }

            // Store how to undo the command.
            const undoCommand = {
                name, id, value: currentValue, props,
            }

            // Store in one history item
            historyItem.push({ command, undoCommand })

            // Actually preform the command.
            execute(command)
        })

        // remove future redos
        // example: head:-1 means history will be cleared splice(0,length)
        history.splice(head + 1, history.length - (head + 1))

        // Add command to history
        history.push(historyItem)
        head += 1
    }

    // control the duration of the setXY undos with a timeout. Here's a default timeout.
    const xyDuration = 30
    let xyTimer = setTimeout(() => null, xyDuration)

    self.undo = () => {
        if (head === -1) return // There is no history

        const last = history[head]
        last.forEach((pair) => { execute(pair.undoCommand) })

        head -= 1 // Now we're in the past.

        // If we're in a setXY chain, then continue with another undo after a pause.
        const { undoCommand } = last[0]
        if (undoCommand.props === undefined) return
        if (undoCommand.props.isSetXY !== true) return
        if (head === -1) return
        const penUltimate = history[head][0]
        if (penUltimate.undoCommand.name === undoCommand.name) {
            // todo: make this only work for repeated setXY commands
            // set timer and callback
            clearTimeout(xyTimer)
            xyTimer = setTimeout(self.undo, xyDuration)
        }
    }

    self.redo = () => {
        if (head === history.length - 1) return // Nothing to do

        const next = history[head + 1]
        next.forEach((pair) => execute(pair.command))

        head += 1 // Now we're in the future.

        // If we're in a setXY chain, then continue with another redo after a pause.
        const { command } = next[0]
        if (command.props === undefined) return
        if (command.props.isSetXY !== true) return
        if (head === history.length - 1) return
        const nextnext = history[head + 1][0]
        if (nextnext.command.name === command.name) {
            // todo: make this only work for repeated setXY commands
            // set timer and callback
            clearTimeout(xyTimer)
            xyTimer = setTimeout(self.redo, xyDuration)
        }
    }

    self.loadConfig = (newConfig) => {
        comMessenger.broadcastLoadConfig(newConfig, self)
    }

    self.passLoadConfig = (newConfig) => {
        // newConfig is a list of commands to execute.
        self.loadConfigPriority(newConfig, 'high')
        self.loadConfigPriority(newConfig, 'low')
    }

    self.loadConfigPriority = (newConfig, priority) => {
        // newConfig is a list of commands to execute.
        const names = Object.keys(newConfig)
        names.forEach((name) => {
            // Decide whether to process commands, based on their priority.
            const isHigh = firstActions[name] !== undefined
            if (priority === 'low' && isHigh) {
                return
            }
            if (priority === 'high' && !isHigh) {
                return
            }

            // if we have a list, then create commands for each item in the list
            const valueArray = newConfig[name]
            if (valueArray instanceof Array) {
                valueArray.forEach((value, id) => {
                    // const subValue = newConfig[name][id]
                    const command = { name, id, value }
                    execute(command)
                })
            } else {
                const value = valueArray
                const command = { name, value }
                execute(command)
            }
        })
    }

    self.loadCommands = (commands) => {
        comMessenger.broadCastLoadCommands(commands, self)
    }
    self.passLoadCommands = (commands) => {
        // execute commands without adding to history
        commands.forEach((command) => {
            execute(command)
        })
    }

    self.getConfig = () => structuredClone(config)
}
