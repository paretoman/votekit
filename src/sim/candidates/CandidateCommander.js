/** @module */

/**
 * Register senders with the commander for setting entity values.
 * This is here because we need an action that takes an id.
 * @param {Registrar} candidateRegistrar
 * @param {Commander} commander
 * @param {CandidateList} canList
 * @constructor
 */
export default function CandidateCommander(candidateRegistrar, commander, canList, prefix) {
    const self = this

    // a object with senders that set parameters for lists of entities.
    // Like if you want to set the exists property of the 2nd candidate to 1.

    function makeSender(key, configKey, isChain) {
        self[key] = commander.addSenderForList({
            action: (id, e) => {
                canList.setNumberCandidates(id + 1)
                const candidate = candidateRegistrar.get(id)
                candidate.setAction[key](e)
            },
            name: `${prefix}-${configKey}`,
            props: { isChain },
        })
    }

    makeSender('exists', 'exists', false)
    makeSender('shape2p', 'shape2D-point', true)
    makeSender('shape1x', 'shape1D-x', true)
    makeSender('color', 'color', false)
    makeSender('party', 'party', false)
}
