tree-console
========

<div align=right><a href="README.md"><font color=#42b983>English</font></a></div>
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

### 使用

 `tree-cli` 命令用法如下:

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

### 为什么选择 tree-console？

 * 🌲 以树结构展示所指定的目录内容
 * 📝 支持将树结构写入新文件
 * 🌈 支持多色彩输出

### 克隆仓库 ###

```sh
git clone --depth=1 https://github.com/egsee/tree-console.git
```
### License

[MIT](./LICENSE)