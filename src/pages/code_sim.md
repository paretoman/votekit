# Sim Architecture
Made a super class, SimVoterList. GeoVoters inherits from SimVoterList. There is no OneVoters because there isn't any additional functionality that OneVoters would need.

SimVoterList is different from Voters because it is a list of simVoters. 

An example of a SimVoter is a GeoVoterBasis or a OneVoterCircle. This is an inheritance structure. 

A SimVoter has functionality for a voter that is specific to a simulation. Each SimVoter has a voter component. The voter component is a VoterCircle, for now. This voter component is common to all simulations.

Voters is still a list of voter objects. This might seem like we are duplicating a SimVoterList, but it's okay. It's a really simple class, and it's just a similar structure. I don't think it's redundant.

## Class Diagrams

### Inheritance

SimVoterList
- GeoVoters

SimVoter
- GeoVoterBasis
- OneVoterCircle

### Calls

simVoterList -> simVoter
simVoter -> voter
voters -> voter