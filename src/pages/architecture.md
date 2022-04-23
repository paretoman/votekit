---
title: Architecture
layout: default
---

The architecture tries to be context-oriented. I mean that we keep an idea of the task to be performed.

* An Election class just has code in the context of running an election. Voters and candidates are passed as arguments to functions in the Election class. 
    * There are sim-type-specific classes that include Election as a component: ElectionOne, ElectionSample, and ElectionGeo.
* Voters
    * VoterShape represents a continuous population of voters. 
        * The other classes below are responsible for managing interactions between voterShapes, as opposed to managing an individual voterShape.
    * VoterShapeAdd manages a list of these VoterShape objects and adds new ones. 
        * Registrar is the component that manages the list.
        * VoterCommander is the component that handles commands for each VoterShape.
    * VoterSim deals with dragging the VoterShape for a particular sim.
        * voterShape is a component of VoterSim.
        * VoterGeoBasis is a variation on VoterSim with more drawing functions. It could be replaced with code in VizGeo2D.
    * VoterSimList manages a list of VoterSim objects for each sim. It provides a count of the VoterShapes and renders the VoterShapes. It is important because the "exists" property of a VoterShape can be toggled, so we have to filter the list of voters
        * VoterGeoList is a variation on VoterSimList with more functionality for districts. 
    * Viz* draws the voters because there is more context to draw them as a group than individually. 
        * VizGeo2D draws the voters are in tracts and districts.
    * VoterTest is a copy of VoterShape, mostly. VoterTest exists outside of these other classes. It doesn't have command history and doesn't interact with other voters. It's just a test.
* Candidates
    * Candidate represents a single candidate.
    * CandidateAdd manages a list of candidates.
    * 
* A Sim class manages voter entities and candidate entities.
    * Entities are visual objects that can be controlled by the user. These include voters and candidates.
* A sandbox is the main user interface.

The difference between CountVotes and Election is that Election encompasses all concepts of an election such as casting a vote or the number of dimensions, while CountVotes just considers the votes and the result of counting. Then CountVotes returns a summary of how the election went. Perhaps CountingMethod would be a more specific name.