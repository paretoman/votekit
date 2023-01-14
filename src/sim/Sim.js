import Changes from './Changes.js'
import Commander from '../command/Commander.js'
import SimOptions from './SimOptions.js'
import ElectionOptions from '../election/ElectionOptions.js'
import Entities from './Entities.js'
import VoterDistricts from '../voters/VoterDistricts.js'
import SimMode from './SimMode.js'
import addDefaultEntities from '../ui/addDefaultEntities.js'
import Publisher from './Publisher.js'

export default function Sim(comMessenger) {
    const changes = new Changes()

    const commander = new Commander(comMessenger)

    const simOptions = new SimOptions(changes)
    const electionOptions = new ElectionOptions(changes, simOptions)

    const entities = new Entities(changes, commander)
    const voterDistricts = new VoterDistricts(entities.voterShapeList, changes, simOptions)
    const pub = new Publisher()
    const simMode = new SimMode(pub, entities, voterDistricts, changes, simOptions, electionOptions)

    function init(config) {
        addDefaultEntities(entities)

        commander.loadConfig(config)
        commander.clearHistory()
    }

    function update() {
        simMode.update()
    }

    return {
        changes, commander, simOptions, electionOptions, entities, voterDistricts, simMode, pub, init, update,
    }
}
