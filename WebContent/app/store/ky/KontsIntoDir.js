Ext.define('TK.store.ky.KontsIntoDir', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky.KontIntoDir',
    remoteFilter: true,
    pageSize: 20
});