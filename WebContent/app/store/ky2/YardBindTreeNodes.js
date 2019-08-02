Ext.define('TK.store.ky2.YardBindTreeNodes', {
    extend: 'Ext.data.TreeStore',
    model: 'TK.model.ky2.YardBindTreeNode',
    autoLoad: false,
    root: {
        children: [],
        expanded: true
    }
});