export default class ComMessenger {
    /** Make sure broadcasted commands don't trigger broadcasts */
    #protect = false

    constructor() {
        this.linked = true
        this.commanders = []
        this.#protect = false
    }

    setLinked(value) {
        this.linked = value
    }

    addCommander(commander) {
        this.commanders.push(commander)
    }

    broadcastDo(command, originCommander) {
        if (this.linked && this.#protect === false) {
            this.#protect = true
            this.commanders.forEach((com) => com.passDo(command))
            this.#protect = false
        } else {
            originCommander.passDo(command)
        }
    }

    broadcastDoCommands(commands, originCommander) {
        if (this.linked && this.#protect === false) {
            this.#protect = true
            this.commanders.forEach((com) => com.passDoCommands(commands))
            this.#protect = false
        } else {
            originCommander.passDoCommands(commands)
        }
    }
}
