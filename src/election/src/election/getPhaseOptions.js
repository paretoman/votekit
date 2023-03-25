/** get election phase options from election options for a phase
 * @param {object} electionOptions
 * @param {string} phaseName
 * @returns {object} election phase options
*/
export default function getElectionPhaseOptions(electionOptions, phaseName) {
    const epo = { ...electionOptions }
    epo.phaseOptions = epo.sequenceOptions.phases[phaseName]
    delete epo.sequenceOptions
    return epo
}
