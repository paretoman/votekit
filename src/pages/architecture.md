---
title: Architecture
layout: default
---

The architecture tries to be context-oriented toward the task to be performed. The client level has uses of the application. The application has five main parts: user input, game commands, game model, election model, and visualization. These are roughly in order of program control. Input gets processed to output. Also, there is a Model-View-Controller (MVC) architecture. Sim is a mix of model and view right now. ClickDrag and Menu are controllers. Viz is view. Also, there are libraries and documentation. That is a high level overview and below we address each item in the src folder.

A good reference for MVC is the first chapter of Pattern-Oriented Software Architecture by Buschmann in 1996.

[Program Flow Diagram](program_flow.drawio)

Todo: update this architecture page with a more accurate description.

## Client

* index.html
    * The main file that shows a sandbox.
* s
    * A standalone sandbox page to link to when saving the configuration to a link.
* Environments
  * There is some basic jupyter functionality to output votes and results.
* Test
    * A bare bones unit test for now. Should do more.
* test.html
    * Integration tests

## User Input

Control a 2D spatial model.

* Menu
    * Implementing a menu above the main screen.
* Tooltips
    * Make a tooltip appear when an entity is clicked or a blank space is clicked.
* UI
    * Sandbox is the main user interface.
    * Screen is a context for drawing and also has events that are handled by ClickDrag. See [screen](code_screen.md).
    * Layout puts divs in order.
    * doubleSandbox provides two sandboxes that are linked.
* More UI elements are in additional folders specific to their context.

## Input Handlers

* UI
    * ClickDrag handles events from the Screen.

## Game Commands

* Command
  * Allow multiple user inputs to launch the same commands.
  * Trigger actions in the game model that are registered with the command pattern.
  * ConfigKeeper: Implement configuration that can be saved to text.
  * History: Implement undo and redo.
  * ComMessenger: link two sandboxes.
  * UI elements for text input and undo and redo buttons.
  * Add to the Changes class to trigger Sim updates.
  * See [commands](code_commands.md).

## Game Model

* Sim
    * The Sim class manages voter entities and candidate entities.
    * See [sim](code_sim.md).
    * Entities are visual objects that can be controlled by the user. These include voters and candidates.
    * Sim is a state machine with the following states: SimGeoOne, SimOne1D, SimOne2D, and SimSample. Each state is like a different game. Entities are shared between states. Wrappers use the entities as components to provide additional functionality to the states.
    * State Updates
        * The basic process is to run an election and visualize the result. The election code handles any changes. The electionResults communicates how to visualize the election.    
    * Changes is a class that keeps track of a list of changes. When the Sim's update method is called, the Sim checks if there are any changes and that controls the flow of the program. Updates are called on every animation frame.
* Voters
    * VoterShape represents a continuous population of voters. 
        * The other classes below are responsible for managing interactions between voterShapes, as opposed to managing an individual voterShape.
    * VoterShapeList manages a list of these VoterShape objects and adds new ones. 
        * Registrar is the component that manages the list.
        * VoterCommander is the component that handles commands for each VoterShape.
    * VoterView deals with dragging the VoterShape for a particular sim.
        * voterShape is a component of VoterView.
    * VoterViewList manages a list of VoterView objects for each sim. It provides a count of the VoterShapes and renders the VoterShapes. It is important because the "exists" property of a VoterShape can be toggled, so we have to filter the list of voters
    * VoterTest is a copy of VoterShape, mostly. VoterTest exists outside of these other classes. It doesn't have command history and doesn't interact with other voters. It's just a test.
    * Data types:
        * These are the standard ways of referring to voter objects that are not classes.
        * voterGroup: an object with a shape1, shape2, and weight (optional) property.
        * voterGeom: 
            * For 2D, an array of objects: {x,y,w}.
            * For 1D, an array of objects: {x,w,densityProfile}.
