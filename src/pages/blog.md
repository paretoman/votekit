
# Learning JSDoc
Documentation generator. Using JSDoc. 
To Install: npm install -D jsdoc. 
-D means --save-dev.
[Crash Course](https://www.youtube.com/watch?v=YK-GurROGIg) - First 8 minutes.
[ES2015 Modules](https://jsdoc.app/howto-es2015-modules.html) - how to document a module.

# Libraries
To get d3-delaunay as an importable module, I temporarily did an npm install d3-delaunay. Then I copied the code, removed the beginning and end parts that deal with npm exports, and renamed it d3-delaunay.esm.js. I did a similar thing with canvas2svg but I just downloaded it from github instead of using npm.

# Learning Parcel
had to install dependency with npm
npm install d3-delaunay
To run a server:
npx parcel .\src\pages\index.html

Couldn't import from https. So I 
// import { Delaunay } from 'd3-delaunay'
import { Delaunay } from 'https://cdn.skypack.dev/d3-delaunay@6'

Clean dist folder:
https://stackoverflow.com/a/69665352

It was difficult to get source maps working. My workaround was to remove inline javascript code from the html, which is probably good anyway. 

Here's an interesting sourcemap visualizer: https://parceljs.org/plugin-system/source-maps/#diagnosing-issues

Tried a few different build steps during deployment to netlify. Build-2 worked. It keeps relative paths.

    "build-1": "parcel build ./src/pages/*.html ./src/test/test.html --public-url ./",
    "build-2": "parcel build ./src/pages/*.html ./src/test/test.html --public-url ../",
    "build-3": "parcel build ./src/pages/*.html ./src/test/test.html"


