/**
 * Keep a
 * @param {Commander} commander  */
export default function CommandStore(commander) {
    const self = this

    // A list of actions we can execute (for sender)
    const actions = []

    /**
     * A menu item or other object can add an action that it wants to execute with a value.
     * The action can be performed by calling commander.do(command),
     * where command has a name and value.
     * @param {String} name - The name of the action.
     * @param {Function} action - The action function itself, which is called with a value.
     */
    self.addSender = (args) => {
        const {
            name, action, props,
        } = args

        actions[name] = action
        const command = (value) => ({ name, value, props })
        const go = (value) => commander.do(command(value))
        const load = (value) => commander.loadCommands([command(value)])
        const sender = { command, go, load }
        return sender
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
     * @returns {Object} - methods command(id,value) and go(id,value)
     */
    self.addSenderForList = (args) => {
        const {
            name, action, props,
        } = args

        actions[name] = action
        const command = (id, value, currentValue) => ({
            name, id, value, props, currentValue,
        })
        const go = (id, value, currentValue) => commander.do(command(id, value, currentValue))
        const load = (id, value, currentValue) => commander.loadCommands([command(id, value, currentValue)])
        const sender = { command, go, load }
        return sender
    }

    /**
     * Actually execute the action.
     * @param {Object} command -
     */
    self.execute = (command) => {
        const { name, id, value } = command
        const action = actions[name]
        if (id !== undefined) {
            action(id, value)
        } else {
            action(value)
        }
    }
}
