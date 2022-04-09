/** @module */

/** Connect two sandboxes by passing messages between their commanders.
 * This is kind of like a mediator pattern, but also maybe an observer pattern. */
export default class ComMessenger {
    /** Make sure broadcasted commands don't trigger broadcasts */

    // All variables are intended to be private.

    constructor() {
        this.linked = true
        this.commanders = []
        this.protect = false
    }

    setLinked(value) {
        this.linked = value
    }

    addCommander(commander) {
        this.commanders.push(commander)
    }

    broadcastDo(command, originCommander) {
        if (this.linked && this.protect === false) {
            this.protect = true
            this.commanders.forEach((com) => com.passDo(command))
            this.protect = false
        } else {
            originCommander.passDo(command)
        }
    }

    broadcastDoCommands(commands, originCommander) {
        if (this.linked && this.protect === false) {
            this.protect = true
            this.commanders.forEach(
                (com) => com.passDoCommands(commands),
            )
            this.protect = false
        } else {
            originCommander.passDoCommands(commands)
        }
    }

    broadcastLoadConfig(newConfig, originCommander) {
        if (this.linked && this.protect === false) {
            this.protect = true
            this.commanders.forEach(
                (com) => com.passLoadConfig(newConfig),
            )
            this.protect = false
        } else {
            originCommander.passLoadConfig(newConfig)
        }
    }

    broadCastLoadCommands(commands, originCommander) {
        if (this.linked && this.protect === false) {
            this.protect = true
            this.commanders.forEach(
                (com) => com.passLoadCommands(commands),
            )
            this.protect = false
        } else {
            originCommander.passLoadCommands(commands)
        }
    }
}
