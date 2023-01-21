---
title: Sim
layout: default
---

Sim is the model. It stores inputs and processes them into outputs. Inputs are spatial election model geometries and election options. Processing is casting votes and applying a social choice function. Outputs are the election results.

See SimOld for the old documentation for sim.

* Parent page: [Architecture](architecture.md) 
* Child pages: [Commander](commands.md), [Entities](entities.md), [SimMode](simMode.md)

## Sim

Sim is composed of components.

- Changes keeps a list of changes to the Sim.
- [Commander](commands.md) keeps track of commands sent to the Sim and stores them as a configuration. Undo and redo use these commands. Commander is like a middleman.
- [Entities](entities.md) are geometric objects representing voters and candidates.
- SimOptions are outside of the election and include: mode, dimension, and number of districts.
- ElectionOptions are options inside the election and include: socialChoiceMethod, voteCasterName, and two sub categories:

  - CastOptions are options for the vote caster.
  - SocialChoiceOptions are options for the social choice function.
- VoterDistricts creates geometries for voter districts. It does so by providing a modification of voter positions over a geographical space in tracts.
- [SimMode](simMode.md) is where the election happens and handles the processing of inputs geometries, options, and changes to output data structures.
- Pub allows the ViewMode to attach to the SimMode. 
