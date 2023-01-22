---
title: Architecture
layout: default
---

* Parent page: [index](index.md)
* Child pages:  [folders](folders.md), [Election](election.md). [Sim](sim.md), [View](view.md), [sandbox](sandbox.md), [Program flow](programFlow.md)

There is a central model-view division that follows the observer pattern. Source [folders](folders.md) are loosely divided between election, sim, view, and sandbox. The tests folder is for the client.

[Sim](sim.md) is the main model. It stores inputs and processes them into outputs. Inputs are spatial election model geometries and election options. Processing is holding one or multiple elections. Outputs are the election results.

[Election](election.md) handles casting votes and applying a social choice function. This part is more general than Sim and could more likely be used as a library for other projects.

[View](view.md) sends browser inputs into the Sim and displays visualizations of Sim's outputs. Browser input controls include menus, tooltips, and screens.

A [sandbox](sandbox.md) adds the Sim and View to a page. The addSandboxes script adds a sandbox to any element of the HTML page with class 'sandbox'.

The components roughly depend on each other like so:

sandbox -> view -> sim -> election

* sandbox imports: sim, view
* view imports: sim, election
* sim imports: election

[Program flow](programFlow.md) is triggered by loading the page and accepting program inputs from the HTML and URL.

Tests are examples of how a client could use this program. They are used during development to test the program. To use this program, copy index.html and s/index.html to where you want to in your own site. Use "s/index.html" as a standalone sandbox page to link to when saving the configuration to a link. 

In the future, unit tests for the sim will be added.

Also, there are libraries, utilities, and documentation. Npm libraries are copied here using snowpack. Tutorial pages explain the architecture. JsDoc generates docs for js files and functions, but this can be harder to read.

For a reference on model-view division and Model-View-Controller architecture, see Pattern-Oriented Software Architecture by Buschmann in 1996. Really, all you need to know is the observer pattern.

