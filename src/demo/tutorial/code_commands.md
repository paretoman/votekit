---
title: CommandsDetailed
layout: default
---

# Command Pattern and Uses

Parent page: [Commands](commands.md) 

## Commander.js

Both the command pattern and the memento pattern are used here.
 * Commands are performed to make changes to the mementos.

Memento Pattern:
 * Caretaker: this class. It keeps config as a list of mementos.
 * Originator: menuItem.
 * Mementos: Config is a list of mementos. It's not a strict pattern.

Command Pattern:
 * Client: this class. It asks a sender to execute commands.
 * Command: a name-value pair. Actions are listed by name. Commands are stored in history.
 * Invoker: actions, execute(). The sender keeps a list of actions to execute.
 * Receiver: menuItem. The receiver calls commander.addAction(...) to add to the sender's actions.

References:
 * [First google result for "invoker command pattern". It has a classic example of a stock broker.](https://home.csulb.edu/~pnguyen/cecs277/lecnotes/Command%20Pattern%201.pdf)
 * [Memento Pattern on Wikipedia](https://en.wikipedia.org/wiki/Memento_pattern)
 * [Memento Tutorial from refractoring.guru](https://refactoring.guru/design-patterns/memento)

## ComMessenger.js

ComMessenger is a messenger that passes commands from one to another. To decide whether to pass commands, it checks whether the sandboxes are linked. If they are, it will pass the commands on to all the other commanders. ComMessenger is a man in the middle between the command being sent with do() and the do() command actually executing.

Undo and Redo are not linked.

## Commanding Non-instantiated Entities

### Old Way
Tell commander how to create new entities when they haven't been instantiated yet. Without being instantiated, they don't have command senders yet, so the commander will get a command that it doesn't know how to handle.
commander.newCreator(creator = sim.addVoterPressed, creatorName = "addVoter")

If there is no action for a command, then call the creator that is referenced by its name.

### New Way
A new way of handling this problem was created because we want to be able to load a sim configuration from a config file. The commander needed a list of all commands before the entities are created, so we created a CandidateCommander class and similar for voters and candidateDistributions. 

For the Commander class, we made new methods like Commander.addListSender for creating command senders that deal with lists of entities. Instead of passing a currentValue when creating a command sender, we pass a currentValue when instantiating an entity. The values are stored in arrays inside config[name].

We created a command property that specifies to not add it to the history. This was needed for setNumberCandidates because the command needed to be broadcast to the other commanders but not stored in the history. We don't want to undo setNumberCandidates because we don't actually undo creating entities, we just set their exists property to false.

Config is stored differently too. config['voter-setE'][id] is the setE property for a voter with an id (serial number). 

In the future, I might add currentValue as a property of all commands.

## Details
When we're unlinked, we might end up having an entity that is only in one sandbox. If we become linked and start to move the sole entities, we want to create entities on the other side in order to catch up.

* Test: unlink, add candidate, link, move the new candidate.
* Assert: When the candidate is moved, a new candidate is created in the other sandbox and moves with it.

* Test: Undo creation of a candidate in one sandbox. Move the candidate in the other sandbox.
* Assert: The undone candidate doesn't get come back into existence.

Future: Right now, we can get into a state where we don't have any way to bring a specific entity back into existence. Maybe I should make a way to toggle the existence of entities. Or maybe I could show entities that don't exist as ghosts (using transparency). They could still be moved and clicked on for editing properties. And there could be a "show deleted entities" button to avoid clutter. I haven't implemented clicking and editing properties yet.

## Loading Commands
When initially loading a sandbox, a config can be passed in. The commander takes this with commander.loadConfig, then broadcasts to other sandboxes. When we are setting the initial config, we clear the history so no undo is available initially.

We prioritized loading the commands that have to do with creating candidates, voters, and candidateDistributions. 

## Things to Delete
The creator property can be deleted. We solved this problem another way by prioritizing commands. The noUndo property can be deleted. We solved this by loading commands instead of doing them.

## Update - Mediator
I separated the original Commander.js into three component classes. Commander is now a mediator between the three. 

1. The CommandStore class provides the ability to execute commands. Commands here are different than the usual command pattern because CommandStore is providing their ability to execute, instead of encapsulating execute in the command. The command, here, is just a description of how to execute. Maybe a better name would be a commandNote.

2. The Config class keeps a list of command objects that would need to be executed in order to return the sim to its current state. We use this list to load a configuration into a new sandbox. We also use the list to know the currentValue of a setting so we can undo.

3. The History class keeps a list of all command objects that were executed. Well almost. It only stores those that we would like the user to be able to undo. So, when we want to load an example, we erase any history that is generated by the process of loading a configuration. 