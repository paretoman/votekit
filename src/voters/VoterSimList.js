/** @module */

/**
 * Made a super class, VoterSimList.
 * GeoVoters inherits from VoterSimList.
 * There is no OneVoters because there isn't any additional functionality that OneVoters would need.
 * VoterSimList is different from Voters because it is a list of simVoters.
 * @constructor
 */
export default function VoterSimList(sim) {
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
    self.updateXY = () => {
        simVoters.forEach((v) => v.voter.updateXY())
    }

    self.render = () => {
        simVoters.forEach((v) => { if (v.voter.exists) v.render() })
    }

    self.renderForeground = () => {
        if (sim.showGhosts) {
            self.renderForegroundAll()
        } else {
            self.renderForegroundExisting()
        }
    }
    self.renderForegroundExisting = () => {
        simVoters.forEach((v) => { if (v.voter.exists) v.renderForeground() })
    }
    self.renderForegroundAll = () => {
        simVoters.forEach((v) => { v.renderForeground() })
    }
}