* Candidates
    * Candidate represents a single candidate. It keeps its state, works with undo, and has render functions.
    * CandidateList manages a list of candidates and adds new ones.
        * Registrar is the component that manages the list.
        * CandidateCommander is the component that handles commands for each Candidate.
    * CandidateView deals with dragging the Candidate for a particular sim.
    * CandidateViewList manages a list of CandidateView objects and tracks whether candidates exist and provides functions to return an array of Candidate objects. It also handles methods that apply to all the members of the list so you don't have to loop through the Candidate objects on your own.
    * Data types: 
        * I made a standard way of referring to candidates as objects that are not classes.
        * canGeoms: 
            * For 2D, an array of objects: {x,y}. 
            * For 1D, an array of objects: {x}.
        * canList: An array of Candidate objects.
        * candidateViewList: a CandidateViewList object.
* CandidateDns
    * Nearly identical mirrors of the classes for Candidates above exist for CandidateDns.

## Election Model

Do the math of the election: casting and counting votes.

* Election
    * The Election class just has code in the context of running a spatial election model. Geometries for voters and candidates are passed as arguments to functions in the Election class. 
    * There are sim-type-specific classes that include Election as a component: ElectionOne, ElectionSample, and ElectionGeo.    
    * SocialChoice
        * The difference between SocialChoice and Election is that Election is a mediator for all the aspects of a spatial election model such as casting a vote, or the number of dimensions, while SocialChoice is a component of the Election that just considers the votes and the result of running the election method. Then SocialChoice returns a summary of the results of the election method.
    * VoterGeo provides a modification of voter positions over a geographical space with districts
    * ElectionGeo compiles district and statewide elections.
* CastVotes
    * Voters cast their ballots. 
    * A distribution of a population of voters is sampled. A 2D spatial model is used to make the decision of how to vote or who to vote for. 
    * The vote is aggregated into a set that only contains the information needed to elect winners and to visualize.
    * There are two ways to cast.
        1. By voter.
        2. By regions of voters. This is more complicated.
    * Output:
        * Some of the following is output.
        * for electionMethods
            * votePop - the fraction of the population that voted as listed.
            * List of votes:
                * scoreVotes - a list of votes. Each vote has a score for each candidate.
                * rankingVotes - a list of votes. Each vote has a rank for each candidate.
                * cansByRank - a list of votes. Each vote is a list indexed by ranking. A list of candidates is at each ranking.
            * preComputedTallies:
                * tallyFractions - a number for each candidate.
                * pairwiseTallyFractions - a fraction for each pair of candidates.
        * for viz
            * cellData:
                * {ranking, cells}
                * {ranking, intervalBorders}
            * gridData: { grid, voteSet, voterGeom }
* ElectionMethods
    * A list of election methods with the same interface.
    * Input votes and some optional precomputed tallies. 
    * Output a social choice and any information for visualization.

## Visualize

* Viz
    * Input:
        * cellData or gridData
    * This is preferred to having the voters and candidates draw themselves because there can be interactions and overlaps.
    * Viz\* draws the voters because there is more context to draw them as a group than individually. 
        * VizOneVoronoi - for votes cast like plurality.
        * VizOneGrid - for votes cast like score.
        * VizGeo - for votes cast in districts.
        * All implement an abstract class of Viz, where there is an update and a render function.
    * Viz\* calls specialized drawing functions for each viz type:
        * GeoMaps draws the voters in tracts and districts.
        * Voronoi1D/2D draws voronoi diagrams.
        * Grid1D/2D draws grids of votes.
        * VoterRender1D/2D has methods to draw the voters outside of any other context.
* VizEntities
    * Draws handles for voters and candidates.
    * CircleGraphic makes an animated circle.
    * SquareGraphic makes an animated square and shows stats.

## Libraries

* Lib
    * External libraries, copied here using snowpack.

## Documentation

* Pages
    * Documentation for the code, and a few test pages.