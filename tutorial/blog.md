---
title: Blog
layout: default
---

Here are some tools for development.

I'm not sure if this is useful. I usually write notes to myself outside of the repo. 

* Parent Page: [index](index.md)

## Learning JSDoc

Documentation generator. Using JSDoc. 
To Install: 

    npm install -D jsdoc. 
    -D means --save-dev.

[Crash Course](https://www.youtube.com/watch?v=YK-GurROGIg) - First 8 minutes.
[ES2015 Modules](https://jsdoc.app/howto-es2015-modules.html) - how to document a module.

## Learning Parcel

had to install dependency with npm

    npm install d3-delaunay

To run a server:

    npx parcel .\src\pages\index.html

Clean dist folder:
https://stackoverflow.com/a/69665352

It was difficult to get source maps working. My workaround was to remove inline javascript code from the html, which is probably good anyway. 

Here's an interesting sourcemap visualizer: https://parceljs.org/plugin-system/source-maps/#diagnosing-issues

## Codesandbox
I had to get the babel package "@babel/plugin-proposal-class-properties" to get the codesandbox to work. This required a few changes, like adding a .babelrc and adding @babel/core as well. I only use babel for this, and I don't yet use babel for transpiling from the command line.