/** get election phase options from election options for a phase
 * @param {object} electionOptions
 * @param {string} phaseName
 * @returns {object} election phase options
*/
export default function getElectionPhaseOptions(sequenceName, phaseName, electionOptions) {
    const epo = { ...electionOptions }
    epo.phaseOptions = epo.sequenceOptions.sequences[sequenceName].phases[phaseName]
    delete epo.sequenceOptions
    return epo
}
