The architecture tries to be context-oriented. I mean that we keep an idea of the task to be performed.

* An Election class just has code in the context of running an election. Voters and candidates are passed as arguments to functions in the Election class. 
    * The Voters class manages a list of voters. geoVoters is a variation with more functionality for districts. GeoVoters draws the voters because there is more context to draw them as a group than individually. The Voters class and derivatives are responsible for managing interactions between voterGroups, as opposed to managing how to draw an individual voterGroup, which is done with a voterGroup entity.
    * The Candidates class manages a list of candidates.
    * There are higher level classes like oneElection, simElection, and geoElection that are variations on the Election class.
* A Sim class manages voter entities and candidate entities.
    * Entities are visual objects that can be controlled by the user. These include voters and candidates.
* A sandbox is the main user interface.

