export default function History(commander) {
    const self = this

    // Keep commands and undos in history
    const history = []
    let head = -1 // Head is where we are in history, where our head is at.

    self.clearHistory = () => {
        history.splice(0, history.length)
        head = -1
    }

    /**
     * We want to do a command. We need to keep track of what we do so we can undo it.
     * @param {Object} command
     * @param {String} command.name
     * @param {(String|Number|Boolean)} command.value
     * @param {Object} command.props - a catchall for easier coding
     */
    self.passDo = (command) => {
        const undoCommand = commander.makeUndo(command)

        // remove future redos
        // example: head:-1 means history will be cleared splice(0,length)
        history.splice(head + 1, history.length - (head + 1))

        // Actually preform the command.
        commander.execute(command)

        // Add command to history
        if (command.props && command.props.combineWithCurrentCommand && head > -1) {
            // combine with current command.
            history[head].push({ command, undoCommand })
        } else {
            history.push([{ command, undoCommand }])
            head += 1
        }
    }

    /**
     * Do a set of commands together, so they have one history item.
     * @param {Object[]} commands - a list of command objects
     */
    self.passDoCommands = (commands) => {
        // remove future redos
        // example: head:-1 means history will be cleared splice(0,length)
        history.splice(head + 1, history.length - (head + 1))

        const historyItem = []
        commands.forEach((command) => {
        // todo: make into one undo item

            const undoCommand = commander.makeUndo(command)

            // Store in one history item
            historyItem.push({ command, undoCommand })

            // Actually preform the command.
            commander.execute(command)
        })

        // Add command to history
        history.push(historyItem)
        head += 1
    }

    // control the duration of the setXY undos with a timeout. Here's a default timeout.
    const chainDuration = 30
    let chainTimer = setTimeout(() => null, chainDuration)

    self.undo = () => {
        if (head === -1) return // There is no history

        const last = history[head]
        last.forEach((pair) => { commander.execute(pair.undoCommand) })

        head -= 1 // Now we're in the past.

        // If we're in a setXY chain, then continue with another undo after a pause.
        const { undoCommand } = last[0]
        if (undoCommand.props === undefined) return
        if (undoCommand.props.isChain !== true) return
        if (head === -1) return
        const penUltimate = history[head][0]
        if (penUltimate.undoCommand.props.isChain !== true) return
        if (penUltimate.undoCommand.name !== undoCommand.name) return
        if (undoCommand.id !== undefined && penUltimate.undoCommand.id !== undoCommand.id) return

        // todo: make this only work for repeated setXY commands
        // set timer and callback
        clearTimeout(chainTimer)
        chainTimer = setTimeout(self.undo, chainDuration)
    }

    self.redo = () => {
        if (head === history.length - 1) return // Nothing to do

        const next = history[head + 1]
        next.forEach((pair) => commander.execute(pair.command))

        head += 1 // Now we're in the future.

        // If we're in a setXY chain, then continue with another redo after a pause.
        const { command } = next[0]
        if (command.props === undefined) return
        if (command.props.isChain !== true) return
        if (head === history.length - 1) return
        const nextnext = history[head + 1][0]
        if (nextnext.command.props.isChain !== true) return
        if (nextnext.command.name !== command.name) return
        if (command.id !== undefined && nextnext.command.id !== command.id) return

        // todo: make this only work for repeated setXY commands
        // set timer and callback
        clearTimeout(chainTimer)
        chainTimer = setTimeout(self.redo, chainDuration)
    }
}
