Ext.define('TK.store.ky.NsiKonts', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky.NsiKont',
    remoteFilter: true,
    pageSize: 20
});