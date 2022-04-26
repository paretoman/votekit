---
title: Architecture
layout: default
---

The architecture tries to be context-oriented. I mean that we keep an idea of the task to be performed. There are three main parts: math, sim, and ui.

## Math

Do the math of the election, casting and counting votes.

* Election
    * The Election class just has code in the context of running an election. Voters and candidates are passed as arguments to functions in the Election class. 
    * There are sim-type-specific classes that include Election as a component: ElectionOne, ElectionSample, and ElectionGeo.
* CastVotes
    * Voters cast their ballots. 
    * A distribution of a population of voters is sampled. A 2D spatial model is used to make the decision of how to vote or who to vote for. 
    * The vote is aggregated into a set. 
* CountVotes
    * The difference between CountVotes and Election is that Election is a mediator for all the aspects of an election such as casting a vote, or the number of dimensions, while CountVotes is a component of the Election that just considers the votes and the result of counting. Then CountVotes returns a summary of the results of the count.

## Sim

Create a 2D spatial model.

* Sim
    * The Sim class manages voter entities and candidate entities.
    * Entities are visual objects that can be controlled by the user. These include voters and candidates.
    * Sim is a state machine with the following states: SimGeoOne, SimOne1D, SimOne2D, and SimSample. Each state is like a different game. Entities are shared between states. Wrappers use the entities as components to provide additional functionality to the states.
* Voters
    * VoterShape represents a continuous population of voters. 
        * The other classes below are responsible for managing interactions between voterShapes, as opposed to managing an individual voterShape.
    * VoterShapeAdd manages a list of these VoterShape objects and adds new ones. 
        * Registrar is the component that manages the list.
        * VoterCommander is the component that handles commands for each VoterShape.
    * VoterSim deals with dragging the VoterShape for a particular sim.
        * voterShape is a component of VoterSim.
    * VoterSimList manages a list of VoterSim objects for each sim. It provides a count of the VoterShapes and renders the VoterShapes. It is important because the "exists" property of a VoterShape can be toggled, so we have to filter the list of voters
        * VoterGeoList is a variation on VoterSimList with more functionality for districts. 
    * Viz\* draws the voters because there is more context to draw them as a group than individually. There are specialized drawing functions for each viz type:
        * GeoMaps draws the voters in tracts and districts.
        * Voronoi1D/2D draws voronoi diagrams.
        * Grid1D/2D draws grids of votes.
        * VoterRender1D/2D has methods to draw the voters outside of any other context.
    * VoterTest is a copy of VoterShape, mostly. VoterTest exists outside of these other classes. It doesn't have command history and doesn't interact with other voters. It's just a test.
    * CircleGraphic makes an animated circle.
    * Data types:
        * These are the standard ways of referring to voter objects that are not classes.
        * voterGroup: an object with a shape1, shape2, and weight (optional) property.
        * voterGeom: 
            * For 2D, an array of objects: {x,y,w}.
            * For 1D, an array of objects: {x,w,densityProfile}.
* Candidates
    * Candidate represents a single candidate. It keeps its state, works with undo, and has render functions.
    * CandidateAdd manages a list of candidates and adds new ones.
        * Registrar is the component that manages the list.
        * CandidateCommander is the component that handles commands for each Candidate.
    * CandidateSim deals with dragging the Candidate for a particular sim.
    * CandidateSimList manages a list of CandidateSim objects and tracks whether candidates exist and provides functions to return an array of Candidate objects. It also handles methods that apply to all the members of the list so you don't have to loop through the Candidate objects on your own.
    * SquareGraphic makes an animated square and shows stats.
    * Data types: 
        * I made a standard way of referring to candidates as objects that are not classes.
        * canGeoms: 
            * For 2D, an array of objects: {x,y}. 
            * For 1D, an array of objects: {x}.
        * canList: An array of Candidate objects.
        * candidateSimList: a CandidateSimList object.
* CandidateDns
    * Nearly identical mirrors of the classes for Candidates above exist for CandidateDns.

## UI

* UI
    * Sandbox is the main user interface.
    * Changes is a class that keeps track of a list of changes. When the Sim's update method is called, the Sim checks if there are any changes and that controls the flow of the program. Updates are called on every animation frame.
    * Screen is a context for drawing.
    * Layout puts divs in order.
    * doubleSandbox provides two sandboxes that are linked.
* Command
  * Implement configuration that can be saved to text.
  * Implement undo and redo.
* index.html
    * The main file that shows a sandbox.
* lib
    * External libraries, copied here using snowpack.
* Menu
    * Implementing a menu above the main screen.
* Pages
    * Documentation for the code, and a few test pages.
* s
    * A standalone sandbox page to link to when saving the configuration to a link.
* Tooltips
    * Make a tooltip appear when an entity is clicked or a blank space is clicked.
* Test
    * A bare bones unit test for now. Should do more.
* Viz
    * Draws visualizations of the voters and candidates.
    * This is preferred to having the voters and candidates draw themselves because there can be interactions and overlaps.