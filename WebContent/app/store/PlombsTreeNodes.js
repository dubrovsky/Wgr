Ext.define('TK.store.PlombsTreeNodes', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'TK.model.PlombsTreeNode'
    ],

    model: 'TK.model.PlombsTreeNode',
    root: {
        children: [],
        expanded: true
    }
});