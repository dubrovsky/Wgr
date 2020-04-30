Ext.define('TK.store.Docs9TreeNodes', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'TK.model.Docs9TreeNode'
    ],

    model: 'TK.model.Docs9TreeNode',
    root: {
        children: [],
        expanded: true
    }
});