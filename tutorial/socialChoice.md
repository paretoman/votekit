---
title: SocialChoice
layout: default

---

A social choice function runs on the votes to determine winners.

* Parent Page: [Election](election.md)

## Social Choice

The difference between socialChoice and election is that election is a mediator for all the aspects of a spatial election model such as casting a vote, or the number of dimensions, while socialChoice is the part of the election that just considers the votes and the result of running the social choice method. Then socialChoice returns a summary of the results of the social choice method.

### Social Choice Methods

* A list of social choice methods with the same interface.
* Input votes, socialChoiceOptions, and some optional precomputed tallies. 
* Output a social choice decision and any information for visualization.
  * iWinners or allocation.