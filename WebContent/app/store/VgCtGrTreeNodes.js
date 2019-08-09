Ext.define('TK.store.VgCtGrTreeNodes', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'TK.model.VgCtGrTreeNode'
    ],

    model: 'TK.model.VgCtGrTreeNode',
    root: {
        children: [],
        expanded: true
    },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});
