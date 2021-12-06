#! /usr/bin/env node

var program = require('commander'),
    chalk = require('chalk'),
    fs = require('fs-extra'),
    ReadDirToTree = require('../tree-console/read-dir-to-tree.js'),
    ClearTree = require('../tree-console/tree-console.js');

function errorColor (str) {
    return `\x1b[31m${str}\x1b[0m`;
}

program
    .configureOutput({
        writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        outputError: (str, write) => write(errorColor(str))// Output errors in red.
    });

program
    .version('1.0.2')
    .option('-d, --dir <path>', 'the directory path you want to render by tree')
    .option('-c, --color [color]', 'tree’s color which output to the console', 'white')
    .option('-o, --out <path>', 'write the tree to a new file path')
    .option('-t, --type <type>', 'the new file type', 'md')


program.parse(process.argv);

const options = program.opts();

if (options.dir) {
    
    let readDirToTree = new ReadDirToTree(options.dir);
    const treeData = readDirToTree.getFileTree();

    let cTree = new ClearTree(treeData);
    const outputContent = cTree.stringTree();

    let color = options.color || 'white';

    console.log(chalk[color](outputContent));

    if (options.out) {
        let outputFile = options.out;
        let writeContent = outputContent;
  
        const fileType = options.type;
        if (fileType) {
            outputFile += '.' + fileType;
          
            if (fileType === 'md') {
                const codeStr = '```';
                writeContent = `${codeStr}
${outputContent}
${codeStr}`;
            }
        }
       
        fs.writeFile(outputFile, writeContent, (err) => {
            if (err) {
                console.log(`创建失败：${err}`);
            } else {
                console.log('创建成功！');
            }
        })
    }

}