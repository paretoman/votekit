---
title: VoteCasters
layout: default
---

VoteCasters: Votes are cast.

* Parent Page: [Election](election.md)

## VoteCasters

* Voter geometries cast their votes. 
* A density of a population of voters is summed. A 2D spatial model is used to make the decision of how to vote or who to vote for. 
* The vote is aggregated into a set that contains the information needed to elect, explain, and visualize.
* There are two ways to cast.
  1. By points.
  2. By regions. This is more complicated.
* The "votes" output data structure is described below. You can skip to that part.

## Preferences

These are the three ways to state a preference.

* Plurality: a choice of a candidate.
* Scores: a score for each candidate.
* Ranking: a rank for each candidate. No rankings are skipped. Equal ranks allowed.

Preferences are stored in the following ways:

* Plurality
  * pluralityVote: a candidate, the index of the candidate.
  * There is no "pluralityVotes" list of preferences because it isn't needed. It would be an identity matrix.
* Scores
  * scoreVote: a score for each candidate, any number, Number[].
    * Right now, we're just using scores between 0 to 1. In the future, scores above 1 might be used.
  * scoreVotes: an list of scoreVote preferences, Number[][]. Each preference has a score for each candidate.
* Ranking
  * ranking: a rank for each candidate, Number[]. 0 is the best ranking, then 1, 2, etc.
  * rankings: a list of preferences. Each is a list with a rank for each candidate. Number[][]. 0 is the best ranking, then 1, 2, etc.
  * cansByRankList: a list of preferences. Each is a list indexed by rank. Each entry is a list of candidates at that ranking. Candidates are represented by index. Number[][][].

## Counting

Ways to say how many votes.

* area: number of pixels.
* density: votes per pixel. From 0 to 1.
* voteCount: a number of votes.
* voteCounts: a list of numbers of votes for a list of preferences.
* totalVotes: total number of votes.
* voteFractions: a list of fractions for a list of preferences. voteCounts as a fraction of the total number of votes.  From 0 to 1.
* All of these are positive real numbers.

## Tallies

Ways to combine votes. First, we have a loosely defined tally:

* tallyFractions: A general term that should only be used when we don't need to know what type of vote was being used but instead just want to give each candidate a number between 0 and 1.
* Uses of tallyFractions
  * tooltip uses tallyFractions and ranking
  * TestVoterGraphic uses tallyFractions
  * A general representation of a vote as a vector.
* pairwiseTallyFractions have the same lack of context. Just a number from 0 to 1, indexed by a pair of candidates.

Next, we have defined tallies:

### Tallies by Candidate

Ways to combine votes. Each is a list indexed by candidate.

* plurality
  * countByCan: The number of plurality votes for a candidate.
  * voteFractionByCan: The fraction of plurality votes for a candidate.
* score
  * scoreSumByCan: number of votes times score, summed for each candidate.
  * scoreAverageByCan: average score for each candidate. = scoreSumByCan / totalVotes. number of votes times score divided by max score, summed for each candidate. (not used)
  * scoreFractionAverageByCan: average fractional score for each candidate.
* ranking
  * bordaScores: The borda scores for each candidate for one vote.
  * bordaFractions: Fractional borda scores, between 0 and 1.
  * bordaScoreSumByCan: sum of borda scores for a candidate.
  * bordaFractionSumByCan: The sum of fractional borda scores for a candidate. (not used)
  * bordaFractionAverageByCan: The average fractional borda score for a candidate.
  * firstPreferences: a sum of ranking votes for each candidate, counting the vote only by the first preference.

### Pairwise Tallies

Pairwise tallies are indexed by a pair of candidates. The winning candidate is first and the losing candidate is second.

* ranking
  * winsPairwise: The number of wins for the first of a pair of candidates.
  * winFractionPairwise: The fraction of wins for the first of a pair of candidates.

## Votes

Some of the following is output from a vote caster as the "votes" data structure.

* Preferences:
  * scoreVotes - Each preference has a score for each candidate.
  * rankings - Each preference has a rank for each candidate.
  * cansByRankList - Each preference is a list indexed by ranking. A list of candidates is at each ranking.
  * There is no "pluralityVotes" list of preferences because it isn't needed. It would be an identity matrix.
  * voteFractions - the fraction of the population with a preference.
* Tallies:
  * tallyFractions - a fraction for each candidate.
  * pairwiseTallyFractions - a fraction for each pair of candidates.

* Visualization:
  * votesByGeom: Vote data for each voter geometry. A list of votesForGeom. 
  * votesForGeom: Vote data for just one voter geometry.
  * votesForGeom parts may include one of the following, depending on the vote caster:
    * { ranking, cells }
    * { ranking, intervalBorders }
    * { grid, voteSet, voterGeom }
  
  