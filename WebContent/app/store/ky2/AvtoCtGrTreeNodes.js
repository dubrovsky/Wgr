Ext.define('TK.store.ky2.AvtoCtGrTreeNodes', {
    extend: 'Ext.data.TreeStore',
    model: 'TK.model.ky2.AvtoCtGrTreeNode',
    autoLoad: false,
    root: {
        children: [],
        expanded: true
    }
});