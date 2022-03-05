import SimVoterList from './SimVoterList.js'

export default function OneVoters() {
    const self = this

    // Inherit from SimVoterList because we need to make a list instances of oneVoter,
    // and oneVoter has a component called voter.
    SimVoterList.call(self)
}
