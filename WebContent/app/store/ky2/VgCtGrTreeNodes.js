Ext.define('TK.store.ky2.VgCtGrTreeNodes', {
    extend: 'Ext.data.TreeStore',
    model: 'TK.model.ky2.VgCtGrTreeNode',
    // storeId: 'ky2VgCtGrTreeNodes',
    autoLoad: false,
    root: {
        children: []
        /*,
        expanded: true*/
    }
});