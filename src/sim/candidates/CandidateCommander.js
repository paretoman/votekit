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

    function makeSetForListSender(key, configKey, isChain) {
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

    makeSetForListSender('exists', 'exists', false)
    makeSetForListSender('shape2p', 'shape2D-point', true)
    makeSetForListSender('shape1x', 'shape1D-x', true)
    makeSetForListSender('color', 'color', false)
    makeSetForListSender('party', 'party', false)
}
