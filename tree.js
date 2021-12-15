(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TreeConsole = factory());
  }(this, (function () { 'use strict';
  
      var _defaultOptions = {
          label: 'name',
          children: 'children'
      }
      var _options;
  
      /**
       * extend tree array data
       * @param arr 
       * @param parentData 
       */
      function extendTreeData (arr, parentData) {
          for (var i = 0; i < arr.length; i++) {
  
              var item = arr[i];
  
              // add property: last
              item.last = i === (arr.length - 1);
  
              if (parentData && parentData.parents) {
                  var parents = JSON.parse(JSON.stringify(parentData.parents));
                  parents.push({ last: parentData.last });
                  // add property: parents
                  item.parents = parents;
              } else {
                  item.parents = [];
              }
  
              if (item[_options.children] && item[_options.children].length) {
                  extendTreeData(item[_options.children], item);
              }
          }
      }
  
  
      /**
       * drawTree
       * @param treeData 
       */
      /* renderData = [
              '├── package.json',
              '└── packages',
              '    ├── package-a',
              '    │   └── package.json',
              '    └── package-b',
              '        └── package.json'
          ] */
      function drawTree (treeData, renderData) {
          if (!renderData.length && treeData.length) {
              renderData.push('·');
          }
          for (var i = 0; i < treeData.length; i++) {
              var item = treeData[i];
              var row = '';
              var blankIndent = '    ';
              var lineIndent = '│   ';
  
              for (var j = 0; j < item.parents.length; j++) {
                  var pItem = item.parents[j];
                  if (pItem.last) {
                      row += blankIndent;
                  } else {
                      row += lineIndent;
                  }
              }
              var endLabel = (item.last ? '└── ' : '├── ') + item[_options.label];
              row += endLabel;
              renderData.push(row);
              if (item[_options.children] && item[_options.children].length) {
                  drawTree(item[_options.children], renderData);
              }
          }
      }
  
      function getArrayTree () {
          var renderData = [];
          extendTreeData(TreeConsole.treeData);
          drawTree(TreeConsole.treeData, renderData);
          return renderData;
      }
  
      var TreeConsole = {};
  
      TreeConsole.getStringTree = function (data, options) {
          TreeConsole.treeData = data || [];
          _options = options || _defaultOptions;
          return getArrayTree().join('\n');
      }
  
  
      return TreeConsole;
  })));