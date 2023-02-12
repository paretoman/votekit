---
title: ElectionOptions
layout: default
---

The electionOptions are options inside the election such as socialChoiceMethod. There are two sub categories:
  - The castOptions are options for the vote caster.
  - The socialChoiceOptions are options for the social choice function.

- Parent Page: [Sim](sim.md)

## ElectionOptions

electionOptions structure

* numTracts
* numDistricts
* socialChoiceMethod
* voteCasterName
* socialChoiceType
* castOptions
  * usr
* socialChoiceOptions
  * seats
  * threshold
  * numSampleCandidates

## ElectionOptionsMan

ElectionOptionsMan manages electionOptions and is a mutable class that is useful when making other classes. 

ElectionOptions is immutable and persistent. It's also a simple data structure rather than a class instance. It's useful when calling functions. It's simpler, so it's preferable.

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