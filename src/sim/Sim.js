import Changes from './Changes.js'
import Commander from '../command/Commander.js'
import SimOptions from './SimOptions.js'
import ElectionOptions from '../election/ElectionOptions.js'
import Entities from './Entities.js'
import VoterDistricts from '../voters/VoterDistricts.js'
import SimStateMachine from './SimStateMachine.js'

export default function Sim(comMessenger) {
    const changes = new Changes()

    const commander = new Commander(comMessenger)

    const simOptions = new SimOptions(changes)
    const electionOptions = new ElectionOptions(changes, simOptions)

    const entities = new Entities(changes, commander)
    const voterDistricts = new VoterDistricts(entities.voterShapeList, changes)
    const simMachine = new SimStateMachine(entities, voterDistricts, changes, simOptions, electionOptions)
    window.requestAnimationFrame(simLoop)
    function simLoop() {
        simMachine.update()
        window.requestAnimationFrame(simLoop)
    }

    return {
        changes, commander, simOptions, electionOptions, entities, voterDistricts, simMachine,
    }
}
