class ClearTree {
    
    treeData = [];
    #renderData = [];
    treeArray = [];
    #defaultOptions = {
        children: 'children',
        label: 'name'
    }

    constructor(data = [], options) {
        this.treeData = data;
        this.options = options || this.#defaultOptions;

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
            let endLabel = (item.last ? '└── ' : '├── ') + item.name;
            row += endLabel;
            this.#renderData.push(row);
            if (item.children && item.children.length) {
                this.#drawTree(item.children);
            }
        }
    }

    /**
     * transformTreeData
     * @param arr 
     * @param parentData 
     */
    #transformTreeData = (arr, parentData) => {
        for (let i = 0; i < arr.length; i++) {

            let item = arr[i];

            item.last = i === (arr.length - 1);

            if (parentData && parentData.parents) {
                let parents = JSON.parse(JSON.stringify(parentData.parents));
                parents.push({ last: parentData.last });
                item.parents = parents;
            } else {
                item.parents = []
            }

            if (item.children && item.children.length) {
                this.#transformTreeData(item.children, item);
            }
        }
    }

    stringTree = () => this.arrayTree().join('\n');

    arrayTree = () => {
        this.#transformTreeData(this.treeData);
        this.#drawTree(this.treeData);

        return this.#renderData;
    }
}


module.exports = ClearTree;