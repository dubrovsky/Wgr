Ext.define('TK.store.ky2.PoezdBindTreeLeftNodes', {
    extend: 'Ext.data.TreeStore',
    model: 'TK.model.ky2.PoezdBindTreeNode',
    autoLoad: false,
    root: {
        children: [],
        expanded: true
    }
});