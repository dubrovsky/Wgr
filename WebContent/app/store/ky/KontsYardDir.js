Ext.define('TK.store.ky.KontsYardDir', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky.KontBase',
    remoteFilter: true,
    pageSize: 20
});