export default function Voters() {
    const self = this

    const voterGroups = []
    const voterIDs = []
    let nextID = 0

    self.newVoterGroup = function (voterGroup) {
        const id = nextID
        nextID += 1
        voterGroups.push(voterGroup)
        voterIDs.push(id)
        return id
    }

    self.clear = () => {
        voterGroups.splice(0, voterGroups.length)
        voterIDs.splice(0, voterIDs.length)
    }

    self.getVoterGroups = () => voterGroups.filter((v) => v.exists)

    self.update = (candidates) => {
        voterGroups.forEach((v) => { if (v.exists) v.update(candidates) })
    }
    self.render = () => {
        voterGroups.forEach((v) => { if (v.exists) v.render() })
    }
    self.renderForeground = () => {
        voterGroups.forEach((v) => { if (v.exists) v.renderForeground() })
    }
}
