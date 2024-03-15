/** get election phase options from election options for a phase
 * @param {object} optionsBag
 * @param {string} phaseName
 * @returns {object} election phase options
*/
export default function getElectionOptions(sequenceName, phaseName, optionsBag) {
    const eo = optionsBag.sequenceOptions.sequences[sequenceName].phases[phaseName]
    return eo
}
