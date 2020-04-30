Ext.define('TK.store.messanger.MessageUserStore', {
    extend: 'Ext.data.TreeStore',
    model: 'TK.model.messanger.MessageUserModel',
    autoLoad: false,
    root: {
        children: [],
        expanded: true
    }
});