/** get election phase options from election options for a phase
 * @param {object} optionsBag
 * @param {string} phaseName
 * @returns {object} election phase options
*/
export default function getElectionOptions(sequenceName, phaseName, optionsBag) {
    const epo = { ...optionsBag }
    epo.phaseOptions = epo.sequenceOptions.sequences[sequenceName].phases[phaseName]
    delete epo.sequenceOptions
    return epo
}
