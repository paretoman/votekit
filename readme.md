# Basic Instructions

## Try

[Here is a simple example](https://www.howtofixtheelection.com/votekit/test) running the source code in the browser, so you can see how it works. This is what I run when I'm coding:

* https://www.howtofixtheelection.com/votekit/test

[Make edits and save as a fork on codesandbox](https://codesandbox.io/s/github/paretoman/votekit). This is pretty cool, you can just jump right into the code and make new things and save them. Much better than F12.

* https://codesandbox.io/s/github/paretoman/votekit

[Here is the votekit library being included as a submodule](https://www.howtofixtheelection.com/votekit-example) as part of a github-pages site.

* https://www.howtofixtheelection.com/votekit-example.

## Use

One way to include this library in your project is to use it as a submodule. You can use any directory or path instead of "votekit".
```
git submodule add https://github.com/paretoman/votekit.git votekit
```
Then add this script tag in your code.
```
<script src="votekit/src/sandbox/addSandboxes.js"></script>
```

Another way is to copy and paste the [distribution bundle](https://github.com/paretoman/votekit-example-src/tree/main/lib/votekit/dist) to your project: 

* https://github.com/paretoman/votekit-example-src/tree/main/lib/votekit/dist


Another way to add this distribution bundle is to put this script tag and these css tags in your code:

```
<script src="https://raw.githubusercontent.com/paretoman/votekit-example-src/main/lib/votekit/dist/src/sandbox/addSandboxes.js"></script>
<link href="https://raw.githubusercontent.com/paretoman/votekit-example-src/main/lib/votekit/dist/src/sandbox/sandbox.css" rel="stylesheet">
<link href="https://raw.githubusercontent.com/paretoman/votekit-example-src/main/lib/votekit/dist/src/aView/menu/button.css" rel="stylesheet">
```

For any of these methods, the script will run and find any HTMLElements, such as a div, with the class "sandbox" and insert a simulation sandbox as its neighbor under the same parent. You can use the data- attributes to pass data to the sandbox to configure it.

## Develop

[Architecture](https://www.howtofixtheelection.com/votekit/tutorial/architecture): 

* https://www.howtofixtheelection.com/votekit/tutorial/architecture

To make changes, use a good code editor and launch a web server to view ./test/index.html. 

I suggest VSCode as an editor. Use an extension in VSCode to launch a web server. Specifically, use Ritwick Dey's Live Server. Also, you'll need to do a few steps to get fully into development mode. Use F5 to do debugging. For the first time hitting F5 in VSCode, choose to attach to Chrome, save the file, then hit F5 again.

Read [the documentation](https://votekit.netlify.app/docs/):

* https://votekit.netlify.app/docs/

## Build

There are a few more things you can do. Use JSDoc to make the documentation. Use Parcel to bundle the javascript into one file, like in the top link.

Here's an example [netlify deploy](https://votekit.netlify.app/):

* https://votekit.netlify.app/