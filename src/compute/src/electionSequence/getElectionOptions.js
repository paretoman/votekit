/** @module */

/** get election phase options from election options for a phase
 * @param {*} sequenceName
 * @param {string} phaseName
 * @param {*} optionsBag
 * @returns {*} election phase options
 */
export default function getElectionOptions(sequenceName, phaseName, optionsBag) {
    const eo = optionsBag.sequenceOptions.sequences[sequenceName].phases[phaseName]
    return eo
}
