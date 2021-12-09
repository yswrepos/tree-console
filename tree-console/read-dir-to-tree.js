const fs = require('fs-extra');
const path = require('path');

class ReadDirToTree {
    rootDir;
    fileTree = [];
    ignores;
    level;

    constructor({ dir, ignore, level }) {
        this.rootDir = this.#getRootDir(dir);
        this.ignores = ignore ? ignore.split(',') : [];
        this.level = level || null;
    }

    #getRootDir = (dir) => {
        var rootDir = path.join(process.cwd(), dir);
        if (rootDir.slice(-1) === '/') {
            rootDir = rootDir.slice(0, -1);
        }

        return rootDir;
    }

    #getLevel = (dirPath) => {
        if (dirPath === this.rootDir) return 1;
        return dirPath.split(this.rootDir)[1].split('/').length;
    }

    #ignoreHandle = (dirPath, dirName, ignoreContent) => {
        if (Object.prototype.toString.call(ignoreContent) === '[object Array]') {
            for (var i = 0; i < this.ignores.length; i++) {
                if (this.#ignoreHandle(dirPath, dirName, this.ignores[i])) {
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

    #buildFileTree = (dir, arr) => {
        if (!arr) arr = [];

        const list = dir.split('/');
        let dirName = list[list.length - 1];
        let data = {
            name: dirName,
            level: this.#getLevel(dir)
        };

        var isIgnore = this.#ignoreHandle(dir, dirName, this.ignores);

        if (isIgnore) return;

        if (this.level && data.level > this.level) return;

        if (fs.statSync(dir).isDirectory()) {
            data.children = [];
            fs.readdirSync(dir).forEach((item) => {
                item = path.join(dir, item);
                this.#buildFileTree(item, data.children);
            });
        }

        arr.push(data);

    }

    getFileTree = () => {
        this.#buildFileTree(this.rootDir, this.fileTree);
        return this.fileTree;
    }
}

module.exports = ReadDirToTree;