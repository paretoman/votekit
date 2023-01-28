/** @module */

/**
 * Register senders with the commander for setting entity values.
 * This is here because we need an action that takes an id.
 * @param {Registrar} candidateDnRegistrar
 * @param {Commander} commander
 * @param {CandidateDnList} canDnList
 * @constructor
 */
export default function CandidateDnCommander(candidateDnRegistrar, commander, canDnList, prefix) {
    const self = this

    // a object with senders that set parameters for lists of entities.
    // Like if you want to set the exists property of the 2nd candidate to 1.

    function makeSender(key, configKey, isChain) {
        self[key] = commander.addSenderForList({
            action: (id, e) => {
                canDnList.setNumberCandidateDns(id + 1)
                const candidateDn = candidateDnRegistrar.get(id)
                candidateDn.setAction[key](e)
            },
            name: `${prefix}-${configKey}`,
            props: { isChain },
        })
    }

    makeSender('exists', 'exists', false)
    makeSender('shape2p', 'shape2D-point', true)
    makeSender('shape1x', 'shape1D-x', true)
    makeSender('shape2w', 'shape2D-width', true)
    makeSender('shape1w', 'shape1D-width', true)
    makeSender('shape1densityProfile', 'shape1D-densityProfile', false)
    makeSender('party', 'party', false)
}
