---
title: Election
layout: default
---

An election is run on the geometry to generate output data structures. It handles casting votes and applying a social choice function. 

- Parent Pages: [Architecture](architecture.md), [SimMode](simMode.md)
- Subpages: [VoteCasters](voteCasters.md), [SocialChoice](socialChoice.md)

## Election

One of two election functions is run: electionRun or electionDistrictsRun.

The sampling election function is more of a mode. It runs samples of one of the two other two election functions.

The function electionDistrictsRun compiles district and statewide votes and results.

**Steps**:

- If there are districts, then the geometry is run in several tracts, each with slight variations in geometry.
- [VoteCasters](voteCasters.md): Votes are cast.
- If there are districts, then votes from tracts are combined into districts.
- A [social choice](socialChoice.md) function runs on the votes to determine winners.
- Election results are assembled.
- All the options, geometry, votes, and social choice outputs are combined into an electionResults data structure.

## Election Results

The election results are all the data you need for making explanations. They are output by the election step in the sim. They are input for the visualizers. They are composed of several parts:

* electionOptions
* geometry
* votes
  * tallyFractions
* socialChoiceResults
  * iWinner or allocation
* colorRGBAofCandidates
* error
  * An error message string or undefined.
* future
  * simOptions
  * voter labels
  * candidate labels

The districtElectionResults have additional variables by tract and district.

* votesByTract
* votesByDistrict
* scResultsByDistrict

