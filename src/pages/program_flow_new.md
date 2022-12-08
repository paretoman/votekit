---
title: Program Flow Adding a New Voter
layout: default
---

Here are some call stacks to illustrate what happens when the user adds a voter shape.

Mouse Move to Config change.

Mouse Move to Sim change.

 Commander passes the message along to ComMessenger. Commessenger calls back to Commander. 

Now, we still have to run the election and draw the visuals. That only happens when we get to the next animation frame.

See program_flow_drag for more explanation.