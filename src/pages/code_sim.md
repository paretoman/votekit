# Sim Architecture for Voters
Made a super class, SimVoterList. GeoVoters inherits from SimVoterList. There is no OneVoters because there isn't any additional functionality that OneVoters would need.

SimVoterList is different from Registrar. Registrar just assigns an id.

An example of a SimVoter is a GeoVoterBasis or a OneVoterCircle. This is an inheritance structure. 

A SimVoter has functionality for a voter that is specific to a simulation. Each SimVoter has a voter component. The voter component is a VoterCircle, for now. This voter component is common to all simulations.

## Class Diagrams

### Inheritance

SimVoterList
- GeoVoters

SimVoter
- GeoVoterBasis
- OneVoterCircle

### Calls

simVoterList -> simVoter -> voter -> voterRegistrar

# Sim Architecture for Candidates
Made classes that will exist only within a sim state: SimCandidate and SimCandidateDistribution. These handle functionality that is specific to sims.

A SimCandidate has a component that is an instance of Candidate. This candidate component persists between states. Registrar also has related functionality for assigning each candidate an id.

A SimCandidateDistribution has a component that is an instance of CandidateDistribution. This persists between states. Registrar has related functionality.

We don't need inheritance like we used for voters, at least not for right now. If we did want inheritance, we could call subclasses of SimCandidate and SimCandidateDistribution from each sim.

Made a simple list of simCandidate instances called simCandidateList. It really just passes along function calls to each member of the list. The class simCandidateDistributionList is analogous to this for candidate distributions.

## Class Diagrams


simCandidateList -> simCandidate -> candidate -> candidateRegistrar

simCandidateDistributionList -> simCandidateDistribution -> candidateDistribution -> candidateDistributionRegistrar

