---
title: Entities
layout: default
---

Entities are geometric objects representing voters and candidates.

- Parent Page: [Sim](sim.md)

## Entities

Entities are shared between states. Lists of entities manage the creation of entities, which is important for syncing sandboxes and undo/redo.

### Voters

* VoterShape represents a continuous population of voters. 
  * The other classes below are responsible for managing interactions between voterShapes, as opposed to managing an individual voterShape.
* VoterShapeList manages a list of these VoterShape objects and adds new ones. 
  * Registrar is the component that manages the list.
  * VoterCommander is the component that handles commands for each VoterShape.
* TestVoter is a copy of VoterShape, mostly. TestVoter exists outside of these other classes. It doesn't have command history and doesn't interact with other voters. It's just a test.
* Data types:
  * These are the standard data structures for voters.
  * voterGroup: an object with a shape1, shape2, and weight (optional) property.
  * voterGeom: 
    * For 2D, an array of objects: {x,y,w}.
    * For 1D, an array of objects: {x,w,densityProfile}.

### Candidates

* Candidate represents a single candidate. It keeps its state, works with undo, and has render functions.
* CandidateList manages a list of candidates and adds new ones.
  * Registrar is the component that manages the list.
  * CandidateCommander is the component that handles commands for each Candidate.
* Data types:
  * These are the standard data structures for candidates.
  * canGeoms:
    * For 2D, an array of objects: {x,y}.
    * For 1D, an array of objects: {x}.
  * canList: An array of Candidate objects.

### CandidateDns (Distributions)

  * Nearly identical mirrors of the classes for Candidates above exist for CandidateDns.