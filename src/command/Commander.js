/** @module */

import CommandStore from './CommandStore.js'
import ConfigKeeper from './ConfigKeeper.js'
import History from './History.js'

/**
 * Both the command pattern and the memento pattern are used here.
 * Commands are performed to make changes to the mementos.
 *
 * Memento Pattern:
 *  Caretaker: ConfigKeeper class. It keeps config as a list of mementos.
 *  Originator: sender returned by CommandStore.addSender, used by menuItem, Candidate, Voter, etc
 *  Mementos: Config is a list of mementos. It's not a strict pattern.
 *  Also, the way we are storing commands is like storing mementos of a commands (not strictly).
 *
 * Command Pattern:
 * * Client: a CandidateCommander, VoterCommander, MenuItem, etc
 * * Command: Here, a command is a memento of a way to make a command.
 *     CommandStore stores lists of ways to make commands.
 *     mostly with a name and an action.
 *     Also, History stores a list of commands.
 *  Sender: A sender is returned by CommandStore.addSender.
 *  Receiver: a property of a Candidate, Voter, MenuItem, etc.
 *  For example, Candidate.setXY calls CandidateCommander.setXYSenderForList.go(id, value),
 *    which then calls Candidate.setXYAction to set Candidate.x and Candidate.y
 *
 * This isn't exactly either pattern.
 * Instead of commands with execute functions,
 * we use CommandStore, a class that stores lists of ways to make commands, given parameters.
 * Instead of mementos, the lists of ways to make commands act as mementos.
 *
 * Initially, the three component classes here were part of one larger class,
 * but hopefully it is easier to read code that is shorter and sticks to one context.
 * This class is similar to the mediator in the mediator pattern.
 *
 * References:
 * * [Command Pattern on refactoring.guru](https://refactoring.guru/design-patterns/command)
 * * [Memento Pattern on refactoring.guru](https://refactoring.guru/design-patterns/memento)
 * * [Mediator Pattern on refactoring.guru](https://refactoring.guru/design-patterns/mediator)
 * @constructor
 */
export default function Commander(comMessenger) {
    const self = this

    const commandStore = new CommandStore(self)
    const configKeeper = new ConfigKeeper(self)
    const history = new History(self)
    comMessenger.addCommander(self)

    /**
     * A menu item or other object can add an action that it wants to execute with a value.
     * The action can be performed by calling commander.do(command),
     * where command has a name and value.
     * @param {Object} args - argument catchall
     * @param {String} args.name - The name of the action.
     * @param {Function} args.action - The action function itself, which is called with a value.
     */

    // make a sender with a command and a way to do the command
    self.addSender = (args) => {
        configKeeper.addSender(args)
        const sender = commandStore.addSender(args)
        return sender
    }

    /** Say we want to change a value for the nth candidate.
     * And say the nth candidate doesn't exist.
     * Then we have to use an action which acts on the list of candidates,
     * rather than the candidate itself.
     */

    /**
     * Make a sender with a command and a way to do the command.
     * This type of sender deals with lists.
     * @param {Object} args
     * @returns {Object} - methods command(id,value) and go(id,value)
     */
    self.addSenderForList = (args) => {
        const sender = commandStore.addSenderForList(args)
        sender.getCurrentValue = configKeeper.addSenderForList(args)
        return sender
    }

    /**
     * Actually execute the action.
     * @param {Object} command -
     */
    self.execute = (command) => {
        configKeeper.execute(command)
        commandStore.execute(command)
    }

    // ConfigKeeper functions

    self.makeUndo = configKeeper.makeUndo
    self.passLoadConfig = configKeeper.passLoadConfig
    self.passLoadCommands = configKeeper.passLoadCommands
    self.getConfig = configKeeper.getConfig

    self.loadConfig = (newConfig) => {
        // the broadcast will call passLoadConfig
        comMessenger.broadcastLoadConfig(newConfig, self)
    }

    self.loadCommands = (commands) => {
        // the broadcast will call passLoadComands
        comMessenger.broadCastLoadCommands(commands, self)
    }

    // History functions

    /**
     * Put a commandMessenger in the middle,
     * between the command being asked for and the command being done.
     * @param {Object} command - a command to do. See passDo.
     */
    self.do = (command) => {
        // the broadcast will call passDo
        comMessenger.broadcastDo(command, self)
    }

    self.doCommands = (commands) => {
        // the broadcast will call passDoCommands
        comMessenger.broadcastDoCommands(commands, self)
    }

    self.passDo = history.passDo
    self.passDoCommands = history.passDoCommands
    self.undo = history.undo
    self.redo = history.redo
    self.clearHistory = history.clearHistory
}
