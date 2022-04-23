---
title: Sim
layout: default
---

# Sim Architecture for Voters
Made a super class, VoterSimList. VoterGeoList inherits from VoterSimList. There is no VoterOne because there isn't any additional functionality that VoterOne would need.

VoterSimList is different from Registrar. Registrar just assigns an id.

An example of a VoterSim is a VoterGeoBasis. This is an inheritance structure. 

A VoterSim has functionality for a voter that is specific to a simulation. Each VoterSim has a voter component. The voter component is a VoterShape, for now. This voter component is common to all simulations.

## Class Diagrams

### Inheritance

VoterSimList
- VoterGeoList

VoterSim
- VoterGeoBasis

### Calls

voterSimList -> voterSim -> voter -> voterRegistrar

# Sim Architecture for Candidates
Made classes that will exist only within a sim state: CandidateSim and CandidateDnSim. These handle functionality that is specific to sims.

A CandidateSim has a component that is an instance of Candidate. This candidate component persists between states. Registrar also has related functionality for assigning each candidate an id.

A CandidateDnSim has a component that is an instance of CandidateDn. This persists between states. Registrar has related functionality.

We don't need inheritance like we used for voters, at least not for right now. If we did want inheritance, we could call subclasses of CandidateSim and CandidateDnSim from each sim.

Made a simple list of candidateSim instances called candidateSimList. It really just passes along function calls to each member of the list. The class candidateDnSimList is analogous to this for candidate distributions.

## Class Diagrams


candidateSimList -> candidateSim -> candidate -> candidateRegistrar

candidateDnSimList -> candidateDnSim -> candidateDn -> candidateDistributionRegistrar

