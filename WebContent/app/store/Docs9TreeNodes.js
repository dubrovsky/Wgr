Ext.define('TK.store.Docs9TreeNodes', {
    extend: 'Ext.data.TreeStore',
    model: 'TK.model.Docs9TreeNode',
    root: {
        children: [],
        expanded: true
    }
});