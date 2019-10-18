Ext.define('TK.store.ky2.AvtoFiles', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky2.AvtoFile',
    remoteFilter: true,
    pageSize: 20
});