---
title: Screen
layout: default
---

# Screen

We now use a wrapping div around the background, foreground, and tooltip layers, which all overlap. The wrapping div handles margins, so we don't have to do any offsets. Also, we use the clientX, clientY coordinate system with reference to the canvas instead of in reference to the target because we want to capture events happening on the tooltip.