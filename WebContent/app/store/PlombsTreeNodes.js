Ext.define('TK.store.PlombsTreeNodes', {
    extend: 'Ext.data.TreeStore',
    model: 'TK.model.PlombsTreeNode',
    root: {
        children: [],
        expanded: true
    }
});