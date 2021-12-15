#!/usr/bin/env node

var program = require('commander'),
    chalk = require('chalk'),
    fs = require('fs-extra'),
    ReadDirToTree = require('../read-dir-to-tree.js'),
    Tree = require('../tree.js');

function errorColor (str) {
    return `\x1b[31m${str}\x1b[0m`;
}

program
    .configureOutput({
        writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        outputError: (str, write) => write(errorColor(str))// Output errors in red.
    });

program
    .version('1.2.1')
    .option('-d, --dir <directoryPath>', 'the directory path you want to render by tree')
    .option('-o, --out <filename>', 'write the tree to a new file')
    .option('-i, --ignore <ignoreFiles>', 'ignore file(s) or directory')
    .option('-l, --level <level>', 'the depth of the directory tree')
    .option('-c, --color [color]', 'enable color output', 'white')


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

if (valid) {
    if (options.dir) {

        var treeData = ReadDirToTree.getFileTree(options);

        var outputContent = Tree.getStringTree(treeData);

        var color = options.color || 'white';

        console.log(chalk[color](outputContent));

        if (options.out) {
            writeTreeToFile(options.out, outputContent);
        }

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
            console.log('\n[ERR]', chalk.red(`File create failure！${err}`));
        } else {
            console.log('\nFile create success！');
        }
    })
}