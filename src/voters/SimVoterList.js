/** @module */

/**
 * Made a super class, SimVoterList.
 * GeoVoters inherits from SimVoterList.
 * There is no OneVoters because there isn't any additional functionality that OneVoters would need.
 * SimVoterList is different from Voters because it is a list of simVoters.
 * @constructor
 */
export default function SimVoterList() {
    const self = this

    const simVoters = []
    self.simVoters = simVoters

    self.newVoterGroup = function (voterGroup) {
        simVoters.push(voterGroup)
    }

    self.getVoterGroups = () => simVoters.filter((v) => v.voter.exists).map((v) => v.voter)
    self.getSimVoterGroups = () => simVoters.filter((v) => v.voter.exists)

    self.update = (candidates) => {
        simVoters.forEach((v) => { if (v.voter.exists) v.update(candidates) })
    }
    self.render = () => {
        simVoters.forEach((v) => { if (v.voter.exists) v.render() })
    }
    self.renderForeground = () => {
        simVoters.forEach((v) => { if (v.voter.exists) v.renderForeground() })
    }
}
