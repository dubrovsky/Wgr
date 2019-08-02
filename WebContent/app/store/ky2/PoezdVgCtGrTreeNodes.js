Ext.define('TK.store.ky2.PoezdVgCtGrTreeNodes', {
    extend: 'Ext.data.TreeStore',
    model: 'TK.model.ky2.PoezdVgCtGrTreeNode',
    autoLoad: false,
    root: {
        children: [],
        expanded: true
    }
});