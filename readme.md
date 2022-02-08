# Basic Instructions

## Try

Try it out at https://votekit.netlify.app/pages/

Here it is as part of a github-pages site at https://www.howtofixtheelection.com/votekit-example

## Use

One way to include this library in your project is to use it as a submodule. You can use any directory or path instead of "votekit".
```
git submodule add https://github.com/paretoman/votekit.git votekit
```
Then add this script tag in your code.
```
<script src="votekit/src/ui/addSandboxes.js"></script>
```

Another way is to copy and paste the [distribution bundle](https://github.com/paretoman/votekit-example/tree/gh-pages/votekit/dist) to your project.


Another way to add this distribution bundle is to put this script tag in your code:

```
<script src="https://raw.githubusercontent.com/paretoman/votekit-example/gh-pages/votekit/dist/addSandboxes.js"></script>
```

For any of these methods, the script will run and find any HTMLElements, such as a div, with the class "sandbox" and insert a simulation sandbox as its neighbor under the same parent. You can use the data- attributes to pass data to the sandbox to configure it.

## Develop

To make changes, use a good code editor and launch a web server to view ./src/pages/index.html. 

I suggest VSCode as an editor. Use an extension in VSCode to launch a web server. Specifically, use Ritwick Dey's Live Server. Also, you'll need to do a few steps to get fully into development mode. Use F5 to do debugging. For the first time hitting F5 in VSCode, choose to attach to Chrome, save the file, then hit F5 again.

## Build

There are a few more things you can do. Use JSDoc to make the documentation. Use Parcel to bundle the javascript into a distribution, like in the top link.
