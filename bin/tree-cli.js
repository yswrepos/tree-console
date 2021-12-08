#! /usr/bin/env node

var program = require('commander'),
    chalk = require('chalk'),
    fs = require('fs-extra'),
    ReadDirToTree = require('../tree-console/read-dir-to-tree.js'),
    TreeConsole = require('../tree-console/tree-console.js');

function errorColor (str) {
    return `\x1b[31m${str}\x1b[0m`;
}

program
    .configureOutput({
        writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        outputError: (str, write) => write(errorColor(str))// Output errors in red.
    });

program
    .version('1.1.0')
    .option('-d, --dir <directoryPath>', 'the directory path you want to render by tree')
    .option('-o, --out <filename>', 'write the tree to a new file')
    // .option('-i, --ignore <ignoreFiles>', 'ignore the specified directory or file, they will not be listed')
    .option('-c, --color [color]', 'tree’s color which output to the terminal', 'white')


program.parse(process.argv);

var options = program.opts();

function assert (condition, msg) {
    if (!condition) {
        console.log('[WARN]', chalk.hex('#E6A23C')(`${msg}`));
        return false;
    }
    return true;
}

var valid = assert(!options.out || (options.dir && options.out), "warn: option '-d, --dir <path>' missing");
if (!valid) return;


if (options.dir) {

    var ignores = options.ignore ? options.ignore.split(',') : [];

    var readDirToTree = new ReadDirToTree(options.dir, ignores);
    var treeData = readDirToTree.getFileTree();

    var treeConsole = new TreeConsole(treeData);
    var outputContent = treeConsole.getStringTree();

    var color = options.color || 'white';

    console.log(chalk[color](outputContent));

    if (options.out) {
        writeTreeToFile(options.out, outputContent);
    }

}

function writeTreeToFile (filename, outputContent) {
    var index = filename.lastIndexOf(".");
    var ext = 'md';
    if (index === -1) {
        filename += '.' + ext;
    }
    if (index !== -1 && index !== filename.length - 1) {
        ext = filename.slice(index + 1);
    }

    var writeContent = outputContent;

    if (ext === 'md') {
        writeContent = '```' + "\r" + outputContent + "\r" + '```';
    }

    fs.writeFile(filename, writeContent, (err) => {
        if (err) {
            console.log('\n[ERR]', chalk.red(`File create failure：${err}`));
        } else {
            console.log('\nFile create success！');
        }
    })
}