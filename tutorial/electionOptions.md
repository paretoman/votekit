---
title: ElectionOptions
layout: default
---

ElectionOptions are options inside the election and include: socialChoiceMethod, voteCasterName, number of districts and two sub categories:
  - castOptions are options for the vote caster.
  - socialChoiceOptions are options for the social choice function.

- Parent Page: [Sim](sim.md)

## ElectionOptionsMan

ElectionOptionsMan manages electionOptions and is a mutable class that is useful when making other classes. 

ElectionOptions is immutable and persistent. It's also a simple data structure rather than a class instance. It's useful when calling functions. It's simpler, so it's preferable.

Todo: fill in more details about options.