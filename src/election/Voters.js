export default function Voters() {
    const self = this

    const voterGroups = []

    self.newVoterGroup = function (voterGroup) {
        voterGroups.push(voterGroup)
    }

    self.clearVoterGroups = function () {
        voterGroups.splice(0, voterGroups.length)
    }
    self.clear = () => {
        voterGroups.splice(0, voterGroups.length)
    }

    self.getVoterGroups = () => voterGroups

    self.update = (candidates) => {
        voterGroups.forEach((v) => v.update(candidates))
    }
    self.render = () => {
        voterGroups.forEach((v) => v.render())
    }
    self.renderForeground = () => {
        voterGroups.forEach((v) => v.renderForeground())
    }

}
