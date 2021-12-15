# tree-console 

<div align=right><a href="https://github.com/egsee/tree-console/blob/master/README_zh.md"><font color=#42b983>中文</font></a></div>
<p>
    <a href="https://www.npmjs.com/package/tree-console">
        <img src="https://img.shields.io/npm/v/tree-console" alt="NPM Version"></a>
    <a href="https://www.npmjs.org/package/tree-console">
        <img src="http://img.shields.io/npm/dm/tree-console.svg" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/tree-console">
        <img src="https://img.shields.io/npm/l/tree-console.svg?sanitize=true" alt="License"></a>
</p>

Tree-console is a small, extremely simple CLI tool with [Node.js](https://nodejs.org). You can use `tree-cli` command to print out the directory tree structure in terminal.
### Install

Make sure you have Node.js (version 12 or above) installed and install globally:

```sh
npm install tree-console -g
```

### Use in terminal

You can run the `tree-cli` command in the shell like this:

```
$ tree-cli -d ./tree-console --ignore node_modules,.git,.DS_Store

·
└── tree-console
    ├── .gitignore
    ├── .npmignore
    ├── LICENSE
    ├── README.md
    ├── README_zh.md
    ├── bin
    │   └── tree-cli.js
    ├── package-lock.json
    ├── package.json
    ├── read-dir-to-tree.js
    └── tree.js
```

### Options

```
Usage: tree-cli [options]

Options:
  -V, --version               output the version number
  -d, --dir <directoryPath>   the directory path you want to render by tree
  -o, --out <filename>        write the tree to a new file
  -i, --ignore <ignoreFiles>  ignore the specified directory or file, they will not be listed
  -l, --level <level>         the depth of the directory tree
  -c, --color [color]         tree’s color which output to the terminal (default: "white")
  -h, --help                  display help for command
```
### Use in browser

First install using npm:

```sh
npm install tree-console --save
```

Use it in your project:

```js
var tree = require('tree-console');
console.log(
    tree.getStringTree([
        {
            name: "done",
            children: [
                { name: "hiking" }, 
                { name: "camping"}
            ]
        }, {
            name: "todos",
            children: [
                { name: "scuba diving" },
                { name: "surfing" }
            ]
        }
    ]
));
```

Will then printing the results:
```
·
├── done
│   ├── hiking
│   └── camping
└── todos
    ├── scuba diving
    └── surfing
```
See from the example above, `getStringTree()` accepts an array of objects as a parameter, it also accepts the second parameter which is optional, you can use as follows:

```js
tree.getStringTree([
    {
        title: "done",
        items: [
            { title: "hiking" }, 
            { title: "camping"}
        ]
    }
], {
    label: "title",
    children: "items"
})
```
> getStringTree(array, [option])
>
> the option's default value is {label: "name", children: "children"}

### Why tree-console?
 * 🌲 Lists directory content in a tree structure
 * 📝 Write tree structure to a new file
 * 🌈 Supports colourized outputs
 * 🐬 Convert an array to a tree structure

### Cloning this repository

```sh
git clone --depth=1 https://github.com/egsee/tree-console.git
```
### License

[MIT](./LICENSE)
