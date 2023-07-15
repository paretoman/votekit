---
title: OptionsBag
layout: default
---


- The optionsBag contains many options, including for sampling, geography, sequences, polling, and elections.

- Parent Page: [Sim](sim.md)

## OptionsBag

optionsBag structure

* numTracts
* numDistricts
* numSampleCandidates
* castOptions
  * usr: under-sampling ratio - how many pixels in length between sampling points
  * verbosity: how much data to store in votes data structure.
* electionOptions
  * socialChoiceMethod
  * voteCasterName
  * socialChoiceType
  * socialChoiceOptions
    * seats
    * threshold

## ElectionOptionsMan

ElectionOptionsMan manages optionsBag and is a mutable class that is useful when making other classes. 

optionsBag is immutable and persistent. It's also a simple data structure rather than a class instance. It's useful when calling functions. It's simpler, so it's preferable.

The same pattern applies to CastOptionsMan and SocialChoiceOptionsMan.

The parts of ElectionOptionsMan are:

* init: initialization
* setters
  * setSocialChoiceMethod
  * setNumDistricts
  * setNumTracts
* update
* getOptions: getter
* castOptionsMan
  * update
  * getOptions: getter
* socialChoiceOptionsMan
  * update
  * getOptions: getter