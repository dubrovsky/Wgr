Ext.define('TK.store.ky2.AvtoBindTreeRightNodes', {
    extend: 'Ext.data.TreeStore',
    model: 'TK.model.ky2.AvtoBindTreeNode',
    autoLoad: false,
    root: {
        children: [],
        expanded: true
    }
});