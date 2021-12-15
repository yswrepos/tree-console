var fs = require('fs-extra');
var path = require('path');

var _rootDir, _level, _ignores;

function getRootDir (dir) {
    _rootDir = path.join(process.cwd(), dir);
    if (_rootDir.slice(-1) === '/') {
        _rootDir = _rootDir.slice(0, -1);
    }

    return _rootDir;
}

function getLevel (dirPath) {
    if (dirPath === _rootDir) return 1;
    return dirPath.split(_rootDir)[1].split('/').length;
}

function ignoreHandle (dirPath, dirName, ignoreContent) {
    if (Object.prototype.toString.call(ignoreContent) === '[object Array]') {
        for (var i = 0; i < _ignores.length; i++) {
            if (ignoreHandle(dirPath, dirName, _ignores[i])) {
                return true;
            }
        }
        return false;
    }

    ignoreContent = ignoreContent.trim();
    if (!ignoreContent) return false;

    if (ignoreContent.includes('/')) {
        ignoreContent = ignoreContent.slice(-1) === '/' ? ignoreContent.slice(0, -1) : ignoreContent;
        var name = ignoreContent.split('/').slice(-1)[0];
        return dirPath.includes(ignoreContent) && name === dirName;
    }

    return ignoreContent === dirName;
}

function buildFileTree (dir, arr) {
    if (!arr) arr = [];

    var list = dir.split('/');
    var dirName = list[list.length - 1];
    var data = {
        name: dirName,
        level: getLevel(dir)
    };

    var isIgnore = ignoreHandle(dir, dirName, _ignores);

    if (isIgnore) return;

    if (_level && data.level > _level) return;

    if (fs.statSync(dir).isDirectory()) {
        data.children = [];
        fs.readdirSync(dir).forEach((item) => {
            item = path.join(dir, item);
            buildFileTree(item, data.children);
        });
    }

    arr.push(data);

}

var ReadDirToTree = {};

ReadDirToTree.getFileTree = function ({ dir, ignore, level }) {
    _rootDir = getRootDir(dir);
    _level = level || null;
    _ignores = ignore ? ignore.split(',') : [];
    var fileTree = [];
    buildFileTree(_rootDir, fileTree);
    return fileTree;
}

module.exports = ReadDirToTree;