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
    self.setForListSenders = {}

    function makeSetForListSender(key, configKey, isChain) {
        self.setForListSenders[key] = commander.addSenderForList({
            action: (id, e) => {
                canDnList.setNumberCandidateDns(id + 1)
                const candidateDn = candidateDnRegistrar.get(id)
                candidateDn.setAction[key](e)
            },
            name: `${prefix}-${configKey}`,
            props: { isChain },
        })
    }

    makeSetForListSender('exists', 'exists', false)
    makeSetForListSender('shape2p', 'shape2D-point', true)
    makeSetForListSender('shape1x', 'shape1D-x', true)
    makeSetForListSender('shape2w', 'shape2D-width', true)
    makeSetForListSender('shape1w', 'shape1D-width', true)
    makeSetForListSender('shape1densityProfile', 'shape1D-densityProfile', false)
    makeSetForListSender('party', 'party', false)
}
