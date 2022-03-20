/** Handle the Config */
export default function ConfigKeeper(commander) {
    const self = this

    // The list of all mementos
    const config = {}

    const firstActions = []

    /**
     * A menu item or other object can add an action that it wants to execute with a value.
     * The action can be performed by calling commander.do(command),
     * where command has a name and value.
     * @param {String} name - The name of the action.
     * @param {Function} action - The action function itself, which is called with a value.
     */
    self.addSender = (args) => {
        const { name, currentValue, props } = args
        if (props !== undefined && props.isFirstAction) {
            firstActions[name] = true
        }
        config[name] = currentValue
    }

    /**
     * Make a sender with a command and a way to do the command.
     * This type of sender deals with lists.
     *
     * Say we want to change a value for the nth candidate.
     * And say the nth candidate doesn't exist.
     * Then we have to use an action which acts on the list of candidates,
     * rather than the candidate itself.
     *
     * @param {Object} args
     * @returns {Function} - a method to get the current value at an id.
     */
    self.addSenderForList = (args) => {
        const { name, props } = args
        if (props !== undefined && props.isFirstAction) {
            firstActions[name] = true
        }
        config[name] = []

        const getCurrentValue = (id) => config[name][id]
        return getCurrentValue
    }

    /**
     * Update the config when executing a command.
     * @param {Object} command -
     */
    self.execute = (command) => {
        const { name, id, value } = command
        if (id !== undefined) {
            config[name][id] = value
        } else {
            config[name] = value
        }
    }

    self.makeUndo = (command) => {
        const { name, id, props } = command // command is {name, value, props}

        // Store the current value so we can undo the command.
        let currentValue
        if (id === undefined) {
            currentValue = config[name]
        } else {
            currentValue = config[name][id]
            if (currentValue === undefined) {
                currentValue = command.currentValue
            }
        }

        // Store how to undo the command.
        const undoCommand = {
            name, id, value: currentValue, props,
        }

        return undoCommand
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
                    commander.execute(command)
                })
            } else {
                const value = valueArray
                const command = { name, value }
                commander.execute(command)
            }
        })
    }

    self.passLoadCommands = (commands) => {
        // execute commands without adding to history
        commands.forEach((command) => {
            commander.execute(command)
        })
    }

    self.getConfig = () => structuredClone(config)
}
