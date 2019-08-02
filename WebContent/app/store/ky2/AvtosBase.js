Ext.define('TK.store.ky2.AvtosBase', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky2.AvtoBase',
    remoteFilter: true,
    pageSize: 20
});