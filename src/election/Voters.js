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

    self.getVoterGroups = () => voterGroups.filter((v) => v.exists)
}
