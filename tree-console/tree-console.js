class TreeConsole {

    treeData = [];
    #renderData = [];
    treeArray = [];
    #defaultOptions = {
        label: 'name',
        children: 'children'
    }

    constructor(data = [], options) {
        this.treeData = data;
        this.options = options || this.#defaultOptions;
    }


    /**
     * extend tree array data
     * @param arr 
     * @param parentData 
     */
     #extendTreeData = (arr, parentData) => {
        for (let i = 0; i < arr.length; i++) {

            let item = arr[i];

            // add property: last
            item.last = i === (arr.length - 1);

            if (parentData && parentData.parents) {
                let parents = JSON.parse(JSON.stringify(parentData.parents));
                parents.push({ last: parentData.last });
                 // add property: parents
                item.parents = parents;
            } else {
                item.parents = [];
            }

            if (item[this.options.children] && item[this.options.children].length) {
                this.#extendTreeData(item[this.options.children], item);
            }
        }
    }

    /* let arr = [
        '├── package.json',
        '└── packages',
        '    ├── package-a',
        '    │   └── package.json',
        '    └── package-b',
        '        └── package.json'
    ] */
    /**
     * drawTree
     * @param arr 
     */
    #drawTree = (arr) => {
        if (!this.#renderData.length && arr.length) {
            this.#renderData.push('·');
        }
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            let row = '';
            const blankIndent = '    ';
            const lineIndent = '│   ';

            for (let j = 0; j < item.parents.length; j++) {
                const pItem = item.parents[j];
                if (pItem.last) {
                    row += blankIndent;
                } else {
                    row += lineIndent;
                }
            }
            let endLabel = (item.last ? '└── ' : '├── ') + item[this.options.label];
            row += endLabel;
            this.#renderData.push(row);
            if (item[this.options.children] && item[this.options.children].length) {
                this.#drawTree(item[this.options.children]);
            }
        }
    }

    getArrayTree = () => {
        this.#extendTreeData(this.treeData);
        this.#drawTree(this.treeData);

        return this.#renderData;
    }

    getStringTree = () => this.getArrayTree().join('\n');
}


module.exports = TreeConsole;