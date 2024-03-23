# Basic Instructions

## Try

The homepage has a simple [example](https://www.howtofixtheelection.com/votekit/) running the source code in the browser, so you can see how it works:

I run tests like this [one](https://www.howtofixtheelection.com/votekit/dist/test) while I am developing the code.

Press F12 to get the browser's dev tools. They're great for stepping through the code. Pause the code with F8 and step through with F10 and F11.

Codesandbox is an interactive code editor so you can make a copy and make your own [edits](https://codesandbox.io/s/github/paretoman/votekit) to see how things work. There's a little troubleshooting you have to do in loading packages, though. It's not the most foolproof.

## Use

One way to include this library in your project is to use it as a submodule. You can use any directory or path instead of "votekit".

```
git submodule add https://github.com/paretoman/votekit.git votekit
```

Then add this script tag in your code.

```
<script src="votekit/src/addSandboxes/addSandboxes.js"></script>
```

Another way is to copy and paste the distribution [bundle](https://github.com/paretoman/votekit/tree/gh-pages/dist) to your project.

Another way to add this distribution bundle is to put this script tag and these css tags in your code:

```
<script src="https://raw.githubusercontent.com/paretoman/votekit/gh-pages/dist/src/addSandboxes/addSandboxes.js"></script>
<link href="https://raw.githubusercontent.com/paretoman/votekit/gh-pages/dist/src/addSandboxes/sandbox.css" rel="stylesheet">
<link href="https://raw.githubusercontent.com/paretoman/votekit/gh-pages/dist/src/view/menu/button.css" rel="stylesheet">
```

For any of these methods, the script will run and find any HTMLElements, such as a div, with the class "sandbox" and insert a simulation sandbox as its neighbor under the same parent. You can use the data- attributes to pass data to the sandbox to configure it.

## Develop

The [Tutorial](https://www.howtofixtheelection.com/votekit/tutorial/) explains the architecture of the code, for those who want to develop it.

I wanted the code to be easy to download and edit. All you have to do is find the "code/download" button above, download the code, and start a webserver. Then you make changes and see results. You don't need node or npm. You'll get to those later. For now, you'll just need to start a local web server and that's it.

I suggest VSCode as an editor. Use an extension in VSCode to launch a web server. Specifically, use Ritwick Dey's Live Server. Also, you'll need to do a few steps to get fully into development mode. Use F5 to do debugging. For the first time hitting F5 in VSCode, choose to attach to Chrome, save the file, then hit F5 again.

There are also auto-generated [docs](https://www.howtofixtheelection.com/votekit/docs/), but I'm not sure they are really helpful.

## Build

If you really get into developing the code, you'll probably like to know that I use development tools like eslint, parcel, jsdoc, snowpack, and jekyll. Just check package.json for all the scripts.
