import Changes from './Changes.js'
import Commander from '../command/Commander.js'
import SimOptions from '../options/SimOptions.js'
import ElectionOptions from '../options/ElectionOptions.js'
import DistrictGeometry from '../../election/districtGeometry/districtGeometry.js'
import Entities from './Entities.js'
import SimMode from '../modes/SimMode.js'
import addDefaultEntities from './addDefaultEntities.js'
import Publisher from './Publisher.js'

export default function Sim(comMessenger) {
    const changes = new Changes()

    const commander = new Commander(comMessenger)

    const simOptions = new SimOptions(changes, commander)
    const electionOptions = new ElectionOptions(changes, simOptions, commander)

    const entities = new Entities(changes, commander)
    const districtGeometry = new DistrictGeometry(entities.voterShapeList, changes, electionOptions)
    const pub = new Publisher()
    const simMode = new SimMode(pub, entities, districtGeometry, changes, simOptions, electionOptions)

    function init(config) {
        addDefaultEntities(entities)

        commander.loadConfig(config)
        commander.clearHistory()
    }

    function update() {
        simMode.update()
    }

    return {
        changes, commander, simOptions, electionOptions, entities, districtGeometry, simMode, pub, init, update,
    }
}
