Ext.define('TK.store.VgCtGrTreeNodes', {
    extend: 'Ext.data.TreeStore',
    model: 'TK.model.VgCtGrTreeNode',
    root: {
        children: [],
        expanded: true
    }
});