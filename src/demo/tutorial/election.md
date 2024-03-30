---
title: Election
layout: default
---

An election is run on the geometry to generate output data structures. It handles casting votes and applying a social choice function. 

- Parent Pages: [Architecture](architecture.md), [Sequence](sequence.md)
- Subpages: [VoteCasters](voteCasters.md), [SocialChoice](socialChoice.md), [ElectionSampler](electionSampler.md), 

## Election

Election runs one of two election functions: electionRun or districtElection.

The function districtElection compiles district and statewide votes and results.

Election may be called by [ElectionSampler](electionSampler.md) to run multiple elections.

**Steps**:

- If there is a geography, then the geometry is run in several tracts, each with slight variations in political geometry.
- [VoteCasters](voteCasters.md): Votes are cast.
- If there is a geography, then votes from tracts are combined into districts.
- A [social choice](socialChoice.md) function runs on the votes to determine winners.
- Election results are assembled.
- All the options, geometry, votes, and social choice outputs are combined into an electionResults data structure.

## Election Results

The election results are all the data that went into and came out of an election. The sim adds more information that helps with visualization and sends that to the visualizers. They are composed of several parts:

* electionOptions
* geometry
* votes - see [VoteCasters](voteCasters.md) for more explanation.
  * preferencesLists
  * preferenceTallies
  * candidateTallies
  * pairwiseTallies
  * votesByGeom
  * parties
* socialChoiceResults
  * iWinner or allocation
* error
  * An error message string or undefined.

The sim provides more information
* colorRGBAofCandidates
* future
  * simOptions
  * voter labels
  * candidate labels

The districtElectionResults have additional variables by tract and district.

* votesByTract
* votesByDistrict
* scResultsByDistrict

