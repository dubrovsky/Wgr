Ext.define('TK.store.ky2.AvtoZayavsBase', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky2.AvtoZayavBase',
    remoteFilter: true,
    pageSize: 20
});