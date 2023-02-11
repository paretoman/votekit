import Changes from './Changes.js'
import Commander from '../command/Commander.js'
import SimOptions from '../options/SimOptions.js'
import ElectionOptionsMan from '../options/ElectionOptionsMan.js'
import Entities from '../entities/Entities.js'
import SimMode from '../modes/SimMode.js'
import addDefaultEntities from '../entities/addDefaultEntities.js'
import Publisher from './Publisher.js'
import Districts from '../geometry/Districts.js'

export default function Sim(comMessenger) {
    const changes = new Changes()

    const commander = new Commander(comMessenger)

    const simOptions = new SimOptions(changes, commander)
    const electionOptionsMan = new ElectionOptionsMan(changes, simOptions, commander)

    const entities = new Entities(changes, commander)
    const districts = new Districts(entities.voterShapeList, changes, electionOptionsMan, simOptions)
    const pub = new Publisher()
    const simMode = new SimMode(pub, entities, districts, changes, simOptions, electionOptionsMan)

    function init(config) {
        addDefaultEntities(entities)

        commander.loadConfig(config)
        commander.clearHistory()
    }

    function update() {
        simMode.update()
    }

    return {
        changes, commander, simOptions, electionOptionsMan, entities, districts, simMode, pub, init, update,
    }
}
