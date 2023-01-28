/** @module */

/**
 * Register senders with the commander for setting entity values.
 * This is here because we need an action that takes an id.
 * @param {Registrar} registrar
 * @param {Commander} commander
 * @param {EntityList} entityList
 * @constructor
 */
export default function EntityCommander(registrar, commander, entityList, prefix, senderList) {
    const self = this

    // a object with senders that set parameters for lists of entities.
    // Like if you want to set the exists property of the 2nd voter to 1.

    senderList.forEach((x) => makeSender(...x))

    function makeSender(key, configKey, isChain) {
        self[key] = commander.addSenderForList({
            action: (id, e) => {
                entityList.setNumberEntities(id + 1)
                const voter = registrar.get(id)
                voter.setAction[key](e)
            },
            name: `${prefix}-${configKey}`,
            props: { isChain },
        })
    }
}
