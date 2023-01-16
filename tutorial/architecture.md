---
title: Architecture
layout: default
---

There is a central model-view division. Source [folders](folders.md) are loosely divided between model and view.

[Sim](sim.md) is the main model. It stores inputs and processes them into outputs. Inputs are spatial election model geometries and election options. Processing is casting votes and applying a social choice function. Outputs are the election results.

[View](view.md) sends browser inputs into the Sim and displays visualizations of Sim's outputs.

A [sandbox](sandbox.md) adds the Sim and View to a page. The addSandboxes script adds a sandbox to any element of the HTML page with class 'sandbox'.

Tests are run during development and serve as examples of how a client could use this program.

Also, there are libraries and documentation. 

There is [old documentation](architecture_old.md) that needs to be updated.