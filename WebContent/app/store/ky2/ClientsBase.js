Ext.define('TK.store.ky2.ClientsBase', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky2.ClientBase',
    remoteFilter: true,
    pageSize: 20
});