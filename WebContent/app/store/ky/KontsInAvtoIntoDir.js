Ext.define('TK.store.ky.KontsInAvtoIntoDir', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky.KontInAvtoIntoDir',
    remoteFilter: true,
    pageSize: 20
});