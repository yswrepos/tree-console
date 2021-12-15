# tree-console 

<div align=right><a href="https://github.com/egsee/tree-console"><font color=#42b983>English</font></a></div>
<p>
    <a href="https://www.npmjs.com/package/tree-console">
        <img src="https://img.shields.io/npm/v/tree-console" alt="NPM Version"></a>
    <a href="https://www.npmjs.org/package/tree-console">
        <img src="http://img.shields.io/npm/dm/tree-console.svg" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/tree-console">
        <img src="https://img.shields.io/npm/l/tree-console.svg?sanitize=true" alt="License"></a>
</p>
    
Tree-console 是一个极简的 [Node.js](https://nodejs.org) 命令行工具，可以使用 `tree-cli` 命令在终端输出指定目录的树型结构。

### 安装

确保你已经安装了Node.js（版本号 >= 12），然后全局安装：

```sh
npm install tree-console -g
```

### 在终端使用

 `tree-cli` 命令用法如下:

```sh
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

### 命令选项

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

先使用 npm 进行安装：

```sh
npm install tree-console --save
```

在项目中使用如下：

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
输出结果如下：
```
·
├── done
│   ├── hiking
│   └── camping
└── todos
    ├── scuba diving
    └── surfing
```
通过上面的例子可以看出 `getStringTree()` 接收一个对象数组作为第一个参数, 除此之外它还接收第二个可选的参数, 使用如下：

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
> 参数 option 的默认值是 {label: "name", children: "children"}

### 为什么选择 tree-console？

 * 🌲 以树结构展示所指定的目录内容
 * 📝 支持将树结构写入新文件
 * 🌈 支持多色彩输出
 * 🐬 将数组转换为树结构

### 克隆仓库 ###

```sh
git clone --depth=1 https://github.com/egsee/tree-console.git
```
### License

[MIT](./LICENSE)