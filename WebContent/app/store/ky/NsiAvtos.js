Ext.define('TK.store.ky.NsiAvtos', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky.NsiAvto',
    remoteFilter: true,
    pageSize: 20
});