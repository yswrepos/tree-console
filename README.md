tree-console 
========

<div align=right><a href="README_zh.md"><font color=#42b983>中文</font></a></div>
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

### Usage

You can run the `tree-cli` command in the shell like this:

```sh
$ tree-cli -d ./tree-console -i node_modules,.git,.DS_Store

·
└── tree-console
    ├── .gitignore
    ├── LICENSE
    ├── README.md
    ├── README_zh.md
    ├── bin
    │   └── tree-cli.js
    ├── package-lock.json
    ├── package.json
    └── tree-console
        ├── read-dir-to-tree.js
        └── tree-console.js
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

### Why tree-console?

 * 🌲 Lists directory content in a tree structure
 * 📝 Write tree structure to a new file
 * 🌈 Supports colourized outputs

### Cloning this repository ###

```sh
git clone --depth=1 https://github.com/egsee/tree-console.git
```
### License

[MIT](./LICENSE)
