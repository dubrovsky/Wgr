Ext.define('TK.store.ky.AvtosBase', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky.AvtoBase',
    remoteFilter: true,
    pageSize: 20
});